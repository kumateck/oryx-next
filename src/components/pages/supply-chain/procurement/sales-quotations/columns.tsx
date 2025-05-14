import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { Icon } from "@/components/ui";
import { SupplierQuotationDto } from "@/lib/redux/api/openapi.generated";

import Cost from "./cost";
import { useSelector } from "@/lib/redux/store";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends SupplierQuotationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [quotationId, setQuotationId] = useState("");

  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <section className="flex items-center justify-end gap-2">
      {isOpen && (
        <Cost
          id={quotationId}
          supplierId={supplierId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      {findRecordWithAccess(
        permissions,
        PermissionKeys.procurement.inputResponses,
      ) && (
        <Icon
          onClick={() => {
            setQuotationId(row.original?.id as string);
            setSupplierId(row.original?.supplier?.id as string);
            setIsOpen(true);
          }}
          name="HandCoins"
          className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
        />
      )}
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
    header: "Total Material Requested",
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
