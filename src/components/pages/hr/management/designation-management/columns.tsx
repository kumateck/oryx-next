import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  DesignationDto,
  useDeleteApiV1DesignationByIdMutation,
  useLazyGetApiV1DesignationQuery,
} from "@/lib/redux/api/openapi.generated";
import Edit from "./edit";
import { TableMenuAction } from "@/shared/table-menu";
import { DetailsDialog } from "./detailsDailog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends DesignationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1DesignationByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<DesignationDto>({} as DesignationDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();

  //permisions checks
  // const { hasPermissionAccess } = useUserPermissions();

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem>
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setOpenDetailsDialog(true);
            }}
          >
            <Icon
              name="Eye"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>View Details</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setIsOpen(true);
            }}
          >
            <Icon
              name="Pencil"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setIsDeleteOpen(true);
            }}
          >
            <Icon
              name="Trash2"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>
      {/* {hasPermissionAccess(PermissionKeys.humanResources.editDesignation) && (
        <Icon
          name="Pencil"
          className="h-5 w-5 cursor-pointer text-neutral-500"
          onClick={() => {
            setDetails(row.original);
            setIsOpen(true);
          }}
        />
      )}
      {hasPermissionAccess(PermissionKeys.humanResources.deleteDesignation) && (
        <Icon
          name="Trash2"
          className="text-danger-500 h-5 w-5 cursor-pointer"
          onClick={() => {
            setDetails(row.original);
            setIsDeleteOpen(true);
          }}
        />
      )} */}

      {details.name && isOpen && (
        <Edit
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <DetailsDialog
        open={openDetailsDialog}
        setOpen={() => setOpenDetailsDialog(false)}
        designation={row.original}
      />
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              id: details.id as string,
            }).unwrap();
            toast.success("Designation deleted successfully");
            loadDesignations({ page: 1, pageSize: 10 });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<DesignationDto>[] = [
  {
    accessorKey: "name",
    header: "Designation Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "associatedDepartment",
    header: "Associated Department",
    cell: ({ row }) => (
      // <div>{row.original.departments?.map((d) => d.name)}</div>
      <div>{row.original.departments?.map((d) => d.name).join(", ")}</div>
    ),
  },
  {
    accessorKey: "maximumLeaveDays",
    header: "Maximum Leave Days",
    cell: ({ row }) => <div>{row.original.maximumLeaveDays}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>
        <TheAduseiEditorViewer content={row.original.description as string} />
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
