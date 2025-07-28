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
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  FormTypeEnum,
  isErrorResponse,
  Option,
} from "@/lib";
import React from "react";
import { useForm } from "react-hook-form";
import { MaterialArdForm } from "./form";
import {
  PostApiV1FileByModelTypeAndModelIdApiArg,
  Stage,
  useGetApiV1FormQuery,
  useGetApiV1ProductStpsQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePostApiV1ProductArdMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ProductArdSchemaType,
  ProductArdSchemaResolver,
  stageOptions,
} from "./types";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Create = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductArdSchemaType>({
    resolver: ProductArdSchemaResolver,
  });

  //get stp
  const { data: productStps } = useGetApiV1ProductStpsQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });

  //loead forms template
  const { data: formTemplates } = useGetApiV1FormQuery({
    page: 1,
    pageSize: 1000,
    type: FormTypeEnum.Default,
  });

  const [createProductArdMutation, { isLoading }] =
    usePostApiV1ProductArdMutation();
  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  //fuction for creating product analytical raw data
  const onSubmit = async (data: ProductArdSchemaType) => {
    const productStp = productStps?.data?.find(
      (stp) => stp.id === data.stpId.value,
    );
    if (!productStp || !productStp.stpNumber) {
      toast.error("Product STP not found. Please select a valid STP.");
      return;
    }
    try {
      const payload = {
        stpNumber: productStp?.stpNumber,
        specNumber: data.specNumber,
        description: data?.description,
        stage: data.stage.value as Stage,
        stpId: data.stpId.value,
        formId: data.formId.value,
      };
      console.log("Creating Product ARD with payload:", payload);
      // 1. Create the product analytical raw data
      const productArdId = await createProductArdMutation({
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createProductAnalyticalRawDataRequest: payload,
      }).unwrap();

      toast.success("Product ARD created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
      // If attachments are provided, upload them
      if (productArdId && data.attachments) {
        const formData = new FormData();
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array
        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.ProductStandardTestProcedure,
          modelId: productArdId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }
    } catch (error) {
      console.log("Error creating Product ARD:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create Product ARD. Please try again.",
      );
    }
  };
  const StpData = productStps?.data;
  const productStpOptions = StpData?.map((stp) => {
    return {
      label: stp.stpNumber,
      value: stp.id,
    };
  }) as Option[];

  const formData = formTemplates?.data || [];
  const formOptions = formData?.map((form) => {
    return {
      label: form.name,
      value: form.id,
    };
  }) as Option[];

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product Analytical Raw Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <MaterialArdForm
            errors={errors}
            register={register}
            stageOptions={stageOptions}
            control={control}
            stpOptions={productStpOptions}
            formOptions={formOptions}
          />
          <DialogFooter>
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
