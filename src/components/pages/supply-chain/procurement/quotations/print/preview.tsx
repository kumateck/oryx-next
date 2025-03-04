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
  useGetApiV1RequisitionSourceSupplierBySupplierIdQuery,
  usePostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ListsTable } from "@/shared/datatable";
import InvoiceHeader from "@/shared/invoice/header";

import { columns } from "./column";

// type UoM = {
//   name: string;
//   symbol: string;
//   description: string;
//   isScalable: boolean;
//   isRawMaterial: boolean;
// };

// type Material = {
//   id: string;
//   name: string;
//   code: string;
// };

// type Item = {
//   id: string;
//   material: Material;
//   uoM: UoM;
//   quantity: number;
// };

// type GroupedMaterial = {
//   materialId: string;
//   materialName: string;
//   uom: UoM;
//   totalQuantity: number;
// };

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
    useGetApiV1RequisitionSourceSupplierBySupplierIdQuery({
      supplierId: id,
    });

  const items = data?.items ?? [];
  // const grouped = items?.reduce<Record<string, GroupedMaterial>>(
  //   (acc, curr) => {
  //     const materialId = curr.material?.id;

  //     // If the material id is not in the accumulator, add it with the current quantity and uom
  //     if (!acc[materialId]) {
  //       acc[materialId] = {
  //         materialId: materialId,
  //         material: curr.material,
  //         uoM: curr.uoM, // Store the UOM from the first occurrence of the material
  //         quantity: 0,
  //       };
  //     }

  //     // Add the current quantity to the existing sum
  //     acc[materialId].quantity += curr.quantity;

  //     return acc;
  //   },
  //   {},
  // );

  // const result: GroupedMaterial[] = Object.values(grouped);

  // console.log(result, "result");
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
    onAfterPrint: () => handleClose(),
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

  const handleClose = () => {
    dispatch(commonActions.setTriggerReload());
    onClose();
  };
  const handleDialogChange = (open: boolean) => {
    // Only close if the "Close" button is clicked (open = false)
    if (!open) onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-4xl rounded-none" noClose>
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
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <p className="text-2xl font-semibold">Sales Quotation Request</p>
            <p>
              Kindly provide us with a sales quotation for the following items:
            </p>
          </div>
          <ListsTable columns={columns} data={items} isLoading={isLoading} />
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
