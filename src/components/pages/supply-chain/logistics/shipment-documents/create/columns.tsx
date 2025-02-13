import { ColumnDef } from "@tanstack/react-table";

import { MaterialRequestDto } from "./type";

export const columns: ColumnDef<MaterialRequestDto>[] = [
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
  {
    accessorKey: "costPrice",
    header: "Cost Price",
  },
  {
    accessorKey: "expectedQuantity",
    header: "Expected Quantity",
  },
  {
    accessorKey: "receivedQuantity",
    header: "Received Quantity",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturers",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
];
