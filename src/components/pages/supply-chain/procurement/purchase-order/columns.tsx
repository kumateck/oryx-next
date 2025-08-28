import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
// import { useDispatch } from "react-redux";

import { Icon } from "@/components/ui";
import {
  convertToLargestUnit,
  getEnumBadgeWithHexColors,
  getSmallestUnit,
  PurchaseOrderStatusList,
  Units,
  waitForTimeout,
} from "@/lib";
import {
  PurchaseOrderDtoRead,
  PurchaseOrderStatus,
} from "@/lib/redux/api/openapi.generated";

// import PrintPreview from "./print/preview";
import Create from "./final-details";
// import PrintPreview from "./print/preview";
import StatusBadge from "@/shared/status-badge";
import PrintPreview from "./print/preview";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
// export function DataTableRowActions<TData extends PurchaseOrderDtoRead>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   const [isCreateOpen, setIsCreateOpen] = useState(false);

//   const details = row.original;

//   const computeTotalFobValue = (items: any[]) => {
//     return items.reduce((total, item) => {
//       if (!item.quantity || !item.price || !item.uom?.symbol) return total;
//       const smallestUnit = getSmallestUnit(item.uom.symbol as Units);
//       const converted = convertToLargestUnit(item.quantity, smallestUnit);
//       return total + converted.value * item.price;
//     }, 0);
//   };

//   const totalFobValue = computeTotalFobValue(details.items || []);
//   return (
//     <section className="flex items-center justify-end gap-2">
//       <Icon
//         name="Printer"
//         className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
//         onClick={() => setIsCreateOpen(true)}
//       />
//       {/* <Icon
//         name="Trash2"
//         className="h-5 w-5 cursor-pointer text-danger-default hover:cursor-pointer"
//         onClick={() => setIsCreateOpen(true)}
//       /> */}
//       {isCreateOpen && (
//         <Create
//           isOpen={isCreateOpen}
//           onClose={() => setIsCreateOpen(false)}
//           purchaseOrderId={row.original.id as string}
//           currency={{
//             symbol: row.original.supplier?.currency?.symbol as string,
//             name: row.original.supplier?.currency?.name as string,
//           }}
//           defaultValues={{
//             amountInWords: details.amountInFigures as string,
//             cifValue: details.totalCifValue as number,
//             estimatedDeliveryDate: details.estimatedDeliveryDate
//               ? new Date(details.estimatedDeliveryDate)
//               : new Date(),
//             freight: details.seaFreight as number,
//             insuranceAmount: details.insurance as number,
//             totalFobValue: totalFobValue,
//             deliveryMode: {
//               label: details.deliveryMode?.name as string,
//               value: details.deliveryMode?.id as string,
//             },
//             termsOfPayment: {
//               label: details.termsOfPayment?.name as string,
//               value: details.termsOfPayment?.id as string,
//             },
//             invoiceNumber: details.proFormaInvoiceNumber as string,
//           }}
//         />
//       )}
//     </section>
//   );
// }
export function DataTableRowActions<TData extends PurchaseOrderDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [purchaseOrderIdForPrint, setPurchaseOrderIdForPrint] = useState<
    string | null
  >(null);

  const details = row.original;

  const computeTotalFobValue = (items: any[]) => {
    return items.reduce((total, item) => {
      if (!item.quantity || !item.price || !item.uom?.symbol) return total;
      const smallestUnit = getSmallestUnit(item.uom.symbol as Units);
      const converted = convertToLargestUnit(item.quantity, smallestUnit);
      return total + converted.value * item.price;
    }, 0);
  };

  const totalFobValue = computeTotalFobValue(details.items || []);

  const handleCreateSuccess = async () => {
    console.log("this is reached");
    // setIsCreateOpen(false);

    await waitForTimeout(1000);
    const id = row.original.id as string;
    console.log(id);
    setPurchaseOrderIdForPrint(() => id);
    setIsPrintOpen(() => true);
  };

  console.log(isPrintOpen, "isPrintOpen", purchaseOrderIdForPrint);
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Printer"
        className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
        onClick={() => setIsCreateOpen(true)}
      />

      {isCreateOpen && (
        <Create
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={handleCreateSuccess}
          purchaseOrderId={row.original.id as string}
          currency={{
            symbol: row.original.supplier?.currency?.symbol as string,
            name: row.original.supplier?.currency?.name as string,
          }}
          defaultValues={{
            amountInWords: details.amountInFigures as string,
            cifValue: details.totalCifValue as number,
            estimatedDeliveryDate: details.estimatedDeliveryDate
              ? new Date(details.estimatedDeliveryDate)
              : new Date(),
            freight: details.seaFreight as number,
            insuranceAmount: details.insurance as number,
            totalFobValue: totalFobValue,
            deliveryMode: {
              label: details.deliveryMode?.name as string,
              value: details.deliveryMode?.id as string,
            },
            termsOfPayment: {
              label: details.termsOfPayment?.name as string,
              value: details.termsOfPayment?.id as string,
            },
            invoiceNumber: details.proFormaInvoiceNumber as string,
          }}
        />
      )}

      {isPrintOpen && purchaseOrderIdForPrint && (
        <PrintPreview
          isOpen={isPrintOpen}
          onClose={() => setIsPrintOpen(false)}
          id={purchaseOrderIdForPrint}
        />
      )}
    </section>
  );
}
export const columns: ColumnDef<PurchaseOrderDtoRead>[] = [
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.supplier?.name}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Awarded Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-36">
        {PurchaseOrderStatusList[row.original?.status as PurchaseOrderStatus]}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const listsColumns: ColumnDef<PurchaseOrderDtoRead>[] = [
  {
    accessorKey: "code",
    header: "PO Number",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.supplier?.name}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expectedDeliveryDate",
    header: "Expected Delivery Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.expectedDeliveryDate
          ? format(row.original.expectedDeliveryDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as PurchaseOrderStatus;
      const { label, style } = getEnumBadgeWithHexColors(
        PurchaseOrderStatusList,
        status,
      );
      return <StatusBadge label={label} style={style} />;
    },
  },
  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
