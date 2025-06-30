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
import {
  AppointmentType as AppointmentTypeEnum,
  AuditModules,
  Option,
  StaffRequisitionType,
} from "@/lib";
import {
  AppointmentType,
  BudgetStatus,
  StaffRequisitionDtoRead,
  useGetApiV1DesignationQuery,
  useGetApiV1DepartmentQuery,
  usePutApiV1StaffRequisitionsByIdMutation,
  //   usePutApiV1LeaveTypeByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { cn, ErrorResponse, isErrorResponse } from "@/lib/utils";

import {
  CreateStaffRequisitionValidator,
  StaffRequisitionRequestDto,
} from "./types";
import { BackgroundDetailsForm, PositionDetailsForm } from "./form";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: StaffRequisitionDtoRead;
}
const Edit = ({ isOpen, onClose, details }: Props) => {
  const [editStaffRequisition, { isLoading }] =
    usePutApiV1StaffRequisitionsByIdMutation();
  const defaultDesignations = {
    label: details.designation?.name ?? "",
    value: details.designation?.id,
  };

  const defaultDepartments = {
    label: details.department?.name ?? "",
    value: details.department?.id,
  };

  const { data: departmentResults } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });

  const departmentOptions = departmentResults?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  })) as Option[];

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const step1Fields = [
    "numberOfStaff",
    "designationId",
    "qualification",
    "appointmentId",
    "requestUrgency",
    "justification",
  ];

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm<StaffRequisitionRequestDto>({
    resolver: CreateStaffRequisitionValidator,
    mode: "all",
    defaultValues: {
      numberOfStaff: details.staffRequired,
      designationId: defaultDesignations,
      qualification: (details.qualification as string) || "",
      appointmentType: {
        value: details.appointmentType?.toString() as string,
        label: AppointmentTypeEnum[details.appointmentType ?? 0] || "",
      },
      requestUrgency: new Date(details.requestUrgency as string),
      budgeted:
        details.budgetStatus?.toString() as unknown as StaffRequisitionType,
      educationQualification:
        (details.educationalQualification as string) || "",
      justification: (details.justification as string) || "",
      additionalRequirements: (details.additionalRequests as string) || "",
      departmentId: defaultDepartments,
    },
  });

  const { data: designationsResponse } = useGetApiV1DesignationQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.management.name,
    subModule: AuditModules.management.designationManagement,
  });

  const designationData = designationsResponse?.data;
  const designationsOptions = designationData?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  }) as Option[];

  const appointmentOptions = Object.entries(AppointmentTypeEnum)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const valid = await trigger(step1Fields as any);
    if (valid) {
      setStep(2);
    }
  };
  const handleBack = () => setStep(1);

  const onSubmit = async (data: StaffRequisitionRequestDto) => {
    try {
      const payload = {
        budgetStatus: data.budgeted as BudgetStatus,
        staffRequired: data.numberOfStaff,
        educationalQualification: data.educationQualification,
        qualification: data.qualification,
        designationId: data.designationId.value,
        departmentId: data.departmentId.value,
        additionalRequests: data.additionalRequirements || "",
        appointmentType: parseInt(
          data.appointmentType.value,
        ) as AppointmentType,
        requestUrgency: data.requestUrgency.toISOString(),
        justification: data.justification || "",
        additionalRequirements: data.additionalRequirements || "",
      };
      console.log(payload);
      await editStaffRequisition({
        id: details.id as string,
        createStaffRequisitionRequest: payload,
        module: AuditModules.management.name,
        subModule: AuditModules.management.staffRequisition,
      });
      toast.success("Staff request updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Designation</DialogTitle>
        </DialogHeader>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <PositionDetailsForm
              register={register}
              control={control}
              errors={errors}
              appointmentOptions={appointmentOptions}
              designationsOptions={designationsOptions}
              departmentOptions={departmentOptions}
            />
          ) : (
            <BackgroundDetailsForm
              register={register}
              control={control}
              errors={errors}
            />
          )}
          <DialogFooter className="justify-end gap-4 py-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (step === 1) {
                  onClose();
                  setStep(1);
                  reset();
                } else {
                  handleBack();
                }
              }}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            {step === 1 ? (
              <Button
                variant="default"
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                <span>Next</span>
              </Button>
            ) : (
              <Button
                variant={"default"}
                type="submit"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Icon
                  name={isLoading ? "LoaderCircle" : "Save"}
                  className={cn("h-4 w-4", {
                    "animate-spin": isLoading,
                  })}
                />
                <span>Update</span>
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
