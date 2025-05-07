import { ColumnDef, Row } from "@tanstack/react-table";
import { subtract } from "lodash";

import { ColumnType } from "@/shared/datatable";

// import { Option } from "@/lib";
// import Edit from "./edit";
import { MaterialRequestDto } from "./type";
import { MaterialDepartmentWithWarehouseStockDto } from "@/lib/redux/api/openapi.generated";
import { TableCheckbox } from "@/shared/datatable/table-check";

import { useState } from "react";
import AllStockByMaterial from "@/shared/all-stock";
import { getLargestUnit, Units } from "@/lib";

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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends MaterialDepartmentWithWarehouseStockDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const leftOverStock =
    (row.original.material?.totalStock as number) -
    (row.original.warehouseStock as number);
  const rowData = row?.original;
  const AllStockRow = {
    materialId: rowData?.material?.id as string,
    materialName: rowData?.material?.name as string,
    qtyNeeded: rowData?.material?.totalStock,
    quantityOnHand: rowData?.warehouseStock,
    quantityRequested: "0",
    uom: "",
    uomId: "",
    finalQuantityNeeded: "0",
  };
  return (
    <section className="">
      {leftOverStock > 0 ? (
        <div
          className="cursor-pointer underline hover:text-primary-hover"
          onClick={() => setIsOpen(true)}
        >
          {leftOverStock}
        </div>
      ) : (
        <div>{leftOverStock}</div>
      )}

      {isOpen && (
        <AllStockByMaterial
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          materialId={AllStockRow.materialId}
          materialName={AllStockRow.materialName as string}
          qtyNeeded={AllStockRow.finalQuantityNeeded}
          uomName={AllStockRow.uom as Units}
        />
      )}
    </section>
  );
}

export const columns: ColumnDef<MaterialDepartmentWithWarehouseStockDto>[] = [
  TableCheckbox(),
  {
    accessorKey: "code",
    header: "Code",

    cell: ({ row }) => <div>{row.original.material?.code}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "uom",
    header: "UOM",

    cell: ({ row }) => (
      <div>{getLargestUnit(row.original.uoM?.symbol as Units)}</div>
    ),
  },
  {
    accessorKey: "reOrderLevel",
    header: "Re-Order Level",
    cell: ({ row }) => <div>{row.original.reOrderLevel}</div>,
  },
  {
    accessorKey: "minimumStockLevel",
    header: "Minimum Stock Level",
    cell: ({ row }) => <div>{row.original.minimumStockLevel}</div>,
  },
  {
    accessorKey: "maximumStockLevel",
    header: "Maximum Stock Level",
    cell: ({ row }) => <div>{row.original.maximumStockLevel}</div>,
  },
  {
    accessorKey: "warehouseStock",
    header: "Stock in my Warehouse",

    cell: ({ row }) => <div>{row.original.warehouseStock}</div>,
  },
  {
    id: "totalStock",
    header: "Stock in Other Sources",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

  // {
  //   accessorKey: "kind",
  //   header: "Kind",

  //   cell: ({ row }) => (
  //     <div>{Number(row.original.kind) === 1 ? "Package" : "Raw"}</div>
  //   ),
  // },
  // {
  //   accessorKey: "category",
  //   header: "Category",
  //   cell: ({ row }) => (
  //     <div>{row.original.material?.materialCategory?.name}</div>
  //   ),
  // },
];
