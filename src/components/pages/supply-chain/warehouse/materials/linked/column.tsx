import { ColumnDef } from "@tanstack/react-table";

import { MaterialDepartmentWithWarehouseStockDto } from "@/lib/redux/api/openapi.generated";
import { convertToLargestUnit, getSmallestUnit, Units } from "@/lib";
// import { TableMenuAction } from "@/shared/table-menu";

// import Edit from "./edit";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }
// export function DataTableRowActions<TData extends MaterialDto>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   const [deleteMutation] = useDeleteApiV1MaterialByMaterialIdMutation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [loadMaterials] = useLazyGetApiV1MaterialQuery();
//   return (
//     <div className="flex items-center justify-end gap-2">
//       <TableMenuAction>
//         <DropdownMenuItem className="group">
//           <div
//             className="flex cursor-pointer items-center justify-start gap-2"
//             onClick={() => {
//               setDetails(row.original);
//               setIsOpen(true);
//             }}
//           >
//             <Icon
//               name="Pencil"
//               className="h-5 w-5 cursor-pointer text-neutral-500"
//             />
//             <span>Edit</span>
//           </div>
//         </DropdownMenuItem>
//         <DropdownMenuItem className="group">
//           <div
//             className="flex cursor-pointer items-center justify-start gap-2"
//             onClick={() => {
//               setDetails(row.original);
//               setIsDeleteOpen(true);
//             }}
//           >
//             <Icon
//               name="Trash2"
//               className="text-danger-500 h-5 w-5 cursor-pointer"
//             />
//             <span>Delete</span>
//           </div>
//         </DropdownMenuItem>
//       </TableMenuAction>

//       {details.id && isOpen && (
//         <Edit
//           details={details}
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//         />
//       )}
//       <ConfirmDeleteDialog
//         open={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         onConfirm={async () => {
//           try {
//             await deleteMutation({
//               materialId: details.id as string,
//             }).unwrap();
//             toast.success("Material deleted successfully");
//             loadMaterials({
//               pageSize: 30,
//             });
//           } catch (error) {
//             toast.error(isErrorResponse(error as ErrorResponse)?.description);
//           }
//         }}
//       />
//     </div>
//   );
// }

export const columns: ColumnDef<MaterialDepartmentWithWarehouseStockDto>[] = [
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
    header: "Base UoM",
    cell: ({ row }) => <div>{row.original.uoM?.symbol}</div>,
  },
  {
    accessorKey: "reOrderLevel",
    header: "Re-Order Level",

    cell: ({ row }) => {
      const formattedStock = convertToLargestUnit(
        Number(row.original.reOrderLevel),
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {formattedStock.value > 0 ? (
            <div>
              {formattedStock.value} {formattedStock.unit}
            </div>
          ) : (
            <div>0</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "minimumStockLevel",
    header: "Minimum Stock Level",

    cell: ({ row }) => {
      const formattedStock = convertToLargestUnit(
        Number(row.original.minimumStockLevel),
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {formattedStock.value > 0 ? (
            <div>
              {formattedStock.value} {formattedStock.unit}
            </div>
          ) : (
            <div>0</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "maximumStockLevel",
    header: "Maximum Stock Level",

    cell: ({ row }) => {
      const formattedStock = convertToLargestUnit(
        Number(row.original.maximumStockLevel),
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {formattedStock.value > 0 ? (
            <div>
              {formattedStock.value} {formattedStock.unit}
            </div>
          ) : (
            <div>0</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "warehouseStock",
    header: "Stock in my Warehouse",

    cell: ({ row }) => {
      const formattedStock = convertToLargestUnit(
        Number(row.original.warehouseStock),
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {formattedStock.value > 0 ? (
            <div>
              {formattedStock.value} {formattedStock.unit}
            </div>
          ) : (
            <div>0</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalStock",
    header: "Stock in Other Sources",

    cell: ({ row }) => {
      const leftOverStock =
        (row.original.material?.totalStock as number) -
        (row.original.warehouseStock as number);
      const formattedStock = convertToLargestUnit(
        Number(leftOverStock),
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {formattedStock.value > 0 ? (
            <div>
              {formattedStock.value} {formattedStock.unit}
            </div>
          ) : (
            <div>0</div>
          )}
        </div>
      );
    },
  },
];
