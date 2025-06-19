import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { GrnDtoRead } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<GrnDtoRead>[] = [
  {
    accessorKey: "grnNumber",
    header: "GRN Number",
    cell: ({ row }) => <div>{row.original.grnNumber}</div>,
  },
  {
    accessorKey: "items",
    header: "Number of Items",
    cell: ({ row }) => <div>{row.original.materialBatches?.length}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Received At",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original?.createdAt, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  // {
  //   id: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div
  //       className={`${
  //         row.original?.remarks ? batchStatusColors(row.original.remarks) : ""
  //       } rounded-full px-2 py-1 w-fit text-center`}
  //     >
  //       {row.original?.carrierName}
  //     </div>
  //   ),
  // },
];
