import { ColumnDef } from "@tanstack/react-table";
import { Option } from "@/lib";

import { InventoryRequestDto } from "./type";
import { ColumnType } from "@/shared/datatable";
// import { useUserPermissions } from "@/hooks/use-permission";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<InventoryRequestDto[]>>,
  options: Option[],
  extraEvents?: (rowIndex: number, value: unknown) => void,
): ColumnDef<InventoryRequestDto>[] => [
  {
    accessorKey: "code",
    header: "Item Code",
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "uom",
    header: "UOM",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "source",
    header: "Source",
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
    accessorKey: "Vendor",
    header: "Vendor",
    meta: {
      edittableCell: {
        type: ColumnType.MULTI,
        editable: true,
        setItemLists,
      },
    },
  },
];
