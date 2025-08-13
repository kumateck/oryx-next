import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { Button, DropdownMenuItem, Icon } from "@/components/ui";
import {
  BatchStatus as BatchStatusEnum,
  FormComplete,
  Units,
  WorkflowFormType,
  convertToLargestUnit,
  getSmallestUnit,
  splitWords,
} from "@/lib";
import {
  BatchStatus,
  MaterialBatchDto,
  useLazyGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery,
  usePutApiV1MaterialArdStartTestByMaterialBatchIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { CreateSampleMaterial } from "./create-sample";
import { useParams, useRouter } from "next/navigation";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
const batchStatusColors: Record<BatchStatus, string> = {
  [BatchStatusEnum.Received]: "bg-blue-100 text-blue-800",
  [BatchStatusEnum.Quarantine]: "bg-yellow-100 text-yellow-800",
  [BatchStatusEnum.Testing]: "bg-purple-100 text-purple-800",
  [BatchStatusEnum.Available]: "bg-green-100 text-green-800",
  [BatchStatusEnum.Rejected]: "bg-red-100 text-red-800",
  [BatchStatusEnum.Retest]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Frozen]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Consumed]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Approved]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.TestTaken]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Checked]: "bg-orange-100 text-orange-800",
};

export const getColumns = (): ColumnDef<MaterialBatchDto>[] => [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "-"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => (
      <div>{row.original.checklist?.material?.name ?? "-"}</div>
    ),
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => (
      <div>{row.original.checklist?.manufacturer?.name ?? "-"}</div>
    ),
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div>{row.original.checklist?.shipmentInvoice?.code ?? "-"}</div>
    ),
  },
  {
    accessorKey: "totalQuantity",
    header: "Quantity",
    cell: ({ row }) => {
      const totqty = row.original.totalQuantity ?? 0;
      const qty = convertToLargestUnit(
        totqty,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div>
          {qty.value}
          {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturingDate
          ? format(row.original?.manufacturingDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.expiryDate
          ? format(row.original?.expiryDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "retestDate",
    header: "Retest Date",
    cell: ({ row }) => (
      <div>
        {row.original.retestDate
          ? format(row.original?.retestDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[String(row.original?.status)]}`}
      >
        {splitWords(BatchStatusEnum[row.original.status as BatchStatus])}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export function DataTableRowActions<TData extends MaterialBatchDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { id } = useParams();
  const grnId = id as string;
  const router = useRouter();
  const [startTestMutation] =
    usePutApiV1MaterialArdStartTestByMaterialBatchIdMutation();
  const [checkSTPLinked] =
    useLazyGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery();
  const [openSample, setOpenSample] = useState(false);
  const totqty = row.original.totalQuantity ?? 0;
  const baseUnit = getSmallestUnit(row.original.uoM?.symbol as Units);
  const qty = convertToLargestUnit(totqty, baseUnit);
  const handleStartTest = async () => {
    const materialBatchId = row.original.id as string;
    try {
      await checkSTPLinked({
        materialBatchId,
      }).unwrap();
      await startTestMutation({
        materialBatchId,
      }).unwrap();
      toast.success("Test started successfully");
      router.push(
        `/complete/${WorkflowFormType.Material}/${row.original.id}/${FormComplete.Batch}`,
      );
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  const handleViewTestResponse = () => {
    router.push(`/qc/goods-receipt-note/${grnId}/${row.original.id}`);
  };
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem>
          <Button
            onClick={() => handleStartTest()}
            variant={
              row.original.status === BatchStatusEnum.Testing
                ? "default"
                : "ghost"
            }
            disabled={row.original.status !== BatchStatusEnum.Testing}
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
            onClick={() => handleViewTestResponse()}
            variant={
              row.original.status === BatchStatusEnum.TestTaken
                ? "default"
                : "ghost"
            }
            disabled={row.original.status !== BatchStatusEnum.TestTaken}
            className="flex w-full cursor-pointer items-center justify-start gap-2"
          >
            <Icon
              name="Target"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Check Test Result</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="flex cursor-pointer items-start justify-center gap-2"
            onClick={() => setOpenSample(true)}
            disabled={row.original.status !== BatchStatusEnum.Quarantine}
          >
            <Icon
              name="CreativeCommons"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Sample Material</span>
          </Button>
        </DropdownMenuItem>
      </TableMenuAction>
      <CreateSampleMaterial
        isOpen={openSample}
        details={{
          materialBatchId: row.original.id as string,
          materialName: row.original.material?.name ?? "",
          batchNumber: row.original.batchNumber ?? "",
          arNumber: row.original?.code ?? "",
          quantity: `${qty.value} ${qty.unit}`,
          sampleQuantity: "",
          baseUnit,
        }}
        onClose={() => setOpenSample(false)}
      />
    </section>
  );
}
