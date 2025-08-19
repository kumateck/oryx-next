import { ColumnDef } from "@tanstack/react-table";

import { MaterialRequestDto } from "./types";
import { ColumnType } from "@/shared/datatable";

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
    accessorKey: "uomId",
    header: "Base UoM",
    meta: {
      edittableCell: {
        type: ColumnType.SELECT,
        editable: true,
        setItemLists,
      },
    },
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
