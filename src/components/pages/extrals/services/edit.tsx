import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { CreateServicesDto, CreateServicesValidator } from "./types";
import { useForm } from "react-hook-form";
import {
  CreateServiceRequest,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  ServiceDto,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePutApiV1ServicesByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
} from "@/lib";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { ServiceForm } from "./form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: ServiceDto;
}

export function Edit({ isOpen, onClose, details }: Props) {
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [updateService, { isLoading }] = usePutApiV1ServicesByIdMutation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateServicesDto>({
    resolver: CreateServicesValidator,
    mode: "all",
    defaultValues: {
      description: details?.description ?? "",
      name: details?.name ?? "",
      code: details?.code ?? "",
      startDate: details?.startDate ? new Date(details.startDate) : undefined,
      endDate: details?.endDate ? new Date(details.endDate) : undefined,
    },
  });

  const onSubmit = async (data: CreateServicesDto) => {
    try {
      const payload: CreateServiceRequest = {
        name: data.name,
        startDate:
          data.startDate instanceof Date
            ? data.startDate.toISOString()
            : data.startDate,
        endDate:
          data.endDate instanceof Date
            ? data.endDate.toISOString()
            : data.endDate,
        code: data.code,
        description: data.description,
      };
      // Create the product analytical raw data
      const serviceId = await updateService({
        id: details.id as string,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.service,
        createServiceRequest: payload,
      }).unwrap();

      toast.success("Service updated successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
      // If attachments are provided, upload them
      if (serviceId && data.attachments) {
        const formData = new FormData();
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array
        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.Service,
          modelId: (serviceId as ServiceDto).id as string,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to update Service. Please try again.",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ServiceForm errors={errors} register={register} control={control} />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
              disabled={isLoading || isUploadingAttachment}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isUploadingAttachment}>
              <Icon
                name={isLoading ? "Loader" : "Plus"}
                className={cn("mr-2", { isLoading: "animate-spin" })}
              />
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
