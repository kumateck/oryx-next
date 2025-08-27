import { ColumnDef } from "@tanstack/react-table";

import { Option } from "@/lib";
import { ColumnType } from "@/shared/datatable";

import { MaterialRequestDto } from "../details/products/type";

// import Edit from "./edit";
// import { MaterialRequestDto } from "./type";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  options: Option[],
): ColumnDef<MaterialRequestDto>[] => [
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original?.code}</div>,
  },
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
