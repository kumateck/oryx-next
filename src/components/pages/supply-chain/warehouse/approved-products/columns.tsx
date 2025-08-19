import { sanitizeNumber } from "@/lib";
import { ApprovedProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ApprovedProductDtoRead>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original?.product?.name}</div>,
  },

  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original?.product?.code}</div>,
  },
  {
    accessorKey: "quantityPerPack",
    header: "Quantity Per Pack",
    cell: ({ row }) => {
      return <div className="">{row.original.quantityPerPack}</div>;
    },
  },
  {
    accessorKey: "totalLoose",
    header: "Loose",
    cell: ({ row }) => {
      return <div className="">{row.original.totalLoose}</div>;
    },
  },
  {
    accessorKey: "totalQuantity",
    header: "Packing Quantity",
    cell: ({ row }) => {
      return <div className="">{row.original.totalQuantity}</div>;
    },
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
    cell: ({ row }) => {
      return (
        <div className="">
          {sanitizeNumber(row.original.totalQuantity) *
            sanitizeNumber(row.original.quantityPerPack)}
        </div>
      );
    },
  },
];
