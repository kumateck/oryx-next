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
} from "@/components/ui";
import { AbsenceType, Option } from "@/lib";
import {
  useGetApiV1EmployeeQuery,
  useLazyGetApiV1DesignationQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import { CreateDesignationValidator, DesignationRequestDto } from "./types";
import LeaveRequestForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveRequest = ({ isOpen, onClose }: Props) => {
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<DesignationRequestDto>({
    resolver: CreateDesignationValidator,
    mode: "all",
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: DesignationRequestDto) => {
    try {
      const payload = {
        leaveTypeId: data.leaveTypeId.value,
        startDate: data.startDate,
        endDate: data.endDate,
        employeeId: data.employeeId,
        contactPerson: data.contactPerson,
        contactPersonNumber: data.contactPersonNumber,
      };
      console.log(payload);

      // await createDesignation({
      //   createDesignationRequest: payload,
      // });

      toast.success("Leave Request sent successfully");
      loadDesignations({ page: 1, pageSize: 10 });
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

  const absenceTypeOptions = Object.entries(AbsenceType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

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
            absenceTypeOptions={absenceTypeOptions}
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
              {/* <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              /> */}
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRequest;
