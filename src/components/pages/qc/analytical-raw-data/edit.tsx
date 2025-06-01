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
import { MaterialArdSchemaResolver, MaterialArdSchemaType } from "./types";
import { useForm } from "react-hook-form";
import {
  useGetApiV1FormQuery,
  useGetApiV1MaterialStpsQuery,
  usePutApiV1MaterialArdByIdMutation,
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
  details: MaterialArdSchemaType;
}

export function Edit({ isOpen, id, onClose, details }: Props) {
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
      description: details.description,
      stpId: details.stpId,
      formId: details.formId,
      specNumber: details.specNumber,
    },
  });

  //get stp
  const { data: materialStps } = useGetApiV1MaterialStpsQuery({
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
      await updateMaterialArdMutation({
        id,
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createMaterialAnalyticalRawDataRequest: payload,
      }).unwrap();

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
