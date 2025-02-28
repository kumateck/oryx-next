import React, { useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

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
  ProductionScheduleProcurementDto,
  useGetApiV1MaterialByMaterialIdStockWarehousesQuery,
} from "@/lib/redux/api/openapi.generated";

import TransferForm from "./form";
import { CreateTransferValidator, TransferRequestDto } from "./type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  materialInfo: ProductionScheduleProcurementDto;
}

const InternalTransfers = ({ isOpen, onClose, materialInfo }: Props) => {
  const { data } = useGetApiV1MaterialByMaterialIdStockWarehousesQuery({
    // productId: materialInfo.material?.id,
    // productionScheduleId: materialInfo?.,
    materialId: materialInfo.material?.id as string,
  });
  console.log(data, "materials info");
  const {
    register,
    control,
    formState: { errors },
    // reset,
    handleSubmit,
  } = useForm<TransferRequestDto>({
    resolver: CreateTransferValidator,
    mode: "all",
  });
  const onSubmit = async (data: TransferRequestDto) => {
    console.log(data);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sources",
  });
  const sources = useWatch({
    control,
    name: "sources",
  });

  // Memoize derived values
  const typeValues = useMemo(() => {
    return sources?.map((item) => item?.department) || [];
  }, [sources]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Stock Transfer Request</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TransferForm
            register={register}
            errors={errors}
            control={control}
            fields={fields}
            remove={remove}
            departmentOptions={[]}
            typeValues={typeValues}
            append={append}
            // materialTypeOptions={materialTypeOptions}
            // materialOptions={materialOptions}
            // uomOptions={uomOptions}
          />
          <DialogFooter className="justify-end gap-4 py-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button variant={"default"} className="flex items-center gap-2">
              <Icon name="Plus" className="h-4 w-4" />
              <span>Add BOM</span>{" "}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InternalTransfers;
