import { format } from "date-fns";
import Image from "next/image";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

import logo from "@/app/assets/oryx_logo_dark.png";
import { ListsTable } from "@/app/shared/datatable";
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
  PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg,
  useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";

import { columns } from "./column";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  date?: Date;
}
const PrintPreview = ({ isOpen, onClose, id, date }: Props) => {
  const [emailQuotation] =
    usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation();
  const { data, isLoading } =
    useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery({
      purchaseOrderId: id,
    });

  // console.log(date, "date");
  const items = data?.items ?? [];
  const supplier = data?.supplier;
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    try {
      await emailQuotation({
        purchaseOrderId: id,
        sendPurchaseOrderRequest: {
          expectedDeliveryDate: date,
        },
      } as PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg).unwrap();
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
            <div>{date ? format(date, "MMM dd, yyyy") : "-"}</div>
          </div>
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="text-2xl font-semibold">Purchase Order</span>
          </div>
          <ListsTable columns={columns} data={items} isLoading={isLoading} />
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
