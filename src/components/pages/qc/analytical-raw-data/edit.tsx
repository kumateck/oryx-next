import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import React, { useEffect } from "react";
import { MaterialArdSchemaResolver, MaterialArdSchemaType } from "./types";
import { useForm } from "react-hook-form";
import {
  MaterialAnalyticalRawDataDto,
  PostApiV1FileByModelTypeAndModelIdApiArg,
  PutApiV1MaterialArdByIdApiArg,
  useGetApiV1FormQuery,
  useGetApiV1MaterialStpsQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  usePutApiV1MaterialArdByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  cn,
  CODE_SETTINGS,
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import { MaterialArdForm } from "./form";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  details: MaterialAnalyticalRawDataDto;
}

export function Edit({ isOpen, id, onClose, details }: Props) {
  // const defaultFormId = {
  //   value: details.formId?.value,
  //   label: details.formId?.label,
  // };
  const defaultFormId = {
    value: details.form?.id as string,
    label: details.form?.name as string,
  };

  const defaultStpId = {
    value: details.materialStandardTestProcedure?.id as string,
    label: details.materialStandardTestProcedure?.stpNumber as string,
  };
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<MaterialArdSchemaType>({
    resolver: MaterialArdSchemaResolver,
    mode: "all",
    defaultValues: {
      description: details.description as string,
      stpId: defaultStpId,
      formId: defaultFormId,
      specNumber: details.specNumber as string,
    },
  });

  const [uploadAttachment, { isLoading: isUploadingAttachment }] =
    usePostApiV1FileByModelTypeAndModelIdMutation();

  //get stp
  const { data: materialStps } = useGetApiV1MaterialStpsQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });
  useEffect(() => {
    if (isOpen && details) {
      // Compute stpId option
      const stpOption = materialData.find(
        (stp) => stp.id === details.materialStandardTestProcedure?.id,
      );
      const defaultStpId = {
        value: details.materialStandardTestProcedure?.id,
        label:
          stpOption?.stpNumber ||
          details.materialStandardTestProcedure?.stpNumber ||
          "",
      };

      // Compute formId option
      const formOption = formOptionsData.find(
        (form) => form.id === details.form?.id,
      );
      const defaultFormId = {
        value: details.form?.id as string,
        label: formOption?.name || details.form?.name || "",
      };

      reset({
        description: details.description || "",
        stpId: defaultStpId,
        formId: defaultFormId,
        specNumber: details.specNumber || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, details, reset]);

  //load forms template
  const { data: formTemplates } = useGetApiV1FormQuery({
    page: 1,
    pageSize: 1000,
  });

  const formOptionsData = formTemplates?.data || [];
  const formOptions = formOptionsData.map((form) => ({
    value: form.id,
    label: form.name,
  })) as Option[];

  const materialData = materialStps?.data || [];
  const materialStpOptions = materialData.map((stp) => ({
    value: stp.id,
    label: stp.stpNumber,
  })) as Option[];

  const [updateMaterialArdMutation, { isLoading }] =
    usePutApiV1MaterialArdByIdMutation();

  const onSubmit = async (data: MaterialArdSchemaType) => {
    try {
      const materialStp = materialStps?.data?.find(
        (stp) => stp.id === data.stpId.value,
      );

      if (!materialStp || !materialStp.stpNumber) {
        console.log("Material STP not found");
        toast.error("Material STP not found. Please select a valid STP.");
        return;
      }
      // Handle form submission
      const payload = {
        stpNumber: materialStp?.stpNumber,
        specNumber: data.specNumber,
        description: data?.description,
        stpId: data.stpId.value,
        formId: data.formId.value,
      };
      // Create the material analytical raw data
      const ardId = await updateMaterialArdMutation({
        id,
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createMaterialAnalyticalRawDataRequest: payload,
      } as PutApiV1MaterialArdByIdApiArg).unwrap();

      if (ardId) {
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
          modelId: ardId as string,
          body: formData,
        } as PostApiV1FileByModelTypeAndModelIdApiArg).unwrap();
      }

      toast.success("Material ARD updated successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to update Material ARD. Please try again.",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Material Analytical Raw Data</DialogTitle>
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
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Icon
                name={isLoading || isUploadingAttachment ? "Loader" : "Plus"}
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
