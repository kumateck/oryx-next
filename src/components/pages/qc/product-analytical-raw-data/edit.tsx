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
import {
  ProductArdSchemaType,
  ProductArdSchemaResolver,
  stageOptions,
  stageLabels,
  Stage,
} from "./types";
import { useForm } from "react-hook-form";
import {
  useGetApiV1FormQuery,
  useGetApiV1ProductStpsQuery,
  usePutApiV1ProductArdByIdMutation,
  useGetApiV1ProductArdByIdQuery,
  useLazyGetApiV1ProductSpecificationsProductByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  cn,
  ErrorResponse,
  FormTypeEnum,
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
  details: ProductArdSchemaType;
}

export function Edit({ isOpen, id, onClose, details }: Props) {
  const dispatch = useDispatch();
  const [loadProductstpSpecification, { data }] =
    useLazyGetApiV1ProductSpecificationsProductByIdQuery();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductArdSchemaType>({
    resolver: ProductArdSchemaResolver,
    mode: "all",
    defaultValues: {
      description: details.description,
      stpId: details.stpId,
      formId: details.formId,
      specNumber: details.specNumber,
      stage: details.stage,
    },
  });
  const stpId = watch("stpId");
  useEffect(() => {
    if (stpId) {
      loadProductstpSpecification({ id: stpId.value });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stpId]);
  useEffect(() => {
    if (data) {
      setValue("specNumber", data.specificationNumber ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //get stp
  const { data: productStps } = useGetApiV1ProductStpsQuery({
    page: 1,
    pageSize: 1000,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });
  const { data: productArd } = useGetApiV1ProductArdByIdQuery({
    id: id,
    module: AuditModules.warehouse.name,
    subModule: AuditModules.warehouse.materials,
  });

  useEffect(() => {
    if (productArd) {
      reset({
        description: productArd?.description ?? "",
        stpId: {
          value: productArd?.productStandardTestProcedure?.id ?? "",
          label: productArd?.productStandardTestProcedure?.stpNumber ?? "",
        },
        formId: {
          value: productArd?.form?.id ?? "",
          label: productArd?.form?.name ?? "",
        },
        specNumber: productArd?.specNumber ?? "",
        stage: {
          value: productArd?.stage,
          label: stageLabels[productArd.stage as Stage],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productArd]);

  //load forms template
  const { data: formTemplates } = useGetApiV1FormQuery({
    page: 1,
    pageSize: 1000,
    type: FormTypeEnum.ARD,
  });

  const formOptionsData = formTemplates?.data || [];
  const formOptions = formOptionsData.map((form) => ({
    value: form.id,
    label: form.name,
  })) as Option[];

  const productData = productStps?.data || [];
  const productStpOptions = productData.map((stp) => ({
    value: stp.id,
    label: stp.stpNumber,
  })) as Option[];

  const [updateProductArdMutation, { isLoading }] =
    usePutApiV1ProductArdByIdMutation();

  const onSubmit = async (data: ProductArdSchemaType) => {
    try {
      const productStp = productStps?.data?.find(
        (stp) => stp.id === data.stpId.value,
      );

      if (!productStp || !productStp.stpNumber) {
        toast.error("Product STP not found. Please select a valid STP.");
        return;
      }
      const payload = {
        stpNumber: productStp?.stpNumber,
        specNumber: data.specNumber,
        description: data?.description,
        stage: data.stage.value,
        stpId: data.stpId.value,
        formId: data.formId.value,
      };
      // Create the product analytical raw data
      await updateProductArdMutation({
        id,
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createProductAnalyticalRawDataRequest: payload,
      }).unwrap();

      toast.success("Product ARD updated successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "Failed to update Product ARD. Please try again.",
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product Analytical Raw Data</DialogTitle>
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
