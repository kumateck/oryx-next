import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  ShipmentDocumentDto,
  usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

import AssignLocationDialog from "./assign-location";
import { MaterialRequestDto } from "./type";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>("");
  const [isArrivedOpen, setIsArrivedOpen] = useState(false);
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);
  const [arrivedMutation, { isLoading }] =
    usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation();

  const handleArrived = async () => {
    try {
      await arrivedMutation({
        shipmentDocumentId: id,
      }).unwrap();
      toast.success("Shipment Arrived successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <section className="flex items-center justify-end gap-2">
      {isLoading && (
        <Icon name="LoaderCircle" className="size-5 animate-spin" />
      )}
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setId(row.original.id as string);
              setIsAssignLocationOpen(true);
            }}
          >
            <Icon
              name="MapPin"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Assign Location</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      <AssignLocationDialog
        open={isAssignLocationOpen}
        onOpenChange={setIsAssignLocationOpen}
        onSuccess={() => dispatch(commonActions.setTriggerReload())}
      />
      <ConfirmDeleteDialog
        open={isArrivedOpen}
        onClose={() => setIsArrivedOpen(false)}
        onConfirm={handleArrived}
      />
    </section>
  );
}

export const getColumns = (): ColumnDef<MaterialRequestDto>[] => [
  {
    accessorKey: "code",
    header: "Batch Number",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => <div>{row.original.materialName?.split(" ")[0]}</div>,
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => <div>{row.original.materialId}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.finalQuantityNeeded}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <div>{row.original.finalQuantityOnHand}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Expiry Date",
    cell: ({ row }) => <div>{row.original.finalQuantityOnHand}</div>,
  },
  {
    accessorKey: "retestDate",
    header: "Retest Date",
    cell: ({ row }) => <div>{row.original.finalQuantityOnHand}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
