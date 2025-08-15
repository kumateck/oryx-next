import { Button, DialogContent, DialogTitle, Icon } from "@/components/ui";
import { Dialog } from "@radix-ui/react-dialog";
import { Control, useForm } from "react-hook-form";
import {
  FinishedGoodsTransferNoteDtoRead,
  usePutApiV1ProductionScheduleFinishedGoodsTransferNoteByIdApproveMutation,
} from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import { cn, InputTypes, sanitizeNumber } from "@/lib";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import {
  ApproveTransferNoteFormData,
  ApproveTransferNoteFormResolver,
} from "./type";
import { FormWizard } from "@/components/form-inputs";
import ThrowErrorMessage from "@/lib/throw-error";

type CreateSampleMaterialProps = {
  isOpen: boolean;
  onClose: () => void;
  details?: FinishedGoodsTransferNoteDtoRead;
};

export const ApproveTransferNote = ({
  isOpen,
  onClose,
  details,
}: CreateSampleMaterialProps) => {
  const [createSample, { isLoading }] =
    usePutApiV1ProductionScheduleFinishedGoodsTransferNoteByIdApproveMutation();

  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApproveTransferNoteFormData>({
    resolver: ApproveTransferNoteFormResolver,
  });

  // Function to handle form submission
  const onSubmit = async (data: ApproveTransferNoteFormData) => {
    if (
      sanitizeNumber(details?.totalQuantity) < Number(data.quantityReceived)
    ) {
      toast.error("Quantity to receive cannot be greater than total quantity");
      return;
    }
    try {
      await createSample({
        id: details?.id as string,
        approveTransferNoteRequest: {
          quantityReceived: Number(data.quantityReceived),
          notes: data.notes,
        },
      }).unwrap();
      toast.success("Finished goods transfer note approved successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="ml-4 max-w-xl space-y-3">
        <DialogTitle className="text-lg font-medium">
          Confirm Physical Quantity
        </DialogTitle>
        <div className="rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
          Total Qty to Receive:{" "}
          <span className="font-semibold text-gray-900">
            {details?.totalQuantity}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                label: "Physical Quantity Received",
                type: InputTypes.NUMBER,
                register: register("quantityReceived"),
                required: true,
                placeholder: "Enter quantity",
                errors,
              },
              {
                label: "Notes",
                control: control as unknown as Control,
                type: InputTypes.RICHTEXT,
                name: "notes",
                autoFocus: false,
                placeholder: "Enter notes",
                suggestions: [],
                errors,
              },
            ]}
          />
          <div className="flex flex-row items-center justify-end gap-2 py-5">
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
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
