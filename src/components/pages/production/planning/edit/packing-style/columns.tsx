import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import {
  ConfirmDeleteDialog,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
} from "@/components/ui";

import Edit from "./edit";
import { PackingStyleRequestDto } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<PackingStyleRequestDto[]>>;
  itemLists: PackingStyleRequestDto[];
}
export function DataTableRowActions<TData extends PackingStyleRequestDto>({
  row,
  setItemLists,
  itemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<PackingStyleRequestDto>(
    {} as PackingStyleRequestDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
          itemLists={itemLists}
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
  setItemLists: React.Dispatch<React.SetStateAction<PackingStyleRequestDto[]>>,
  lists: PackingStyleRequestDto[],
): ColumnDef<PackingStyleRequestDto>[] => [
  {
    accessorKey: "idIndex",
    header: "#",
  },

  {
    accessorKey: "name",
    header: "Packing Style",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "description", // Access nested label for display
    header: "Description",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "details",
    header: "Units",
    cell: ({ row }) => (
      <div className="text-sm">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="group flex items-center gap-2 max-w-[200px] cursor-pointer">
              <div className="flex items-center gap-1 text-neutral-600 group-hover:text-neutral-900 transition-colors">
                <Icon name="Package" className="h-4 w-4" />
                <span className="truncate text-sm font-medium">
                  {row.original.packingLists?.length || 0} Units
                </span>
              </div>
              <Icon
                name="ChevronRight"
                className="h-3 w-3 text-neutral-400 group-hover:text-neutral-600 transition-colors"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Package" className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-sm text-gray-900">
                  Packing Units
                </h4>
              </div>

              {row.original.packingLists &&
              row.original.packingLists.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {row.original.packingLists.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.uomId.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-blue-600">
                          {item.quantity}
                        </span>
                        <span className="text-xs text-gray-500">units</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 text-gray-500">
                  <div className="text-center">
                    <Icon
                      name="PackageOpen"
                      className="h-8 w-8 mx-auto mb-2 text-gray-300"
                    />
                    <p className="text-sm">No packing units</p>
                  </div>
                </div>
              )}

              {row.original.packingLists &&
                row.original.packingLists.length > 3 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      {row.original.packingLists.length} total units
                    </p>
                  </div>
                )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        setItemLists={setItemLists}
        itemLists={lists}
      />
    ),
  },
];
