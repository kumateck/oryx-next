import { ColumnDef } from "@tanstack/react-table";

import { MaterialDepartmentDto } from "@/lib/redux/api/openapi.generated";
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

export const columns: ColumnDef<MaterialDepartmentDto>[] = [
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

  // {
  //   id: "actions",
  //   meta: { omitRowClick: true },
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
