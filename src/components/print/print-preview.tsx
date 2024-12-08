import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  Icon,
} from "../ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const PrintPreview = ({ isOpen, onClose, id }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    // onAfterPrint: () => onClose(),
    contentRef,
    documentTitle: `Quotation`,
    pageStyle: `
        @media print {
            html, body {
              font-size: 10px;
            }
          }
          @page {
            margin: 0 15mm;
          }`,
  });
  const handleDialogChange = (open: boolean) => {
    // Only close if the "Close" button is clicked (open = false)
    console.log(id);
    if (!open) onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogOverlay />
      <DialogContent className="rounded-none">
        <div className="relative">
          <div className="absolute -right-36 flex flex-col gap-4">
            <Button variant="outline" onClick={() => handlePrint()}>
              <Icon name="Printer" />
              <span>Print</span>
            </Button>{" "}
            <Button variant="destructive" onClick={() => onClose()}>
              <span>Close</span>
            </Button>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle>Quotation</DialogTitle>
        </DialogHeader>
        <article ref={contentRef}></article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
