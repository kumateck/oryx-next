import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { Option } from "@/lib";
import {
  useGetApiV1EmployeeQuery,
  useGetApiV1LeaveTypeQuery,
  useLazyGetApiV1DesignationQuery,
  usePostApiV1AbsenceRequestMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse } from "@/lib/utils";

import { CreateAbsenceFormValidator, AbsenceFormRequestDto } from "./types";
import AbsenceRequestForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AbsenceRequest = ({ isOpen, onClose }: Props) => {
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();
  const [createAbsenceRequest, { isLoading }] =
    usePostApiV1AbsenceRequestMutation();
  const { data: leaveTypesResponse } = useGetApiV1LeaveTypeQuery({
    page: 1,
    pageSize: 40,
  });
  const { data: employeesResponse } = useGetApiV1EmployeeQuery({
    page: 1,
    pageSize: 40,
  });
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<AbsenceFormRequestDto>({
    resolver: CreateAbsenceFormValidator,
    mode: "all",
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: AbsenceFormRequestDto) => {
    try {
      const payload = {
        leaveTypeId: data.absenceTypeId.value,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        employeeId: data.employeeId.value,
      };
      console.log(payload);

      await createAbsenceRequest({
        createAbsenceRequest: payload,
      }).unwrap();

      toast.success("Absence Request sent successfully");
      loadDesignations({ page: 1, pageSize: 10 });
      reset();
      onClose();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const employees = employeesResponse?.data ?? [];

  const employeeOptions = employees?.map((item) => {
    return {
      label: item.fullName,
      value: item?.id,
    };
  }) as Option[];

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
          <DialogTitle>Staff Absence Request Form</DialogTitle>
          <DialogDescription>
            You must submit requests for absences, other than sick leave two
            days prior to the first day you will be absent
          </DialogDescription>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <AbsenceRequestForm
            register={register}
            control={control}
            errors={errors}
            leaveTypesOptions={leaveTypesOptions}
            employeeOptions={employeeOptions}
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

export default AbsenceRequest;
