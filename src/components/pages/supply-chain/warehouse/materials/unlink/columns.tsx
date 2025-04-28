import { ColumnDef } from "@tanstack/react-table";

import { MaterialRequestDto } from "./types";
import { ColumnType } from "@/shared/datatable";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  // options?: Option[],
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
    accessorKey: "reOrderLevel",
    header: "Re-Order Level",
    meta: {
      edittableCell: {
        min: true,
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
  {
    accessorKey: "minimumStockLevel",
    header: "Minimum Stock Level",
    meta: {
      edittableCell: {
        min: true,
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
  {
    accessorKey: "maximumStockLevel",
    header: "Maximum Stock Level",
    meta: {
      edittableCell: {
        min: true,
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
];
