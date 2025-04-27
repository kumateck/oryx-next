import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Option } from "@/lib";
import {
  useGetApiV1EmployeeQuery,
  useGetApiV1LeaveTypeQuery,
  useLazyGetApiV1LeaveRequestQuery,
  usePostApiV1LeaveRequestMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse } from "@/lib/utils";

import { CreateLeaveValidator, LeaveRequestDto } from "./types";
import LeaveRequestForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveRequest = ({ isOpen, onClose }: Props) => {
  const [loadLeaveRequests] = useLazyGetApiV1LeaveRequestQuery();
  const [createLeaveRequest, { isLoading }] =
    usePostApiV1LeaveRequestMutation();
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LeaveRequestDto>({
    resolver: CreateLeaveValidator,
    mode: "all",
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: LeaveRequestDto) => {
    try {
      const payload = {
        leaveTypeId: data.leaveTypeId.value,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        employeeId: data.employeeId.value,
        contactPerson: data.contactPerson,
        contactPersonNumber: data.contactPersonNumber,
      };
      console.log(payload);

      await createLeaveRequest({
        createLeaveRequest: payload,
      });

      toast.success("Leave Request sent successfully");
      loadLeaveRequests({ page: 1, pageSize: 10 });
      reset();
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 40,
  });

  const employees = employeesResponse?.data ?? [];

  const employeeOptions = employees?.map((item) => {
    return {
      label: item.fullName,
      value: item?.id,
    };
  }) as Option[];

  const { data: leaveTypesResponse } = useGetApiV1LeaveTypeQuery({
    page: 1,
    pageSize: 40,
  });

  const leaveTypes = leaveTypesResponse?.data ?? [];

  const leaveTypesOptions = leaveTypes?.map((item) => {
    return {
      label: item.name,
      value: item?.id,
    };
  }) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Staff Leave Request Form</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <LeaveRequestForm
            register={register}
            control={control}
            errors={errors}
            employeeOptions={employeeOptions}
            leaveTypesOptions={leaveTypesOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant={"default"}
              type="submit"
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRequest;
