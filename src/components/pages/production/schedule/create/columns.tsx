import { ColumnDef } from "@tanstack/react-table";

import { ColumnType } from "@/app/shared/datatable";
import { Option } from "@/lib";

// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  options: Option[],
): ColumnDef<MaterialRequestDto>[] => [
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "uomId",
    header: "UOM",
    meta: {
      edittableCell: {
        type: ColumnType.COMBOBOX,
        editable: true,
        setItemLists,
        options,
      },
    },
  },
  {
    accessorKey: "quantity",
    header: "Request Qty",
    meta: {
      edittableCell: {
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
];
