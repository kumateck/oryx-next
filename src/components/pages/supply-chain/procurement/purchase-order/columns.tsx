import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";

import {
  Button,
  Calendar,
  Icon,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { PurchaseOrderStatusList } from "@/lib/constants";
import {
  PurchaseOrderDtoRead,
  PurchaseOrderStatus,
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
  const [purchaseOrderId, setPurchaseOrderId] = useState("");

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="flex items-center justify-end gap-2">
      {isOpen && (
        <PrintPreview
          id={purchaseOrderId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          date={date}
        />
      )}
      <Popover>
        <PopoverTrigger>
          <Icon
            name="Printer"
            className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent align="end" side="bottom">
          <div className="w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className=""
              fromYear={1900}
              initialFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setPurchaseOrderId(row.original.id as string);
                setIsOpen(true);
              }}
            >
              Print
            </Button>
            <PopoverClose>
              <Button variant="outline">Cancel</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
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
        {PurchaseOrderStatusList[row.original?.status as PurchaseOrderStatus]}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
