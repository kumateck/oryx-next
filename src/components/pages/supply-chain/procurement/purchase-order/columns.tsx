import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Icon } from "@/components/ui";
import { PurchaseOrderStatusList } from "@/lib";
import {
  PurchaseOrderDtoRead,
  PurchaseOrderStatus,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

// import PrintPreview from "./print/preview";
import Create from "./final-details";
import PrintPreview from "./print/preview";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends PurchaseOrderDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const dispatch = useDispatch();

  const details = row.original;
  return (
    <section className="flex items-center justify-end gap-2">
      <PrintPreview
        id={row.original.id as string}
        isOpen={isPrintOpen}
        onClose={() => {
          setIsPrintOpen(false);
          dispatch(commonActions.setTriggerReload()); // Add this line
        }}
      />
      <Icon
        name="Printer"
        className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
        onClick={() => setIsCreateOpen(true)}
      />
      <Icon
        name="Trash2"
        className="h-5 w-5 cursor-pointer text-danger-default hover:cursor-pointer"
        onClick={() => setIsCreateOpen(true)}
      />
      {isCreateOpen && (
        <Create
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={() => {
            setIsCreateOpen(false);
            setIsPrintOpen(true);
          }}
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
            totalFobValue: details.totalFobValue as number,
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
    cell: ({ row }) => (
      <div className="min-w-36">
        {PurchaseOrderStatusList[row.original?.status as PurchaseOrderStatus]}
      </div>
    ),
  },
  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
