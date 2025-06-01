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
  useGetApiV1MaterialStpsQuery,
  usePostApiV1MaterialArdMutation,
  useGetApiV1FormQuery,
} from "@/lib/redux/api/openapi.generated";
import { MaterialArdSchemaResolver, MaterialArdSchemaType } from "./types";
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
  } = useForm<MaterialArdSchemaType>({
    resolver: MaterialArdSchemaResolver,
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

  const [createMaterialArdMutation, { isLoading }] =
    usePostApiV1MaterialArdMutation();

  //fuction fro creating material analytical raw data
  const onSubmit = async (data: MaterialArdSchemaType) => {
    const materialStp = materialStps?.data?.find(
      (stp) => stp.id === data.stpId.value,
    );

    if (!materialStp || !materialStp.stpNumber) {
      console.log("Material STP not found");
      toast.error("Material STP not found. Please select a valid STP.");
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
      console.log("this is payload", payload);
      // 1. Create the material analytical raw data
      await createMaterialArdMutation({
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.materials,
        createMaterialAnalyticalRawDataRequest: payload,
      }).unwrap();

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
          <DialogTitle>Add Analytical Raw Data</DialogTitle>
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
