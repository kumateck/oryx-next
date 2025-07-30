"use client";
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
import { ServiceForm } from "./form";
import {
  CreateServiceRequest,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  useLazyGetApiV1ServicesQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ServicesMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
} from "@/lib";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { useCodeGen } from "@/lib/code-gen";
import { useEffect } from "react";

interface CreateServiceProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CreateService({ isOpen, onClose }: CreateServiceProps) {
  const [createService, { isLoading }] = usePostApiV1ServicesMutation();
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();
  const [loadCodeModelCount] = useLazyGetApiV1ServicesQuery();

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateServicesDto>({
    resolver: CreateServicesValidator,
  });

  //code configuration
  const setCodeToInput = (code: string) => {
    setValue("code", code ?? "");
  };
  const fetchCount = async () => {
    const countResponse = await loadCodeModelCount({}).unwrap();

    return { totalRecordCount: countResponse?.totalRecordCount };
  };
  const { regenerateCode, loading } = useCodeGen(
    CODE_SETTINGS.modelTypes.Service,
    fetchCount,
    setCodeToInput,
  );
  useEffect(() => {
    regenerateCode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data: CreateServicesDto) => {
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
    try {
      const serviceId = await createService({
        createServiceRequest: payload,
        module: AuditModules.extral.name,
        subModule: AuditModules.extral.service,
      }).unwrap();

      dispatch(commonActions.setTriggerReload());
      onClose();
      toast.success("Service created successfully.");
      reset();
      console.log("Service created successfully:", serviceId);
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
          modelType: CODE_SETTINGS.modelTypes.ProductStandardTestProcedure,
          modelId: serviceId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
    } catch (error) {
      console.log("Error creating Service:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create service. Please try again.",
      );
    }
  };
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <ServiceForm
            isLoadingCode={loading}
            errors={errors}
            register={register}
            control={control}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={isLoading || isUploadingAttachment}
              type="submit"
              className="flex items-center gap-2"
            >
              <Icon
                name={isLoading ? "LoaderCircle" : "Plus"}
                className={cn("h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
