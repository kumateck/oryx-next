import { ColumnDef } from "@tanstack/react-table";

import { ChecklistDetailsDto } from "./types";

export const getColumns =
  () // setItemLists?: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  // options?: Option[],
  : ColumnDef<ChecklistDetailsDto>[] => [
    // {
    //   accessorKey: "batchNumber",
    //   header: "Batch Number",
    //   cell: ({ row }) => <div>{row.original.batchNumber}</div>,
    // },
    {
      accessorKey: "numberOfBags",
      header: "Number of Bags",
      cell: ({ row }) => <div>{row.original.numberOfContainers}</div>,
    },
    {
      accessorKey: "expriyDate",
      header: "Expiry Date",
      cell: ({ row }) => (
        <div>
          {new Date(row?.original?.expiryDate ?? "").toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "manufacturingDate",
      header: "Manufacturing Date",
      cell: ({ row }) => (
        <div>
          {new Date(
            row?.original?.manufacturingDate ?? "",
          ).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "retestDate",
      header: "Retest Date",
      cell: ({ row }) => (
        <div>
          {new Date(row?.original?.retestDate ?? "").toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "batchQuantity",
      header: "Batch Quantity",
      cell: ({ row }) => <div>{row.original.quantityPerContainer}</div>,
    },

    // {
    //   accessorKey: "finalTotalStock",
    //   header: "All other Source Stock",
    //   cell: ({ row }) => (
    //     <div>
    //       <DataRowAllStock row={row}>
    //         {/* <ToolTipEllipsis
    //           title={row.original.finalTotalStock as string}
    //           className="max-w-[50ch]"
    //         /> */}
    //         {row.original.finalTotalStock}
    //       </DataRowAllStock>
    //     </div>
    //   ),
    // },
  ];
