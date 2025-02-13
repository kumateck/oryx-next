import { ColumnDef } from "@tanstack/react-table";

import { GRNRequestDto } from "./types";

export const getColumns =
  () // setItemLists?: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  // options?: Option[],
  : ColumnDef<GRNRequestDto>[] => [
    {
      accessorKey: "batchNumber",
      header: "Batch Number",
      cell: ({ row }) => <div>{row.original.batchNumber}</div>,
    },
    {
      accessorKey: "materialName",
      header: "Material Name",
      cell: ({ row }) => <div>{row.original.materialName}</div>,
    },
    {
      accessorKey: "manufacturerName",
      header: "Manufacturer Name",
      cell: ({ row }) => <div>{row.original.manufacturerName}</div>,
    },
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Number",
      cell: ({ row }) => <div>{row.original.invoiceNumber}</div>,
    },
    {
      accessorKey: "batchQuantity",
      header: "Batch Quantity",
      cell: ({ row }) => <div>{row.original.batchQuantity}</div>,
    },
    {
      accessorKey: "expriryDate",
      header: "Expriy Date",
      cell: ({ row }) => <div>{row.original.expriryDate}</div>,
    },
    {
      accessorKey: "manufacturingDate",
      header: "Manufacturing Date",
      cell: ({ row }) => <div>{row.original.manufacturingDate}</div>,
    },
    {
      accessorKey: "retestDate",
      header: "Retest Date",
      cell: ({ row }) => <div>{row.original.retestDate}</div>,
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
