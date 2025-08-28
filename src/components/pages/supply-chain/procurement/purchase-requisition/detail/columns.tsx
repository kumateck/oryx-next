import { ColumnDef } from "@tanstack/react-table";

import { Option } from "@/lib";
import { ColumnType } from "@/shared/datatable";

// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  options: Option[],
  extraEvents?: (rowIndex: number, value: unknown) => void,
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
    header: "UOM",
  },
  {
    accessorKey: "quantity",
    header: "Ordered Quantity",
  },
  {
    accessorKey: "source",
    header: "Sourcing Type",
    meta: {
      edittableCell: {
        type: ColumnType.COMBOBOX,
        editable: true,
        setItemLists,
        options,
        extraEvents,
      },
    },
  },
  {
    accessorKey: "sourceSuppliers",
    header: "Supplier",
    meta: {
      edittableCell: {
        type: ColumnType.MULTI,
        editable: true,
        setItemLists,
      },
    },
  },

  // },
];
