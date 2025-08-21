import { ColumnDef, Row } from "@tanstack/react-table";

import { MaterialReturnNotePartialReturnDto } from "@/lib/redux/api/openapi.generated";
import { useDispatch } from "@/lib/redux/store";
import { useState } from "react";
import { Button, Icon } from "@/components/ui";
import AssignLocationDialog from "./assign-location";
import { commonActions } from "@/lib/redux/slices/common";
import { useParams } from "next/navigation";
import { getEnumBadgeWithHexColors, MaterialReturnsStatus } from "@/lib";
import StatusBadge from "@/shared/status-badge";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  status: MaterialReturnsStatus;
}

export function DataTableRowActions<
  TData extends MaterialReturnNotePartialReturnDto,
>({ row, status }: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const materialReturnNoteId = id as string;
  const [selectedBatch, setSelectedBatch] =
    useState<MaterialReturnNotePartialReturnDto | null>(null);
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);

  return (
    <section className="">
      {status === MaterialReturnsStatus.Pending && (
        <Button
          className="flex cursor-pointer items-center justify-center gap-2"
          onClick={() => {
            setSelectedBatch(row.original);
            setIsAssignLocationOpen(true);
          }}
        >
          <Icon name="MapPin" className="size-5 cursor-pointer " />
          <span>Assign Location</span>
        </Button>
      )}

      <AssignLocationDialog
        open={isAssignLocationOpen}
        onOpenChange={setIsAssignLocationOpen}
        onSuccess={() => dispatch(commonActions.setTriggerReload())}
        selectedBatch={selectedBatch}
        materialReturnNoteId={materialReturnNoteId}
        kind={row.original?.material?.kind}
      />
    </section>
  );
}

export const columns = (
  status: MaterialReturnsStatus,
): ColumnDef<MaterialReturnNotePartialReturnDto>[] => [
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
  {
    accessorKey: "status",
    header: "Status",
    cell: () => {
      const { label, style } = getEnumBadgeWithHexColors(
        MaterialReturnsStatus,
        status,
      );
      return <StatusBadge label={label} style={style} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions status={status} row={row} />,
  },
];
