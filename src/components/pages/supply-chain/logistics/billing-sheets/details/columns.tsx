import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { ChargeDto } from "@/lib/redux/api/openapi.generated";

import { MaterialRequestDto } from "../create/types";

export const columns: ColumnDef<MaterialRequestDto>[] = [
  // {
  //   accessorKey: "purchaseOrderCode",
  //   header: "PO Code",
  // },
  {
    accessorKey: "code",
    header: "Material Code",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "uomName",
    header: "Unit of Measurement",
  },
  // {
  //   accessorKey: "costPrice",
  //   header: "Price per Unit",
  // },
  {
    accessorKey: "expectedQuantity",
    header: "Expected Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.expectedQuantity as number,
        row.original.uomName as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "receivedQuantity",
    header: "Received Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.receivedQuantity as number,
        row.original.uomName as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturers",
  },
  // {
  //   accessorKey: "reason",
  //   header: "Reason",
  // },
];

export const chargesColumns: ColumnDef<ChargeDto>[] = [
  {
    accessorKey: "name",
    header: "Charge Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <div>{row.original?.amount || ""}</div>;
    },
  },
];
