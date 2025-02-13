"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button, Checkbox, Icon } from "@/components/ui";
import { Option, ProductionStatus, Units, convertUnits, routes } from "@/lib";
import { ProductionScheduleDto } from "@/lib/redux/api/openapi.generated";
import MultiSelectListViewer from "@/shared/multi-select-lists";

import { SelectedRowsContext } from ".";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowCheck<TData extends ProductionScheduleDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { selectedRows, toggleRow } = useContext(SelectedRowsContext);
  const id = row.original.id as string;

  return (
    <Checkbox
      checked={selectedRows.includes(id)}
      onCheckedChange={() => toggleRow(id)}
    />
  );
}

export function DataTableRowActions<TData extends ProductionScheduleDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="default"
          size={"sm"}
          onClick={() =>
            router.push(routes.createChecklist(row.original.id as string))
          }
        >
          <Icon name="Plus" className="h-4 w-4" /> <span>Create Checklist</span>
        </Button>
      </div>
    </section>
  );
}

export const columns: ColumnDef<ProductionScheduleDto>[] = [
  {
    id: "check",
    cell: ({ row }) => <DataTableRowCheck row={row} />,
  },
  {
    accessorKey: "code",
    header: "Material Name",
    cell: ({ row }) => <div className="min-w-36">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "product",
    header: "Manufacturer Name",
    cell: ({ row }) => (
      <div className="">
        <MultiSelectListViewer
          className="max-w-[120ch]"
          lists={
            row.original.products?.map((p) => {
              const productName = p.product?.name as string;
              const qty = convertUnits(
                p.quantity ?? 0,
                p.product?.baseUoM?.symbol as string,
                Units.L,
              );
              const label = `${productName} (${qty}${Units.L})`;
              return {
                label,
              };
            }) as Option[]
          }
        />
      </div>
    ),
  },
  {
    accessorKey: "scheduledStartTime",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div>
        {row.original.scheduledStartTime
          ? format(new Date(row.original.scheduledStartTime), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "scheduledEndTime",
    header: "Order Quantity",
    cell: ({ row }) => (
      <div>
        {row.original.scheduledEndTime
          ? format(new Date(row.original.scheduledEndTime), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "remarks",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row?.original?.status !== undefined
          ? ProductionStatus[row.original.status as ProductionStatus]
          : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
