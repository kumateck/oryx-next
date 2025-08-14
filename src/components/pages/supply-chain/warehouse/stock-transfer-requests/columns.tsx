import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  EMaterialKind,
  StockTransfer,
  TransferType,
  Units,
  convertToLargestUnit,
  getSmallestUnit,
} from "@/lib";
import { DepartmentStockTransferDtoRead } from "@/lib/redux/api/openapi.generated";

export const getColumns = (
  type: TransferType,
): ColumnDef<DepartmentStockTransferDtoRead>[] => [
  {
    accessorKey: "date",
    header: "Requested Date",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "kind",
    header: "Material Kind",
    cell: ({ row }) => (
      <div>{EMaterialKind[Number(row.original.material?.kind)]}</div>
    ),
  },
  {
    accessorKey: "department",
    header:
      Number(type) === TransferType.Incoming
        ? "Request Department"
        : "Supplier Department",
    cell: ({ row }) => (
      <div>
        {Number(type) === TransferType.Incoming
          ? row.original.toDepartment?.name
          : row.original.fromDepartment?.name}
      </div>
    ),
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => {
      const formattedQty = convertToLargestUnit(
        row.original?.quantity as number,
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      console.log(row.original, "original");
      return (
        <div>
          {formattedQty.value}
          {formattedQty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {
          StockTransfer[
            row.original.status as unknown as keyof typeof StockTransfer
          ]
        }
      </div>
    ),
  },
  // ...(Number(type) === TransferType.Incoming
  //   ? [
  //       {
  //         id: "actions",
  //         cell: ({ row }: { row: Row<DepartmentStockTransferDtoRead> }) => (
  //           <DataTableRowActions row={row} />
  //         ),
  //       },
  //     ]
  //   : []),
];

// export function DataTableRowActions<
//   TData extends DepartmentStockTransferDtoRead,
// >({ row }: { row: Row<TData> }) {
//   // const dispatch = useDispatch();
//   // // console.log(row.original);
//   // const [approveMutation, { isLoading: isLoadingApprove }] =
//   //   usePutApiV1ProductionScheduleStockTransferApproveByStockTransferIdMutation();
//   // const [rejectMutation, { isLoading: isLoadingReject }] =
//   //   usePutApiV1ProductionScheduleStockTransferRejectByStockTransferIdMutation();
//   // const [isApprovalOpen, setIsApprovalOpen] = useState(false);
//   // const [isRejectedOpen, setIsRejectedOpen] = useState(false);

//   // const handleApproval = async () => {
//   //   try {
//   //     await approveMutation({
//   //       stockTransferId: row.original.id as string,
//   //     }).unwrap();
//   //     toast.success("Transfer approved successfully");
//   //     dispatch(commonActions.setTriggerReload());
//   //   } catch (error) {
//   //     toast.error(isErrorResponse(error as ErrorResponse)?.description);
//   //   }
//   // };
//   // const handleRejection = async () => {
//   //   try {
//   //     await rejectMutation({
//   //       stockTransferId: row.original.id as string,
//   //     }).unwrap();
//   //     toast.success("Transfer rejected successfully");
//   //     dispatch(commonActions.setTriggerReload());
//   //   } catch (error) {
//   //     toast.error(isErrorResponse(error as ErrorResponse)?.description);
//   //   }
//   // };
//   // //permissions checks
//   // const permissions = useSelector(
//   //   (state) => state.persistedReducer?.auth?.permissions,
//   // ) as Section[];
//   return (
//     <section className="flex items-center justify-end gap-2">
//       {/* {findRecordWithAccess(
//         permissions,
//         PermissionKeys.production.approveOrRejectStockTransferRequest,
//       ) && (
//         <div className="flex items-center justify-end gap-2">
//           <Button
//             variant="success"
//             size="sm"
//             className="rounded-2xl"
//             onClick={() => setIsApprovalOpen(true)}
//           >
//             {isLoadingApprove ? (
//               <Icon name="LoaderCircle" className="size-4 animate-spin" />
//             ) : (
//               <Icon name="Check" className="size-4" />
//             )}
//             <span>Approve</span>
//           </Button>

//           <Button
//             variant="destructive"
//             size="sm"
//             className="rounded-2xl"
//             onClick={() => setIsRejectedOpen(true)}
//           >
//             {isLoadingReject ? (
//               <Icon name="LoaderCircle" className="size-4 animate-spin" />
//             ) : (
//               <Icon name="X" className="size-4" />
//             )}
//             <span>Reject</span>
//           </Button>
//         </div>
//       )} */}

//       {/* <ConfirmDialog
//         confirmText="Approve"
//         description="Are you sure you want to approve this transfer?"
//         open={isApprovalOpen}
//         onClose={() => setIsApprovalOpen(false)}
//         onConfirm={handleApproval}
//         icon="Check"
//       />
//       <ConfirmDeleteDialog
//         title="Reject Transfer Request"
//         confirmText="Reject"
//         open={isRejectedOpen}
//         onClose={() => setIsRejectedOpen(false)}
//         onConfirm={handleRejection}
//         description="Are you sure you want to reject this transfer?"
//       /> */}
//     </section>
//   );
// }
// // export const getColumns = (): ColumnDef<DepartmentStockTransferDtoRead>[] => [
// //   // {
// //   //   accessorKey: "code",
// //   //   header: "Transfer Code",
// //   //   cell: ({ row }) => <div className="min-w-36">{row.original.}</div>,
// //   // },
// //   {
// //     accessorKey: "date",
// //     header: "Requested Date",
// //     cell: ({ row }) => (
// //       <div>
// //         {row.original.createdAt
// //           ? format(row.original.createdAt, "MMM d, yyyy")
// //           : "-"}
// //       </div>
// //     ),
// //   },
// //   {
// //     accessorKey: "material",
// //     header: "Material",
// //     cell: ({ row }) => <div>{row.original.material?.name}</div>,
// //   },
// //   {
// //     accessorKey: "department",
// //     header: "Request Department",
// //     cell: ({ row }) => <div>{row.original.toDepartment?.name}</div>,
// //   },
// //   {
// //     accessorKey: "qty",
// //     header: "Quantity",
// //     cell: ({ row }) => {
// //       const qty = convertToLargestUnit(
// //         row.original?.quantity as number,
// //         row.original.uoM?.symbol as Units,
// //       );
// //       return (
// //         <div>
// //           {qty.value}
// //           {qty.unit}
// //         </div>
// //       );
// //     },
// //   },
// //   {
// //     accessorKey: "status",
// //     header: "Status",
// //     cell: ({ row }) => (
// //       <div>
// //         {
// //           StockTransfer[
// //             row.original.status as unknown as keyof typeof StockTransfer
// //           ]
// //         }
// //       </div>
// //     ),
// //   },
// //   // ...(Number(type) === TransferType.Incoming
// //   //   ? [
// //   //       {
// //   //         id: "actions",
// //   //         cell: ({ row }: { row: Row<DepartmentStockTransferDtoRead> }) => (
// //   //           <DataTableRowActions row={row} />
// //   //         ),
// //   //       },
// //   //     ]
// //   //   : []),
// // ];

// // export function DataTableRowActions<
// //   TData extends DepartmentStockTransferDtoRead,
// // >({ row }: { row: Row<TData> }) {
// //   const dispatch = useDispatch();
// //   console.log(row.original);
// //   const [approveMutation, { isLoading: isLoadingApprove }] =
// //     usePutApiV1ProductionScheduleStockTransferIssueByStockTransferIdMutation();

// //   const [isApprovalOpen, setIsApprovalOpen] = useState(false);

// //   const handleApproval = async () => {
// //     try {
// //       await approveMutation({
// //        stockTransferId: row.original.id as string,
// //        body
// //       }).unwrap();
// //       toast.success("Transfer approved successfully");
// //       dispatch(commonActions.setTriggerReload());
// //     } catch (error) {
// //       toast.error(isErrorResponse(error as ErrorResponse)?.description);
// //     }
// //   };

// //   return (
// //     <section className="flex items-center justify-end gap-2">
// //       <div className="flex items-center justify-end gap-2">
// //         <Button
// //           variant="success"
// //           size="sm"
// //           className="rounded-2xl"
// //           onClick={() => setIsApprovalOpen(true)}
// //         >
// //           {isLoadingApprove ? (
// //             <Icon name="LoaderCircle" className="size-4 animate-spin" />
// //           ) : (
// //             <Icon name="Check" className="size-4" />
// //           )}
// //           <span>Issue</span>
// //         </Button>
// //       </div>

// //       <ConfirmDialog
// //         confirmText="Issue"
// //         description="Are you sure you want to issue this transfer?"
// //         open={isApprovalOpen}
// //         onClose={() => setIsApprovalOpen(false)}
// //         onConfirm={handleApproval}
// //         icon="Check"
// //       />
// //     </section>
// //   );
// // }
