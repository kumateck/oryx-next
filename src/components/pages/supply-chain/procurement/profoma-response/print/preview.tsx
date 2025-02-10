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
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg,
  useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ListsTable } from "@/shared/datatable";
import InvoiceHeader from "@/shared/invoice/header";

import { columns } from "./column";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const PrintPreview = ({ isOpen, onClose, id }: Props) => {
  const dispatch = useDispatch();
  const [emailQuotation, { isLoading: isSending }] =
    usePostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationMutation();
  const { data, isLoading } =
    useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery({
      purchaseOrderId: id,
    });

  const items = data?.items ?? [];
  const supplier = data?.supplier;
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    try {
      await emailQuotation({
        supplierId: id,
        sendEmailRequest: {
          attachments: [
            `<!DOCTYPE html>
            <html>
            <body>
            <h1>My First Heading</h1>
            <p>My first paragraph.</p>
            </body>
            </html>`,
          ],
          subject: "Quotation Request",
          body: "The attachment is your email request",
        },
      } as PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg).unwrap();
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const handlePrint = useReactToPrint({
    onBeforePrint: () => onSubmit(),
    onAfterPrint: () => handleLoad(),
    contentRef,
    documentTitle: `Quotation`,
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

  const handleLoad = () => {
    dispatch(commonActions.setTriggerReload());
    onClose();
  };

  const handleDialogChange = (open: boolean) => {
    // Only close if the "Close" button is clicked (open = false)
    if (!open) onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl rounded-none" noClose>
        <div className="absolute -right-36 flex flex-col gap-4">
          <Button variant="outline" onClick={() => handlePrint()}>
            {isSending ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              <Icon name="Printer" />
            )}
            <span>Send Email</span>
          </Button>
          <Button variant="destructive" onClick={() => onClose()}>
            <span>Close</span>
          </Button>
        </div>

        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <article ref={contentRef} className="bg-white">
          <InvoiceHeader supplier={supplier} />
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="text-2xl font-semibold">
              Profoma Invoice Request
            </span>
          </div>
          <ListsTable columns={columns} data={items} isLoading={isLoading} />
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
