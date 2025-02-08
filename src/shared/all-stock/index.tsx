import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery } from "@/lib/redux/api/openapi.generated";

interface Props {
  materialId: string;
  materialName: string;
  isOpen: boolean;
  onClose(): void;
}
const AllStockByMaterial = ({
  materialName,
  materialId,
  isOpen,
  onClose,
}: Props) => {
  const { data } = useGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery({
    materialId,
  });
  console.log(data, "data");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Stock accross all warehouses for {materialName}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AllStockByMaterial;
