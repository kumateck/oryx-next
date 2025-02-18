import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import MultiSelectListViewer from "@/shared/multi-select-lists";

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
        className="text-danger-500 h-5 w-5 cursor-pointer"
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
    accessorKey: "workCenters",
    header: "Work Centers",
    cell: ({ row }) => (
      <div>
        <MultiSelectListViewer
          className="max-w-[20ch]"
          lists={row.original.workCenters}
        />
      </div>
    ),
  },
  {
    accessorKey: "estimatedTime",
    header: "Estimated Time",
    cell: ({ row }) => <div>{row.getValue("estimatedTime")}</div>,
  },

  {
    accessorKey: "resources",
    header: "Resources",
    cell: ({ row }) => (
      <div>
        <MultiSelectListViewer
          className="max-w-[20ch]"
          lists={row.original.resources}
        />
      </div>
    ),
  },

  {
    accessorKey: "responsible",
    header: "Responsible Parties",
    cell: ({ row }) => (
      <div>
        <MultiSelectListViewer
          className="max-w-[20ch]"
          lists={
            row.original.responsibleRoles ?? row.original.responsibleUsers ?? []
          }
        />
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
