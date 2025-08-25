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
} from "@/lib";
import {
  AppointmentType,
  BudgetStatus,
  CreateStaffRequisitionRequest,
  useGetApiV1DepartmentQuery,
  useGetApiV1DesignationQuery,
  usePostApiV1StaffRequisitionsMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ErrorResponse, cn, isErrorResponse } from "@/lib/utils";

import { PositionDetailsForm, BackgroundDetailsForm } from "./form";
import {
  CreateStaffRequisitionValidator,
  StaffRequisitionRequestDto,
} from "./types";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();
  const [createStaffRequisition, { isLoading }] =
    usePostApiV1StaffRequisitionsMutation();
  const [step, setStep] = useState(1);

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm<StaffRequisitionRequestDto>({
    resolver: CreateStaffRequisitionValidator,
    // mode: "onTouched",
  });

  const { data: designationResponse } = useGetApiV1DesignationQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.management.name,
    subModule: AuditModules.management.leaveManagement,
  });

  const appointmentOptions = Object.entries(AppointmentTypeEnum)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  const designationData = designationResponse?.data;
  const designationsOptions = designationData?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  }) as Option[];

  // Step 1 fields for validation
  const step1Fields = [
    "numberOfStaff",
    "designationId",
    "qualification",
    "appointmentId",
    "requestUrgency",
    "justification",
  ];

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const valid = await trigger(step1Fields as any);
    if (valid) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);
  const pageSize = 30;
  const page = 1;
  const { data: departmentResults } = useGetApiV1DepartmentQuery({
    page,
    pageSize,
  });
  const departments = departmentResults?.data ?? [];
  const departmentOptions = departments?.map((department) => ({
    label: department?.name,
    value: department.id,
  })) as Option[];

  const onSubmit = async (data: StaffRequisitionRequestDto) => {
    try {
      const payload: CreateStaffRequisitionRequest = {
        budgetStatus: data.budgeted as BudgetStatus,
        staffRequired: data.numberOfStaff,
        departmentId: data.departmentId.value,
        educationalQualification: data.educationQualification,
        qualification: data.qualification,
        designationId: data.designationId.value,
        additionalRequests: data.additionalRequirements || "",
        appointmentType: parseInt(
          data.appointmentType.value,
        ) as AppointmentType,
        requestUrgency: data.requestUrgency.toISOString(),
        justification: data.justification || "",
        additionalRequirements: data.additionalRequirements || "",
      };

      await createStaffRequisition({
        createStaffRequisitionRequest: payload,
        module: AuditModules.management.name,
        subModule: AuditModules.management.staffRequisition,
      }).unwrap();

      toast.success("Staff request created successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
      setStep(1);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setStep(1);
        reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Staff Request</DialogTitle>
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
              type="submit"
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
                type="submit"
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
                  name={isLoading ? "LoaderCircle" : "Plus"}
                  className={cn("h-4 w-4", {
                    "animate-spin": isLoading,
                  })}
                />
                <span>Create</span>
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
