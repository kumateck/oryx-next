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
  ErrorResponse,
  isErrorResponse,
  Option,
} from "@/lib";
import React from "react";
import { useForm } from "react-hook-form";
import { MaterialArdForm } from "./form";
import {
  Stage,
  useGetApiV1FormQuery,
  useGetApiV1ProductArdQuery,
  usePostApiV1ProductArdMutation,
} from "@/lib/redux/api/openapi.generated";
import {
  ProductArdSchemaType,
  ProductArdSchemaResolver,
  ProductArdSchema,
  stageValues,
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
  const { data: productStps } = useGetApiV1ProductArdQuery({
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

  const [createProductArdMutation, { isLoading }] =
    usePostApiV1ProductArdMutation();

  //fuction for creating product analytical raw data
  const onSubmit = async (data: ProductArdSchemaType) => {
    const productStp = productStps?.data?.find(
      (stp) => stp.stpId === data.stpId.value,
    );
    const parsed = ProductArdSchema.parse(data);
    const stage: Stage = stageValues[parsed.stage];
    if (!productStp || !productStp.stpNumber) {
      toast.error("Product STP not found. Please select a valid STP.");
      return;
    }
    try {
      const payload = {
        stpNumber: productStp?.stpNumber,
        specNumber: data.specNumber,
        description: data?.description,
        stage: stage,
        stpId: data.stpId.value,
        formId: data.formId.value,
      };
      // 1. Create the product analytical raw data
      await createProductArdMutation({
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createProductAnalyticalRawDataRequest: payload,
      }).unwrap();

      toast.success("Product ARD created successfully");
      dispatch(commonActions.setTriggerReload());
      onClose();
      reset();
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
      value: stp.specNumber,
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
          <DialogTitle>Add Analytical Raw Data</DialogTitle>
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
