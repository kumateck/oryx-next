import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import PrintPreviewSkeleton from "./skeleton";
import HrPrintReportHeader from "./hr-print-report-header";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isLoading: boolean;
  title?: string;
}
const PrintPreview = ({
  isOpen,
  onClose,
  children,
  isLoading,
  title,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    try {
      // await emailQuotation({
      //   supplierId: id,
      //   sendEmailRequest: {
      //     attachments: [
      //       `<!DOCTYPE html>
      //       <html>
      //       <body>
      //       <h1>My First Heading</h1>
      //       <p>My first paragraph.</p>
      //       </body>
      //       </html>`,
      //     ],
      //     subject: "Quotation Request",
      //     body: "The attachment is your email request",
      //   },
      // } as PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg).unwrap();
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
    if (!open) onClose();
  };

  if (isLoading) {
    return <PrintPreviewSkeleton isOpen={isOpen} onClose={onClose} />;
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-4xl rounded-none" noClose>
        <div className="absolute -right-36 flex flex-col gap-4">
          <Button variant="outline" onClick={() => handlePrint()}>
            <span>Print</span>
          </Button>
          <Button variant="outline" onClick={() => handlePrint()}>
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
          <HrPrintReportHeader />
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <p className="text-2xl font-semibold">
              {title ?? "HR Management Resources Report"}
            </p>
            <p>
              Kindly provide us with a sales quotation for the following items:
            </p>
          </div>
          {children}
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
