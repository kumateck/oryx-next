import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";

import Edit from "./edit";
// import Edit from "./edit";
import { RevisionRequestDto } from "./type";
import { Option, RevisionType, splitWords, SupplierType } from "@/lib";
import { ColumnType } from "@/shared/datatable";
import { TableMenuAction } from "@/shared/table-menu";
import ReAssign from "./reassign";
import ChangeSource from "./change-source";

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
  const [isOpenReAssign, setIsOpenReAssign] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);

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
      <TableMenuAction>
        {!row.original.purchaseOrderItemId && (
          <DropdownMenuItem className="group">
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={() => {
                setDetails(row.original);
                setIsOpen(true);
              }}
            >
              <span className="text-black">
                <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
              </span>
              <span>Edit</span>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="group">
          <div
            onClick={() => {
              setDetails(row.original);
              setIsDeleteOpen(true);
            }}
            className="flex cursor-pointer items-center justify-start gap-2"
          >
            <span className="text-black">
              <Icon name="Trash2" className="h-5 w-5 text-danger-default" />
            </span>
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <div
            onClick={() => {
              setDetails(row.original);
              setIsOpenReAssign(true);
            }}
            className="flex cursor-pointer items-center justify-start gap-2"
          >
            <span className="text-black">
              <Icon name="Infinity" className="h-5 w-5 text-neutral-default" />
            </span>
            <span>Re-Assign Supplier</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <div
            onClick={() => {
              setDetails(row.original);
              setIsOpenChange(true);
            }}
            className="flex cursor-pointer items-center justify-start gap-2"
          >
            <span className="text-black">
              <Icon name="Chrome" className="h-5 w-5 text-neutral-default" />
            </span>
            <span>Change Supply Source </span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      {details && isOpen && (
        <Edit
          setItemLists={setItemLists}
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          itemLists={itemLists}
          currency={details?.currency as Option}
          supplierId={details?.supplierId as string}
        />
      )}
      {details && isOpenReAssign && (
        <ReAssign
          details={details}
          isOpen={isOpenReAssign}
          onClose={() => setIsOpenReAssign(false)}
          currency={details?.currency as Option}
        />
      )}
      {details && isOpenChange && (
        <ChangeSource
          details={details}
          isOpen={isOpenChange}
          onClose={() => setIsOpenChange(false)}
          sourceType={
            Number(details?.supplierType) === SupplierType.Foreign
              ? SupplierType.Local
              : SupplierType.Foreign
          }
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
  // {
  //   accessorKey: "uom",
  //   header: "UOM",
  //   // cell: ({ row }) => <div>{row.original.uom?.symbol}</div>,
  //   cell: ({ row }) => {
  //     const qty = convertToLargestUnit(
  //       row.original.quantity as number,
  //       getSmallestUnit(row.original.uoM?.label as Units),
  //     );
  //     return <div className="">{qty.unit}</div>;
  //   },
  // },
  // {
  //   accessorKey: "quantity",
  //   header: " Quantity",
  //   // cell: ({ row }) => <div>{row.original.quantity}</div>,
  //   cell: ({ row }) => {
  //     const qty = convertToLargestUnit(
  //       row.original.quantity as number,
  //       getSmallestUnit(row.original.uoM?.label as Units),
  //     );
  //     return <div className="">{qty.value}</div>;
  //   },
  // },

  {
    accessorKey: "quantity",
    header: " Quantity",
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
