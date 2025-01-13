import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";

import Edit from "./edit";
// import { Icon } from "adusei-ui";
// import { useState } from "react";
import { RoutingRequestDto } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<RoutingRequestDto[]>>;
}

export function DataTableRowActions<TData extends RoutingRequestDto>({
  row,
  setItemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [details, setDetails] = useState<RoutingRequestDto>(
    {} as RoutingRequestDto,
  );
  const handleDelete = () => {
    if (details) {
      setItemLists((prev) =>
        prev.filter((item) => {
          console.log(item, details);
          return item.idIndex !== details.idIndex;
        }),
      );
      setIsDeleteOpen(false);
    }
  };

  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          setDetails(row.original);
          setIsOpen(true);
        }}
      />
      <Icon
        name="Trash2"
        className="h-5 w-5 cursor-pointer text-danger-500"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      />

      {details && isOpen && (
        <Edit
          setItemLists={setItemLists}
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<RoutingRequestDto[]>>,
): ColumnDef<RoutingRequestDto>[] => [
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => <div>{row.getValue("order")}</div>,
  },
  {
    accessorKey: "operationId",
    header: "Operation",
    cell: ({ row }) => (
      <div className="">{row.original.operationId?.label}</div>
    ),
  },
  {
    accessorKey: "workCenterId",
    header: "Work Center",
    cell: ({ row }) => <div>{row.original.workCenterId?.label}</div>,
  },
  {
    accessorKey: "estimatedTime",
    header: "Estimated Time",
    cell: ({ row }) => <div>{row.getValue("estimatedTime")}</div>,
  },

  {
    accessorKey: "resourceIds",
    header: "Resources",
    cell: ({ row }) => (
      <div>
        <ul className="flex flex-wrap gap-2">
          {row.original?.resourceIds?.map((res, index) => (
            <li key={index}>
              <div className="whitespace-nowrap rounded-3xl border border-neutral-300 px-2 text-sm text-neutral-700">
                {res?.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} setItemLists={setItemLists} />
    ),
  },
];
