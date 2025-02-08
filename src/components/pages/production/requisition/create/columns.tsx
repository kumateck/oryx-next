import { ColumnDef } from "@tanstack/react-table";
import { subtract } from "lodash";

import { ColumnType } from "@/shared/datatable";

// import { Option } from "@/lib";
// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

export const getColumns =
  () // setItemLists?: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  // options?: Option[],
  : ColumnDef<MaterialRequestDto>[] => [
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
      accessorKey: "quantityRequested",
      header: "Qty Requested",
      cell: ({ row }) => <div>{row.original.quantityRequested}</div>,
    },
    {
      accessorKey: "quantityOnHand",
      header: "Warehouse Stock",
      cell: ({ row }) => <div>{row.original.quantityOnHand}</div>,
    },
    {
      accessorKey: "totalStock",
      header: "All other Source Stock",
      cell: ({ row }) => (
        <div>
          {subtract(
            Number(row.original.totalStock),
            Number(row.original.quantityOnHand),
          )}
        </div>
      ),
    },

    // {
    //   accessorKey: "uomId",
    //   header: "UOM",
    //   meta: {
    //     edittableCell: {
    //       type: ColumnType.COMBOBOX,
    //       editable: true,
    //       setItemLists,
    //       options,
    //     },
    //   },
    // },
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

export const getPurchaseColumns = (
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
    accessorKey: "uom",
    header: "Unit of Measurement",
  },
  {
    accessorKey: "quantityRequested",
    header: "Qty Requested",
    cell: ({ row }) => <div>{row.original.quantityRequested}</div>,
  },
  {
    accessorKey: "quantityOnHand",
    header: "Warehouse Stock",
    cell: ({ row }) => <div>{row.original.quantityOnHand}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Order Quantity",
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
