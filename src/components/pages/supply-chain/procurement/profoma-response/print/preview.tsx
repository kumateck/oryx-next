import Image from "next/image";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

import logo from "@/app/assets/oryx_logo_dark.png";
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
import { ListsTable } from "@/shared/datatable";

import { columns } from "./column";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const PrintPreview = ({ isOpen, onClose, id }: Props) => {
  const [emailQuotation] =
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
    onAfterPrint: () => onClose(),
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
  const handleDialogChange = (open: boolean) => {
    // Only close if the "Close" button is clicked (open = false)
    if (!open) onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl rounded-none" noClose>
        <div className="relative">
          <div className="absolute -right-36 flex flex-col gap-4">
            <Button variant="outline" onClick={() => handlePrint()}>
              <Icon name="Printer" />
              <span>Send Email</span>
            </Button>
            <Button variant="destructive" onClick={() => onClose()}>
              <span>Close</span>
            </Button>
          </div>
        </div>
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <article ref={contentRef} className="bg-white">
          <div className="flex justify-between gap-4">
            <div>
              <Image src={logo} alt="logo" width={100} height={100} />
            </div>
            <div className="flex flex-col gap-0.5 text-sm">
              <span className="capitalize">{supplier?.name}</span>
              <span>{supplier?.code}</span>
              <span>telephone</span>
            </div>
          </div>
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
