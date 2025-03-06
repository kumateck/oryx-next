import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { Button, Icon } from "@/components/ui";
import { Units, convertToLargestUnit } from "@/lib";
import { MaterialDistributionSection } from "@/lib/redux/api/openapi.generated";

import Breakdown from "./distribute";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MaterialDistributionSection>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDistributionSection | null>(
    null,
  );
  return (
    <div>
      <Button
        className="flex items-center gap-2"
        onClick={() => {
          setDetails(row.original);
          setIsOpen(true);
        }}
      >
        <Icon name="Eye" className="h-4 w-4" />
        <span>View Breakdown</span>
      </Button>
      {isOpen && (
        <Breakdown
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<MaterialDistributionSection>[] = [
  {
    accessorKey: "code",
    header: "Material Code",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.material?.code}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Material Name",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.material?.name}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity to be Distributed",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.totalQuantity as number,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div>
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
