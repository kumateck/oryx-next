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
  EMaterialKind,
  ErrorResponse,
  FormTypeEnum,
  isErrorResponse,
  Option,
} from "@/lib";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MaterialArdForm } from "./form";
import {
  useGetApiV1MaterialStpsQuery,
  usePostApiV1MaterialArdMutation,
  useGetApiV1FormQuery,
  PostApiV1MaterialArdApiArg,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { MaterialArdSchemaResolver, MaterialArdSchemaType } from "./types";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  kind?: EMaterialKind;
};

export const Create = ({ isOpen, onClose, kind }: Props) => {
  const dispatch = useDispatch();

  const [loadMaterialstpSpecification, { data }] =
    useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery();

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MaterialArdSchemaType>({
    resolver: MaterialArdSchemaResolver,
  });

  //get stp
  const { data: materialStps } = useGetApiV1MaterialStpsQuery({
    page: 1,
    pageSize: 1000,
    materialKind: kind || EMaterialKind.Raw,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });

  //loead forms template
  const { data: formTemplates } = useGetApiV1FormQuery({
    page: 1,
    pageSize: 1000,
    type: FormTypeEnum.ARD,
  });

  const [createMaterialArdMutation, { isLoading }] =
    usePostApiV1MaterialArdMutation();

  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  const stpIds = watch("stpId");
  useEffect(() => {
    if (stpIds) {
      loadMaterialstpSpecification({ id: stpIds.value });
    }
    //
  }, [stpIds, loadMaterialstpSpecification]);
  useEffect(() => {
    if (data) {
      setValue("specNumber", data.specificationNumber ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  //fuction fro creating material analytical raw data
  const onSubmit = async (data: MaterialArdSchemaType) => {
    const materialStp = materialStps?.data?.find(
      (stp) => stp.id === data.stpId.value,
    );

    if (!materialStp || !materialStp.stpNumber) {
      return;
    }
    try {
      const payload = {
        stpNumber: materialStp?.stpNumber,
        specNumber: data.specNumber,
        description: data?.description,
        stpId: data.stpId.value,
        formId: data.formId.value,
      };
      // 1. Create the material analytical raw data
      const ardId = await createMaterialArdMutation({
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createMaterialAnalyticalRawDataRequest: payload,
      } as PostApiV1MaterialArdApiArg).unwrap();

      if (ardId && data.attachments) {
        const formData = new FormData();
        // Ensure attachments are an array
        const attachmentsArray = Array.isArray(data.attachments)
          ? data.attachments
          : Array.from(data.attachments); // Convert FileList to an array

        attachmentsArray.forEach((attachment: File) => {
          formData.append("files", attachment, attachment.name);
        });

        await uploadAttachment({
          modelType: CODE_SETTINGS.modelTypes.MaterialAnalyticalRawData,
          modelId: ardId,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }

      toast.success("Material ARD created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      console.log("Error creating Material ARD:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to create Material ARD. Please try again.",
      );
    }
  };
  const StpData = materialStps?.data;
  const materialStpOptions = StpData?.map((stp) => {
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
          <DialogTitle>Add Material Analytical Raw Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <MaterialArdForm
            errors={errors}
            register={register}
            control={control}
            stpOptions={materialStpOptions}
            formOptions={formOptions}
          />
          <DialogFooter>
            <DialogFooter className="justify-end gap-4 py-6">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="flex items-center gap-2"
              >
                <Icon
                  name={
                    isLoading || isUploadingAttachment ? "LoaderCircle" : "Plus"
                  }
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
