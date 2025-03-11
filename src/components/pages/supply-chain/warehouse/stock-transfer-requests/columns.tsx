import { ColumnDef } from "@tanstack/react-table";

import { StockTransfer } from "@/lib";
import { StockTransferDtoRead } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<StockTransferDtoRead>[] = [
  {
    accessorKey: "code",
    header: "Transfer Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "requestDepartment",
    header: "Request Department",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => <div>{row.original.productionSchedule?.code}</div>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      // const qty = convertToLargestUnit(
      //   row.original?.sources[0].quantity as number,
      //   row.original.uoM?.symbol as Units,
      // );
      return <div>{row.original.product?.name}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {
          StockTransfer[
            row.original.status as unknown as keyof typeof StockTransfer
          ]
        }
      </div>
    ),
  },
];
