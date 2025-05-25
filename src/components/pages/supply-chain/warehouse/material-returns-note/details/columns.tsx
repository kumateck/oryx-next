import { ColumnDef, Row } from "@tanstack/react-table";

import { MaterialReturnNotePartialReturnDto } from "@/lib/redux/api/openapi.generated";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@/components/ui";
import { commonActions } from "@/lib/redux/slices/common";
import { DropdownMenuItem } from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";
import AssignLocationDialog from "./assign-location";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends MaterialReturnNotePartialReturnDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] =
    useState<MaterialReturnNotePartialReturnDto | null>(null);
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setSelectedBatch(row.original);
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
        selectedBatch={selectedBatch}
        kind={row.original?.material?.kind}
      />
    </section>
  );
}

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
