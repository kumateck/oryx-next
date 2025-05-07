import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
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
  CODE_SETTINGS,
  ErrorResponse,
  InputTypes, // PurchaseOrderStatusList,
  isErrorResponse,
} from "@/lib";
import {
  PostApiV1FileByModelTypeAndModelIdApiArg,
  usePostApiV1FileByModelTypeAndModelIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import { AttachmentRequestDto, AttachmentValidator } from "./type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const AttachDocuments = ({ isOpen, onClose, id }: Props) => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AttachmentRequestDto>({
    resolver: AttachmentValidator,
    mode: "all",
  });

  const [uploadAttachment, { isLoading }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  const onSubmit = async (data: AttachmentRequestDto) => {
    const formData = new FormData();
    const attachmentsArray = Array.isArray(data.attachments)
      ? data.attachments
      : Array.from(data.attachments); // Convert FileList to an array

    attachmentsArray.forEach((attachment: File) => {
      formData.append("files", attachment, attachment.name);
    });

    try {
      await uploadAttachment({
        modelType: CODE_SETTINGS.modelTypes.PurchaseOrder,
        modelId: id,
        body: formData,
      } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      toast.success("Attachment uploaded successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const handleDialogChange = (open: boolean) => {
    // Only close if the "Close" button is clicked (open = false)
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl rounded-none" noClose>
        <DialogHeader>
          <DialogTitle>Attach Profoma Invoice Document</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                type: InputTypes.DRAGNDROP,
                label: "",
                name: `attachments`,
                defaultValue: null,
                control,
                errors,
              },
            ]}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              {isLoading && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Attach</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AttachDocuments;
