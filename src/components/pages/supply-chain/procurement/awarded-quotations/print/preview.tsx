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
import { ErrorResponse, PurchaseOrderStatusList, isErrorResponse } from "@/lib";
import {
  PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg,
  useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  useLazyGetApiV1ProcurementPurchaseOrderQuery,
  usePostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";

import { columns } from "./column";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}
const PrintPreview = ({ isOpen, onClose, id }: Props) => {
  const [emailQuotation, { isLoading: isSending }] =
    usePostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdMutation();

  const [loadData] = useLazyGetApiV1ProcurementPurchaseOrderQuery();
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

  const handleLoad = async () => {
    await loadData({
      page: 1,
      pageSize: 30,
      status: PurchaseOrderStatusList.Pending,
    }).unwrap();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl rounded-none" noClose>
        <div className="relative">
          <div className="absolute -right-36 flex flex-col gap-4">
            <Button variant="outline" onClick={() => handlePrint()}>
              {isSending ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name="Printer" />
              )}
              <span>Print</span>
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
              {/* <span>{supplier?.}</span> */}
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
