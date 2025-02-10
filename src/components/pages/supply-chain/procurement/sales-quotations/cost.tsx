import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  useGetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationQuery,
  usePostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import TableForData from "./table";
import { MaterialRequestDto } from "./table/type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const Cost = ({ isOpen, onClose, id }: Props) => {
  const dispatch = useDispatch();
  const [updatePrices, { isLoading }] =
    usePostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveMutation();
  const { data } =
    useGetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationQuery({
      supplierQuotationId: id,
    });
  // const items = data?.items || [];
  const [itemLists, setItemLists] = React.useState<MaterialRequestDto[]>([]);

  const processedItems = useMemo(() => {
    if (data?.items && data.items.length > 0) {
      return data.items.map((item) => ({
        id: item.id,
        materialId: item.material?.id,
        quantity: item.quantity,
        uomId: item.uoM?.id,
        price: item.quotedPrice ?? 0,
        materialName: item.material?.name,
        uom: item.uoM?.symbol,
      })) as MaterialRequestDto[];
    }
    return [];
  }, [data?.items]);

  // const processedItems = useMemo(() => {
  //   if (items && items.length > 0) {
  //     return items.map((item) => ({
  //       id: item.id,
  //       materialId: item.material?.id,
  //       quantity: item.quantity,
  //       uomId: item.uoM?.id,
  //       price: item.quotedPrice ?? 0,
  //       materialName: item.material?.name,
  //       uom: item.uoM?.name,
  //     })) as MaterialRequestDto[];
  //   }
  //   return [];
  // }, [items]);

  useEffect(() => {
    setItemLists(processedItems);
  }, [processedItems]);

  const onSubmit = async () => {
    try {
      await updatePrices({
        supplierQuotationId: id,
        body: itemLists?.map((item) => ({
          id: item.id,
          price: item.price,
        })),
      }).unwrap();

      toast.success("Prices updated successfully");
      dispatch(commonActions.setTriggerReload());

      onClose();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Update Prices </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <TableForData lists={itemLists} setItemLists={setItemLists} />
          </div>
          <DialogFooter>
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              {isLoading && (
                <Icon name="LoaderCircle" className="mr-2 animate-spin" />
              )}
              <span>Update</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cost;
