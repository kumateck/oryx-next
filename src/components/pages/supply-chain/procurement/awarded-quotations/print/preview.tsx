import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@/components/ui";
import { ErrorResponse, isErrorResponse, PermissionKeys } from "@/lib";
import {
  PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg,
  SupplierDto,
  useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ListsTable } from "@/shared/datatable";
import InvoiceHeader from "@/shared/invoice/header";

import { getColums } from "./column";
import { useUserPermissions } from "@/hooks/use-permission";
import PrintPreviewSkeleton from "./skeleton";
import PurchaseOrderSummary from "./summary";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const PrintPreview = ({ isOpen, onClose, id }: Props) => {
  const dispatch = useDispatch();
  const [emailQuotation, { isLoading: isSending }] =
    usePostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdMutation();

  const { data, isLoading } =
    useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery({
      purchaseOrderId: id,
    });

  const items = data?.items ?? [];
  const supplier = data?.supplier;
  const currency = supplier?.currency?.symbol as string;
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    try {
      await emailQuotation({
        purchaseOrderId: id as string,
      } as PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg).unwrap();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const handlePrint = useReactToPrint({
    onBeforePrint: () => onSubmit(),
    onAfterPrint: () => handleLoad(),
    contentRef,
    documentTitle: `Profoma Invoice Request`,
    pageStyle: `
        @media print {
            html, body {
              font-size: 12px;
            }
          }
          @page {
            margin: 2mm 15mm;
          }`,
  });
  const handleDialogChange = (open: boolean) => {
    // Only close if the "Close" button is clicked (open = false)
    if (!open) onClose();
  };

  const handleLoad = () => {
    dispatch(commonActions.setTriggerReload());
    onClose();
  };
  // check permissions here
  const { hasPermissionAccess } = useUserPermissions();
  // Show skeleton while loading
  if (isLoading) {
    return <PrintPreviewSkeleton isOpen={isOpen} onClose={onClose} />;
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl rounded-none" noClose>
        <div className="absolute -right-36 flex flex-col gap-4">
          {hasPermissionAccess(
            PermissionKeys.procurement.sendAwardedQuotations,
          ) && (
            <Button variant="outline" onClick={() => handlePrint()}>
              {isSending ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name="Printer" />
              )}
              <span>Send Email</span>
            </Button>
          )}
          <Button variant="destructive" onClick={() => onClose()}>
            <span>Close</span>
          </Button>
        </div>

        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <article ref={contentRef} className="bg-white">
          <InvoiceHeader supplier={supplier as SupplierDto} />

          <div className="flex items-center justify-center gap-4 py-4">
            <span className="text-2xl font-semibold">
              Profoma Invoice Request
            </span>
          </div>
          <ListsTable
            columns={getColums(currency)}
            data={items}
            isLoading={isLoading}
          />
          <PurchaseOrderSummary items={items} currency={currency} />
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
