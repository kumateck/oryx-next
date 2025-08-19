import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  DialogDescription,
  Icon,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import {
  CreateProformaAttachment,
  CreateProformaAttachmentValidator,
} from "./types";
import Form from "./form";
import {
  usePostApiV1FileByModelTypeAndModelIdMutation,
  PostApiV1FileByModelTypeAndModelIdApiArg,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
} from "@/lib";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
function AttachProductionOrder({ isOpen, onClose, id }: Props) {
  const [uploadAttachment, { isLoading: uploading }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProformaAttachment>({
    resolver: CreateProformaAttachmentValidator,
  });

  const onSubmit = async (data: CreateProformaAttachment) => {
    try {
      const files = Array.isArray(data.attachments)
        ? data.attachments
        : Array.from(data.attachments);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file, file.name);
      });

      await uploadAttachment({
        modelType: CODE_SETTINGS.modelTypes.LeaveRequest,
        modelId: id,
        body: formData,
        module: AuditModules.general.name,
        subModule: AuditModules.general.fileUpload,
      } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      onClose();
      toast.success("Attachment uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create leave request. Try again",
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Attach Production Order
          </DialogTitle>
          <DialogDescription>
            Attach Production Order to generate invoice.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Form control={control} errors={errors} />
          <DialogFooter>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={uploading} type="submit">
              {uploading && (
                <Icon name="LoaderCircle" className="animate-spin h-5 w-5" />
              )}
              {uploading ? "Attaching..." : "Attach"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AttachProductionOrder;
