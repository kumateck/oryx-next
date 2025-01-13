import { ColumnDef } from "@tanstack/react-table";

import { ColumnType } from "@/app/shared/datatable";

// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
): ColumnDef<MaterialRequestDto>[] => [
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
    meta: {
      edittableCell: {
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    meta: {
      edittableCell: {
        type: ColumnType.TEXT,
        editable: true,
        setItemLists,
      },
    },
  },
];
