import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  DistributedFinishedProductDtoRead,
  FinishedGoodsTransferNoteDtoRead,
} from "@/lib/redux/api/openapi.generated";
import { Button, DropdownMenuItem, Icon } from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";
import { useState } from "react";
import { ApproveTransferNote } from "./approve";
import { useRouter } from "next/navigation";
import { sanitizeNumber } from "@/lib";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends DistributedFinishedProductDtoRead,
>({ row }: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [selectDetails, setDetails] =
    useState<FinishedGoodsTransferNoteDtoRead>();
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <Button
            variant={"ghost"}
            onClick={() => {
              setDetails(row.original);
              setOpen(true);
            }}
          >
            <Icon
              name="Check"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Approve</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <Button
            onClick={() =>
              router.push(
                `/warehouse/finished-goods-transfer-notes/${row?.original.id}`,
              )
            }
            variant={"ghost"}
          >
            <Icon
              name="View"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>View Details</span>
          </Button>
        </DropdownMenuItem>
      </TableMenuAction>
      <ApproveTransferNote
        isOpen={open}
        onClose={() => setOpen(false)}
        details={selectDetails}
      />
    </section>
  );
}

export const columns: ColumnDef<FinishedGoodsTransferNoteDtoRead>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <div>{row.original?.batchManufacturingRecord?.product?.name}</div>
    ),
  },
  {
    accessorKey: "batchNumber",
    header: "Batch # ",
    cell: ({ row }) => (
      <div>{row.original.batchManufacturingRecord?.batchNumber}</div>
    ),
  },
  {
    accessorKey: "qarNumber",
    header: "QAR #",
    cell: ({ row }) => <div>{row.original?.qarNumber}</div>,
  },

  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.batchManufacturingRecord?.manufacturingDate
          ? format(
              row.original.batchManufacturingRecord?.manufacturingDate,
              "MMMM dd, yyyy",
            )
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.batchManufacturingRecord?.expiryDate
          ? format(
              row.original.batchManufacturingRecord?.expiryDate,
              "MMMM dd, yyyy",
            )
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "quantityPerPack",
    header: "Qty Per Pack",
    cell: ({ row }) => <div>{row.original.quantityPerPack}</div>,
  },
  {
    accessorKey: "packageStyle",
    header: "Packing Style",
    cell: ({ row }) => (
      <div>
        {row.original.totalQuantity} {row.original.packageStyle?.name}
      </div>
    ),
  },
  // {
  //   accessorKey: "packageStyle",
  //   header: "Packing Style",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.totalQuantity} {row.original.}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "totalQuantity",
    header: "Total Qty Transfer",
    cell: ({ row }) => {
      const total =
        sanitizeNumber(row.original.quantityPerPack) *
        sanitizeNumber(row.original.totalQuantity);

      return (
        <div>
          {total} {row.original.uoM?.symbol}
        </div>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
