// import { sanitizeNumber } from "@/lib";
import { AllocateProductionOrderProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";

export const column: ColumnDef<AllocateProductionOrderProductDtoRead>[] = [
  {
    accessorKey: "code",
    header: "Order Code",
    cell: ({ row }) => <div>{row.original?.product?.code}</div>,
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original?.product?.name}</div>,
  },
  {
    accessorKey: "totalValue",
    header: "Total Allocated Quantity",
    cell: ({ row }) => {
      const itemSum = row.original?.fulfilledQuantities?.reduce(
        (sum, fq) => sum + (fq.quantity || 0),
        0,
      );
      return <div className="min-w-36">{itemSum}</div>;
    },
  },
];
