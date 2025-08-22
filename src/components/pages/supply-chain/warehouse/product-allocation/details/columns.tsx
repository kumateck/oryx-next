import { AllocateProductionOrderDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";

export const column: ColumnDef<AllocateProductionOrderDtoRead>[] = [
  {
    accessorKey: "ProductName",
    header: "Order Code",
    cell: ({ row }) => <div>{row.original.productionOrder?.code}</div>,
  },
  // {
  //   accessorKey: "qarNumber",
  //   header: "QAR #",
  //   cell: ({ row }) => <div>{row.original?.}</div>,
  // },

  // {
  //   accessorKey: "expiryDate",
  //   header: "Expiry Date",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.batchManufacturingRecord?.expiryDate
  //         ? format(
  //             row.original.batchManufacturingRecord?.expiryDate,
  //             "MMMM dd, yyyy",
  //           )
  //         : "-"}
  //     </div>
  //   ),
  // },
];
