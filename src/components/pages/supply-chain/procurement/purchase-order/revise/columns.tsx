import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";

import Edit from "./edit";
// import Edit from "./edit";
import { RevisionRequestDto } from "./type";
import { Option, RevisionType, splitWords } from "@/lib";
import { ColumnType } from "@/shared/datatable";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<RevisionRequestDto[]>>;
  itemLists: RevisionRequestDto[];
}
export function DataTableRowActions<TData extends RevisionRequestDto>({
  row,
  setItemLists,
  itemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<RevisionRequestDto>(
    {} as RevisionRequestDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // const handleDelete = () => {
  //   if (details) {
  //     if (details.purchaseOrderItemId) {
  //       setItemLists((prev) => {
  //         return [...prev, { type: RevisionType.RemoveItem }];
  //       });
  //     } else {
  //       setItemLists((prev) =>
  //         prev.filter((item) => {
  //           return item.idIndex !== details.idIndex;
  //         }),
  //       );
  //     }
  //     setItemLists((prev) =>
  //       prev.filter((item) => {
  //         return item.idIndex !== details.idIndex;
  //       }),
  //     );
  //     setIsDeleteOpen(false);
  //   }
  // };

  const handleDelete = () => {
    if (!details) return;
    if (details.purchaseOrderItemId) {
      setItemLists((prev) =>
        prev.map((item) =>
          item.idIndex === details.idIndex
            ? { ...item, type: RevisionType.RemoveItem }
            : item,
        ),
      );
    } else {
      setItemLists((prev) =>
        prev.filter((item) => item.idIndex !== details.idIndex),
      );
    }
    setIsDeleteOpen(false);
  };

  return (
    <section className="flex items-center justify-end gap-2">
      {!row.original.purchaseOrderItemId && (
        <Icon
          name="Pencil"
          className="h-5 w-5 cursor-pointer text-neutral-500"
          onClick={() => {
            setDetails(row.original);
            setIsOpen(true);
          }}
        />
      )}

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
          currency={details?.currency as Option}
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
  setItemLists: React.Dispatch<React.SetStateAction<RevisionRequestDto[]>>,
  lists: RevisionRequestDto[],
): ColumnDef<RevisionRequestDto>[] => [
  {
    accessorKey: "idIndex",
    header: "#",
  },
  {
    accessorKey: "materialId",
    header: " Material",
    cell: ({ row }) => <div>{row.original.material?.label}</div>,
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: ({ row }) => <div>{row.original.uoM?.label}</div>,
  },
  {
    accessorKey: "quantity",
    header: " Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
    meta: {
      edittableCell: {
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div>
        {row.original.currency?.label} {row.original.price}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div>{splitWords(RevisionType[Number(row.original.type)])}</div>
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
