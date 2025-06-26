import { Button, DialogContent, DialogTitle, Icon } from "@/components/ui";
import { Dialog } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { usePutApiV1ProductionScheduleFinishedGoodsTransferNoteByIdApproveMutation } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { cn, ErrorResponse, InputTypes, isErrorResponse } from "@/lib";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import {
  ApproveTransferNoteFormData,
  ApproveTransferNoteFormResolver,
} from "./type";
import { FormWizard } from "@/components/form-inputs";

type CreateSampleMaterialProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

export const ApproveTransferNote = ({
  isOpen,
  onClose,
  id,
}: CreateSampleMaterialProps) => {
  const [createSample, { isLoading }] =
    usePutApiV1ProductionScheduleFinishedGoodsTransferNoteByIdApproveMutation();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApproveTransferNoteFormData>({
    resolver: ApproveTransferNoteFormResolver,
  });

  // Function to handle form submission
  const onSubmit = async (data: ApproveTransferNoteFormData) => {
    console.log("Form data submitted:", data);
    try {
      await createSample({
        id: id,
        approveTransferNoteRequest: {
          quantityReceived: Number(data.quantityReceived),
        },
      });
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to approve finished goods transfer note",
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="ml-4 max-w-xl space-y-3">
        <DialogTitle className="text-lg font-medium">
          Approve Finished Goods Transfer
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                label: "Received Quantity",
                type: InputTypes.NUMBER,
                register: register("quantityReceived"),
                required: true,
                placeholder: "Enter quantity",
                errors,
              },
            ]}
          />
          <div className="flex flex-row items-center justify-end gap-2">
            <Button disabled={isLoading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              Approve
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
