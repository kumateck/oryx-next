import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";

import { Icon } from "@/components/ui";
import { RequisitionStatus } from "@/lib/constants";
import {
  PurchaseOrderDtoRead,
  RequestStatus,
} from "@/lib/redux/api/openapi.generated";

import PrintPreview from "./print/preview";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends PurchaseOrderDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  return (
    <section className="flex items-center justify-end gap-2">
      {isOpen && (
        <PrintPreview
          id={supplierId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Icon
        onClick={() => {
          setSupplierId(row.original.id as string);
          setIsOpen(true);
        }}
        name="Printer"
        className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
      />
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
  // {
  //   accessorKey: "type",
  //   header: "Type",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">
  //       {row.original.requisitionType === RequisitionType.StockVoucher
  //         ? "Stock Voucher"
  //         : "Purchase Requisition Voucher"}
  //     </div>
  //   ),
  // },
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
  // {
  //   accessorKey: "expectedDelivery",
  //   header: "Expected Delivery Date",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">
  //       {row.original.expectedDelivery
  //         ? format(row.original.expectedDelivery, "MMM d, yyyy")
  //         : "-"}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "department",
  //   header: "Requested Department",
  //   cell: ({ row }) => <div>{row.original.requestedBy?.department?.name}</div>,
  // },
  {
    accessorKey: "total",
    header: "Total Items Requested",
    cell: ({ row }) => (
      <div>
        {row.original.items?.reduce((accumulator, item) => {
          return accumulator + (item.quantity || 0);
        }, 0)}
      </div>
    ),
  },
  {
    accessorKey: "totalprice",
    header: "Total Items Requested",
    cell: ({ row }) => (
      <div>
        {row.original.items?.reduce((accumulator, item) => {
          return accumulator + (item.price || 0) * (item?.quantity || 0);
        }, 0)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-36">
        {RequisitionStatus[row.original?.status as RequestStatus]}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
