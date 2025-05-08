import { ColumnDef } from "@tanstack/react-table";
import { MaterialRequestDto } from "./type";
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
    accessorKey: "uom",
    header: "Unit of Measure",
  },
  {
    accessorKey: "quantity",
    header: "Quantity Requesting",
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
