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
  // Icon,
} from "@/components/ui";
import { AbsenceType, Option } from "@/lib";
import {
  // CreateDesignationRequest,
  useGetApiV1EmployeeQuery,
  useLazyGetApiV1DesignationQuery,
  // usePostApiV1DesignationMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import { CreateAbsenceFormValidator, AbsenceFormRequestDto } from "./types";
import AbsenceRequestForm from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AbsenceRequest = ({ isOpen, onClose }: Props) => {
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();
  // const [createDesignation, { isLoading }] = usePostApiV1DesignationMutation();

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
        absenceTypeId: data.absenceTypeId.value,
        startDate: data.startDate,
        endDate: data.endDate,
        employeeId: data.employeeId,
      };
      console.log(payload);

      // await createDesignation({
      //   createDesignationRequest: payload,
      // });

      toast.success("Absence Request sent successfully");
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
            absenceTypeOptions={absenceTypeOptions}
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

export default AbsenceRequest;
