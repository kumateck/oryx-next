import { ColumnDef } from "@tanstack/react-table";

import { ColumnType } from "@/app/shared/datatable";
import { Option } from "@/lib";

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
    header: "Unit of Measurement",
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
    accessorKey: "sourceVendors",
    header: "Vendor",
    meta: {
      edittableCell: {
        type: ColumnType.MULTI,
        editable: true,
        setItemLists,
        // options: vendorOptions,
      },
    },
  },
  // {
  //   accessorKey: "quantity",
  //   header: "Request Qty",
  //   meta: {
  //     edittableCell: {
  //       type: ColumnType.NUMBER,
  //       editable: true,
  //       setItemLists,
  //     },
  //   },
  // },
];
