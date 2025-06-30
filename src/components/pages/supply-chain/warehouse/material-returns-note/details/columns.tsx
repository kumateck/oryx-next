import { ColumnDef } from "@tanstack/react-table";

import { MaterialReturnNotePartialReturnDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<MaterialReturnNotePartialReturnDto>[] = [
  {
    id: "materialCode",
    header: "Material Code",
    cell: ({ row }) => {
      return row.original.material?.code;
    },
  },
  {
    id: "materialName",
    header: "Material Name",
    cell: ({ row }) => {
      return row.original.material?.name;
    },
  },
  //   {
  //     id: "arNumber",
  //     header: "AR Number",
  //     cell: ({ row }) => {
  //       return row.original.material?.;
  //     },
  //   },
  {
    id: "returnQuantity",
    header: "Return Quantity",
    cell: ({ row }) => {
      return row.original.quantity;
    },
  },
  {
    id: "uom",
    header: "Unit of Measure",
    cell: ({ row }) => <div>{row.original.uoM?.name}</div>,
  },
];
