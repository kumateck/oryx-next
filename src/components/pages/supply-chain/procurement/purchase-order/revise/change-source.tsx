import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui";
import { InputTypes, Option, SupplierType } from "@/lib";
import React from "react";
import {
  CreateSuppliersValidator,
  RevisionRequestDto,
  SuppliersRequestDto,
} from "./type";
import { FormWizard } from "@/components/form-inputs";
import { Control, useForm } from "react-hook-form";
import { useGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery } from "@/lib/redux/api/openapi.generated";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  details: RevisionRequestDto;
  currency: Option;
  sourceType: SupplierType;
}
const ChangeSource = ({
  isOpen,
  onClose,
  details,
  // currency,
  sourceType,
}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SuppliersRequestDto>({
    resolver: CreateSuppliersValidator,
    mode: "all",
    defaultValues: {},
  });
  const onSubmit = (data: SuppliersRequestDto) => {
    console.log(data, "data");
  };

  const { data } = useGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery({
    materialId: details.material.value,
    type: sourceType as SupplierType,
  });
  const options = data?.map((vendor) => ({
    label: vendor.name,
    value: vendor.id,
  })) as Option[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle>
          Change Supplier Source to{" "}
          {sourceType === SupplierType.Foreign ? "Foreign" : "Local"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWizard
            config={[
              {
                label: "Suppliers",
                control: control as unknown as Control,
                type: InputTypes.MULTI,
                name: `suppliers`,
                required: true,
                placeholder: "Select Suppliers",
                errors,
                options,
              },
            ]}
          />
          <DialogFooter>
            <Button variant={"outline"} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              <span>Save Changes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeSource;
