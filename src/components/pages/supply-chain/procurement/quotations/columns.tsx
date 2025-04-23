import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { Icon } from "@/components/ui";
import { SupplierQuotationDto } from "@/lib/redux/api/openapi.generated";

import PrintPreview from "./print/preview";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends SupplierQuotationDto>({
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
          setSupplierId(row.original.supplier?.id as string);
          setIsOpen(true);
        }}
        name="Printer"
        className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
      />
    </section>
  );
}

export const columns: ColumnDef<SupplierQuotationDto>[] = [
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.supplier?.name}</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total Material Requested ",
    cell: ({ row }) => <div>{row.original.items?.length}</div>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-36">
        {!row.original.receivedQuotation && "Pending"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
