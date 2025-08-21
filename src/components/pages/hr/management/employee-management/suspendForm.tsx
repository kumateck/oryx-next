import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Icon,
  DialogTitle,
} from "@/components/ui";
import { Control, useForm } from "react-hook-form";
import { CreatesuspensionDto, CreateSuspensionValidator } from "./types";
import { FormWizard } from "@/components/form-inputs";
import { EmployeeActiveStatus, EmployeeStatusType, InputTypes } from "@/lib";
import { usePutApiV1EmployeeByIdStatusMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import ThrowErrorMessage from "@/lib/throw-error";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
function SuspensionForm({ isOpen, onClose, id }: Props) {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<CreatesuspensionDto>({
    resolver: CreateSuspensionValidator,
  });

  const dispatch = useDispatch();

  const [updateStatus, { isLoading }] = usePutApiV1EmployeeByIdStatusMutation(
    {},
  );
  const onSubmit = async (data: CreatesuspensionDto) => {
    try {
      await updateStatus({
        id: id as string,
        updateEmployeeStatus: {
          activeStatus: EmployeeActiveStatus.Suspension,
          status: EmployeeStatusType.Active,
          suspensionEndDate: data.endDate.toISOString(),
          suspensionStartDate: data.startDate.toISOString(),
        },
      }).unwrap();
      toast.success("Status updated successfully");
      dispatch(commonActions.setTriggerReload());
      reset();
      onClose();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle className="text-lg">Suspension Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormWizard
            config={[
              {
                register: register("justification"),
                label: "Justification",
                type: InputTypes.TEXTAREA,
                errors,
              },
            ]}
          />
          <div className="flex items-center gap-2">
            <FormWizard
              config={[
                {
                  control: control as unknown as Control,
                  name: "startDate",
                  label: "Start Date",
                  type: InputTypes.DATE,
                  errors,
                },
              ]}
            />
            <FormWizard
              config={[
                {
                  control: control as unknown as Control,
                  name: "endDate",
                  label: "End Date",
                  type: InputTypes.DATE,
                  errors,
                },
              ]}
            />
          </div>

          <DialogFooter>
            <Button disabled={isLoading} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icon name="LoaderCircle" className="animate-spin" />
              )}
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SuspensionForm;
