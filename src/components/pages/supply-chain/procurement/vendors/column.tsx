import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  ConfirmDeleteDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from "@/components/ui";
import {
  ErrorResponse,
  SupplierStatus,
  SupplierType,
  SupplierTypeOptions,
  isErrorResponse,
  routes,
} from "@/lib";
import {
  MaterialDto,
  SupplierDto,
  useDeleteApiV1ProcurementSupplierBySupplierIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends SupplierDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [deleteMutation] =
    useDeleteApiV1ProcurementSupplierBySupplierIdMutation();
  // const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <Link
            className="flex cursor-pointer items-center justify-start gap-2"
            href={routes.editVendor(row.original.id as string)}
          >
            <span className="text-black">
              <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
            </span>
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="group">
          <div
            onClick={() => {
              setDetails(row.original);
              setIsDeleteOpen(true);
            }}
            className="flex cursor-pointer items-center justify-start gap-2"
          >
            <span className="text-black">
              <Icon name="Trash2" className="h-5 w-5 text-danger-default" />
            </span>
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              supplierId: details.id as string,
            }).unwrap();
            toast.success("Vendor deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<SupplierDto>[] = [
  {
    accessorKey: "type",
    header: "Vendor Type",

    cell: ({ row }) => (
      <div>
        {row.original.type !== undefined
          ? SupplierType[row.original.type]
          : "Unknown"}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    cell: ({ row }) => <div>{row.getValue("contactPerson")}</div>,
  },
  {
    accessorKey: "contactNumber",
    header: "Telephone Number",
    cell: ({ row }) => <div>{row.getValue("contactNumber")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.original.country?.name}</div>,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => (
      <div>
        {row.original.currency && (
          <span>
            {" "}
            {row.original.currency?.name} ({row.original.currency?.symbol})
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${statusColors[row.original.status as SupplierStatus]}`}
            >
              {SupplierStatus[row.original.status as SupplierStatus]}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            className="rounded-2xl"
          >
            {SupplierTypeOptions?.map((opt, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    console.log(opt);
                    // triggerUpdateStatus(item?.id);
                  }}
                  className="group flex cursor-pointer items-center justify-start gap-2"
                >
                  <span>{opt.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const statusColors: Record<SupplierStatus, string> = {
  [SupplierStatus.New]: "bg-blue-100 text-blue-800",
  [SupplierStatus.Approved]: "bg-yellow-100 text-yellow-800",
  [SupplierStatus.UnApproved]: "bg-green-100 text-green-800",
};
