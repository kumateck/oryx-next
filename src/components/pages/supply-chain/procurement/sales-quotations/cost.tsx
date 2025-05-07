import React, { useEffect, useState } from "react";
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
  useLazyGetApiV1ProcurementSupplierBySupplierIdQuery,
  useLazyGetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationQuery,
  usePostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import TableForData from "./table";
import { MaterialRequestDto } from "./table/type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  supplierId: string;
}
const Cost = ({ isOpen, onClose, id, supplierId }: Props) => {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState("");
  const [updatePrices, { isLoading }] =
    usePostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveMutation();
  const [loadQuotation] =
    useLazyGetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationQuery();
  const [loadSupplier] = useLazyGetApiV1ProcurementSupplierBySupplierIdQuery();

  const [itemLists, setItemLists] = React.useState<MaterialRequestDto[]>([]);

  useEffect(() => {
    handleProcessItems(id, supplierId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, supplierId]);

  const handleProcessItems = async (
    supplierQuotationId: string,
    supplierId: string,
  ) => {
    try {
      const responseQ = await loadQuotation({
        supplierQuotationId,
      }).unwrap();

      const supplierInfo = await loadSupplier({
        supplierId,
      }).unwrap();
      setCurrency(supplierInfo?.currency?.symbol as string);
      const processedItems = responseQ.items?.map((item) => ({
        id: item.id,
        materialId: item.material?.id,
        quantity: item.quantity,
        uomId: item.uoM?.id,
        price: item.quotedPrice ?? 0,
        materialName: item.material?.name,
        uom: item.uoM?.symbol,
        currency: supplierInfo?.currency?.symbol,
      })) as MaterialRequestDto[];
      setItemLists(processedItems);
    } catch (error) {
      console.log(error);
    }
  };

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
            <TableForData
              lists={itemLists}
              setItemLists={setItemLists}
              currency={currency}
            />
          </div>
          <DialogFooter>
            <Button variant={"outline"} onClick={onClose} type="button">
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
