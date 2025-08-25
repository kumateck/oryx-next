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
  usePostApiV1MaterialArdMutation,
  PostApiV1MaterialArdApiArg,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  useLazyGetApiV1MaterialSpecificationsMaterialByIdQuery,
  useLazyGetApiV1MaterialStpsQuery,
  useLazyGetApiV1FormQuery,
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

  const [loadMaterialstpSpecification, { data, isLoading: isLoadingSpec }] =
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
  const [loadMaterialStps, { isLoading: isLoadingStp, data: materialStps }] =
    useLazyGetApiV1MaterialStpsQuery();
  const loadDataOrSearchStp = async (searchQuery: string, page: number) => {
    const res = await loadMaterialStps({
      searchQuery,
      page,
      materialKind: kind || EMaterialKind.Raw,
      module: AuditModules.warehouse.name,
      subModule: AuditModules.warehouse.materials,
    }).unwrap();
    const response = {
      options: res?.data?.map((stp) => ({
        label: stp.stpNumber,
        value: stp.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  //load forms template
  const [loadingFormdata, { isLoading: isLoadingForm }] =
    useLazyGetApiV1FormQuery();

  const loadDataOrSearchForm = async (searchQuery: string, page: number) => {
    const res = await loadingFormdata({
      searchQuery,
      page,
      type: FormTypeEnum.ARD,
    }).unwrap();
    const response = {
      options: res?.data?.map((form) => ({
        label: form.name,
        value: form.id,
      })) as Option[],
      hasNext: (res?.pageIndex || 0) < (res?.stopPageIndex as number),
      hasPrevious: (res?.pageIndex as number) > 1,
    };
    return response;
  };

  const [createMaterialArdMutation, { isLoading }] =
    usePostApiV1MaterialArdMutation();

  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  const stpId = watch("stpId");
  useEffect(() => {
    if (!stpId?.value) return;
    const material = materialStps?.data?.find((stp) => stp.id === stpId?.value);

    if (material) {
      loadMaterialstpSpecification({ id: material?.material?.id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stpId]);
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

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Material Analytical Raw Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <MaterialArdForm
            errors={errors}
            register={register}
            control={control}
            isLoadingSpec={isLoadingSpec}
            fetchStp={loadDataOrSearchStp}
            fetchForm={loadDataOrSearchForm}
            isLoadingForm={isLoadingForm}
            isLoadingStp={isLoadingStp}
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
