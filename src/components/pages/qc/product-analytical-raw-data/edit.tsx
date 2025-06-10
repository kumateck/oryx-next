import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import React from "react";
import {
  ProductArdSchemaType,
  ProductArdSchemaResolver,
  ProductArdSchema,
  stageValues,
} from "./types";
import { useForm } from "react-hook-form";
import {
  useGetApiV1FormQuery,
  useGetApiV1ProductStpsQuery,
  usePutApiV1ProductArdByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  AuditModules,
  cn,
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
  details: ProductArdSchemaType;
}

export function Edit({ isOpen, id, onClose, details }: Props) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
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
    },
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
        console.log("Product STP not found");
        toast.error("Product STP not found. Please select a valid STP.");
        return;
      }
      // Handle form submission
      const perse = ProductArdSchema.parse(data);
      const stage = stageValues[perse.stage];
      const payload = {
        stpNumber: productStp?.stpNumber,
        specNumber: data.specNumber,
        description: data?.description,
        stage,
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
      console.error("Error submitting form:", error);
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
