import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
// import { useState } from "react";

// import { Icon } from "@/components/ui";

import { ApprovalEntityRead } from "@/lib/redux/api/openapi.generated";
import { splitWords } from "@/lib";

// import Edit from "./edit";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }
// export function DataTableRowActions<TData extends ApprovalEntityRead>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [supplierId, setSupplierId] = useState("");
//   return (
//     <section className="flex items-center justify-end gap-2">
//       <Icon
//         onClick={() => {
//           setSupplierId(row.original.id as string);
//           setIsOpen(true);
//         }}
//         name="Printer"
//         className="h-5 w-5 cursor-pointer text-neutral-500 hover:cursor-pointer"
//       />
//     </section>
//   );
// }

export const columns: ColumnDef<ApprovalEntityRead>[] = [
  {
    accessorKey: "modelType",
    header: "Approval Type",
    cell: ({ row }) => (
      <div className="min-w-36">
        {splitWords(row.original.modelType as string)}
      </div>
    ),
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.department?.name}</div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: "Requested By",
    cell: ({ row }) => {
      const name = row.original?.requestedBy?.name as string;
      return <div className="min-w-36">{name}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Request Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },

  // {
  //   accessorKey: "total",
  //   header: "Total Items Requested",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.items?.reduce((accumulator, item) => {
  //         return accumulator + (item.quantity || 0);
  //       }, 0)}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "totalprice",
  //   header: "Total Items Requested",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.items?.reduce((accumulator, item) => {
  //         return accumulator + (item.price || 0) * (item?.quantity || 0);
  //       }, 0)}
  //     </div>
  //   ),
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
