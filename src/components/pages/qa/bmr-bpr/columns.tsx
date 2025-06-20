import { Button, DropdownMenuItem, Icon } from "@/components/ui";
import { AnalyticalTestStatus } from "@/lib";
import { AnalyticalTestRequestDto } from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

const batchStatusColors: Record<AnalyticalTestStatus, string> = {
  [AnalyticalTestStatus.Approved]: "bg-blue-100 text-blue-800",
  [AnalyticalTestStatus.Quarantine]: "bg-yellow-100 text-yellow-800",
  [AnalyticalTestStatus.Under_Test]: "bg-purple-100 text-purple-800",
  [AnalyticalTestStatus.Test_Completed]: "bg-green-100 text-green-800",
  [AnalyticalTestStatus.Rejected]: "bg-red-100 text-red-800",
};

export interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends AnalyticalTestRequestDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const [openSample, setOpenSample] = useState(false);
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem>
          <Button
            variant={
              row.original.status === AnalyticalTestStatus.Under_Test
                ? "default"
                : "ghost"
            }
            disabled={row.original.status !== AnalyticalTestStatus.Approved}
            className="flex w-full cursor-pointer items-center justify-start gap-2"
          >
            <Icon
              name="Target"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Start Test</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="flex cursor-pointer items-start justify-center gap-2"
          >
            <Icon
              name="CreativeCommons"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Sample Material</span>
          </Button>
        </DropdownMenuItem>
      </TableMenuAction>
    </section>
  );
}

export const columns: ColumnDef<AnalyticalTestRequestDto>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturingDate &&
          format(row.original.manufacturingDate, "MMM dd, yyy")}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.expiryDate &&
          format(row.original.expiryDate, "MMM dd, yyy")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`px-2 py-1 rounded-full text-center ${batchStatusColors[row.original.status as AnalyticalTestStatus]}`}
      >
        {AnalyticalTestStatus[row.original.status as number]
          .split("_")
          .join(" ")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
