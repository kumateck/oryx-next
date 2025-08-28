// import React, { useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { useReactToPrint } from "react-to-print";
// import { toast } from "sonner";

// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   Icon,
// } from "@/components/ui";
// import { ErrorResponse, formatAmount, isErrorResponse } from "@/lib";
// import {
//   PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg,
//   SupplierDto,
//   useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
//   usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
// } from "@/lib/redux/api/openapi.generated";
// import { commonActions } from "@/lib/redux/slices/common";
// import { ListsTable } from "@/shared/datatable";
// import InvoiceHeader from "@/shared/invoice/header";

// import { columns } from "./column";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   id: string;
//   date?: Date;
// }
// const PrintPreview = ({ isOpen, onClose, id }: Props) => {
//   const dispatch = useDispatch();
//   const [emailQuotation, { isLoading: isSending }] =
//     usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation();
//   const [loadData, { data, isLoading }] =
//     useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery();

//   useEffect(() => {
//     if (isOpen && id) {
//       loadData({ purchaseOrderId: id });
//     }
//   }, [isOpen, id, loadData]);

//   // console.log(date, "date");
//   const items = data?.items ?? [];
//   const supplier = data?.supplier;
//   const contentRef = useRef<HTMLDivElement>(null);

//   const onSubmit = async () => {
//     try {
//       await emailQuotation({
//         purchaseOrderId: id,
//         sendPurchaseOrderRequest: {
//           expectedDeliveryDate: data?.estimatedDeliveryDate,
//         },
//       } as PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg).unwrap();
//     } catch (error) {
//       toast.error(isErrorResponse(error as ErrorResponse)?.description);
//     }
//   };
//   const handlePrint = useReactToPrint({
//     onBeforePrint: () => onSubmit(),
//     onAfterPrint: () => handleLoad(),
//     contentRef,
//     documentTitle: `Quotation`,
//     pageStyle: `
//         @media print {
//             html, body {
//               font-size: 12px;
//             }
//           }
//           @page {
//             margin: 2mm 15mm;
//           }`,
//   });

//   const handleLoad = () => {
//     dispatch(commonActions.setTriggerReload());
//     onClose();
//   };

//   const handleDialogChange = (open: boolean) => {
//     // Only close if the "Close" button is clicked (open = false)
//     if (!open) onClose();
//   };
//   return (
//     <Dialog open={isOpen} onOpenChange={handleDialogChange}>
//       <DialogContent className="max-w-4xl rounded-none" noClose>
//         <div className="absolute -right-36 flex flex-col gap-4">
//           <Button variant="outline" onClick={() => handlePrint()}>
//             {isSending ? (
//               <Icon name="LoaderCircle" className="animate-spin" />
//             ) : (
//               <Icon name="Printer" />
//             )}
//             <span>Send Email</span>
//           </Button>
//           <Button variant="destructive" onClick={() => onClose()}>
//             <span>Close</span>
//           </Button>
//         </div>

//         <DialogHeader className="hidden">
//           <DialogTitle></DialogTitle>
//         </DialogHeader>
//         <article ref={contentRef} className="bg-white">
//           <InvoiceHeader supplier={supplier as SupplierDto} />
//           <div className="flex items-center justify-center gap-4 py-4">
//             <span className="text-2xl font-semibold">Purchase Order</span>
//           </div>
//           <ListsTable columns={columns} data={items} isLoading={isLoading} />

//           <div className="mt-16 flex items-center justify-between text-sm">
//             <div>
//               <div>
//                 <span className="block">Amount in words: </span>
//                 <p className="font-bold">{data?.amountInFigures}</p>
//               </div>

//               <div>
//                 <span>Terms of payment: </span>
//                 <span className="font-bold">{data?.termsOfPayment?.name}</span>
//               </div>
//             </div>

//             <div className="rounded-2xl bg-primary-default/30 px-8 py-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <span>Total FOB Value in USD: </span>
//                 <span className="font-bold">
//                   {formatAmount(Number(data?.totalFobValue), {
//                     currencySymbol:
//                       data?.supplier?.currency?.symbol?.toString(),
//                   })}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <span className="">Insurance in USD: </span>
//                 <span className="font-bold">
//                   {formatAmount(Number(data?.insurance), {
//                     currencySymbol:
//                       data?.supplier?.currency?.symbol?.toString(),
//                   })}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <span>Freight in USD: </span>
//                 <span className="font-bold">
//                   {formatAmount(Number(data?.seaFreight), {
//                     currencySymbol:
//                       data?.supplier?.currency?.symbol?.toString(),
//                   })}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <span>Total CIF Value in USD: </span>
//                 <span className="font-bold">
//                   {formatAmount(Number(data?.totalCifValue), {
//                     currencySymbol:
//                       data?.supplier?.currency?.symbol?.toString(),
//                   })}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </article>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PrintPreview;

import React, { useEffect, useRef } from "react";
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
import { ErrorResponse, formatAmount, isErrorResponse } from "@/lib";
import {
  PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg,
  SupplierDto,
  useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ListsTable } from "@/shared/datatable";
import InvoiceHeader from "@/shared/invoice/header";

import { columns } from "./column";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  date?: Date;
}

const PrintPreview = ({ isOpen, onClose, id }: Props) => {
  const dispatch = useDispatch();
  const [emailQuotation, { isLoading: isSending }] =
    usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation();
  const [loadData, { data, isLoading }] =
    useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery();

  useEffect(() => {
    if (isOpen && id) {
      loadData({ purchaseOrderId: id });
    }
  }, [isOpen, id, loadData]);

  const items = data?.items ?? [];
  const supplier = data?.supplier;
  const contentRef = useRef<HTMLDivElement>(null);

  const onSubmit = async () => {
    try {
      await emailQuotation({
        purchaseOrderId: id,
        sendPurchaseOrderRequest: {
          expectedDeliveryDate: data?.estimatedDeliveryDate,
        },
      } as PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg).unwrap();
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {" "}
      <DialogContent className="max-w-4xl" noClose>
        <div className="absolute -right-36 flex flex-col gap-4">
          <Button variant="outline" onClick={handlePrint}>
            {isSending ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              <Icon name="Printer" />
            )}
            <span>Send Email</span>
          </Button>
          <Button variant="destructive" onClick={onClose}>
            <span>Close</span>
          </Button>
        </div>

        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <article ref={contentRef} className="bg-white">
          <InvoiceHeader supplier={supplier as SupplierDto} />
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="text-2xl font-semibold">Purchase Order</span>
          </div>
          <ListsTable columns={columns} data={items} isLoading={isLoading} />

          <div className="mt-16 flex items-center justify-between text-sm">
            <div>
              <div>
                <span className="block">Amount in words: </span>
                <p className="font-bold">{data?.amountInFigures}</p>
              </div>
              <div>
                <span>Terms of payment: </span>
                <span className="font-bold">{data?.termsOfPayment?.name}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-primary-default/30 px-8 py-4">
              <div className="grid grid-cols-2 gap-4">
                <span>Total FOB Value: </span>
                <span className="font-bold">
                  {formatAmount(Number(data?.totalFobValue), {
                    currencySymbol:
                      data?.supplier?.currency?.symbol?.toString(),
                  })}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span>Insurance: </span>
                <span className="font-bold">
                  {formatAmount(Number(data?.insurance), {
                    currencySymbol:
                      data?.supplier?.currency?.symbol?.toString(),
                  })}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span>Freight: </span>
                <span className="font-bold">
                  {formatAmount(Number(data?.seaFreight), {
                    currencySymbol:
                      data?.supplier?.currency?.symbol?.toString(),
                  })}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <span>Total CIF Value: </span>
                <span className="font-bold">
                  {formatAmount(Number(data?.totalCifValue), {
                    currencySymbol:
                      data?.supplier?.currency?.symbol?.toString(),
                  })}
                </span>
              </div>
            </div>
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreview;
