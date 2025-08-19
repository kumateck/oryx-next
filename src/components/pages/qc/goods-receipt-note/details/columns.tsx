import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { Button, DropdownMenuItem, Icon } from "@/components/ui";
import {
  BatchStatus as BatchStatusEnum,
  CodeModelTypes,
  EMaterialKind,
  FormComplete,
  Units,
  WorkflowFormType,
  convertToLargestUnit,
  getEnumBadgeWithHexColors,
  getSmallestUnit,
} from "@/lib";
import {
  BatchStatus,
  MaterialBatchDto,
  useLazyGetApiV1ConfigurationByModelTypeCountQuery,
  useLazyGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery,
  usePutApiV1MaterialArdStartTestByMaterialBatchIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { CreateSampleMaterial } from "./create-sample";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import StatusBadge from "@/shared/status-badge";
import { generateARNumber, getArNumberPrefix } from "@/lib/batch-gen";
import { CreateSampleFormData } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export const getColumns = (): ColumnDef<MaterialBatchDto>[] => [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "-"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original?.material?.name ?? "-"}</div>,
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
    cell: ({ row }) => {
      const status = row.original.status as BatchStatus;
      const { label, style } = getEnumBadgeWithHexColors(
        BatchStatusEnum,
        status,
      );
      return <StatusBadge label={label} style={style} />;
    },
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
  const searchParams = useSearchParams();
  const kind = searchParams.get("type") as unknown as EMaterialKind; // Extracts 'type' from URL

  const router = useRouter();
  const [startTestMutation] =
    usePutApiV1MaterialArdStartTestByMaterialBatchIdMutation();
  const [checkSTPLinked] =
    useLazyGetApiV1MaterialArdMaterialBatchByMaterialBatchIdQuery();
  const [loadCountConfig] = useLazyGetApiV1ConfigurationByModelTypeCountQuery();
  const [openSample, setOpenSample] = useState(false);
  const [details, setDetails] = useState<CreateSampleFormData>(
    {} as CreateSampleFormData,
  );
  const totqty = row.original.totalQuantity || 0;
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

  const handlePickSample = async (payload: MaterialBatchDto) => {
    try {
      const dept = "QCD";
      const type = Number(kind) === EMaterialKind.Raw ? "RM" : "PM";
      const year = new Date().getFullYear();
      const prefix = getArNumberPrefix(dept, type, year);
      const countConfigResponse = await loadCountConfig({
        modelType: CodeModelTypes.ArNumberMaterial,
        prefix,
      }).unwrap();
      const serial = countConfigResponse + 1;
      const code = generateARNumber({ dept, type, year, serial });
      const data = {
        materialBatchId: payload.id as string,
        materialName: payload.material?.name as string,
        batchNumber: payload.batchNumber as string,
        arNumber: code,
        quantity: `${qty.value} ${qty.unit}`,
        sampleQuantity: "",
        baseUnit,
      };

      setDetails(data);
      setOpenSample(true);
    } catch (error) {
      console.log(error);
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
            onClick={() => handlePickSample(row.original)}
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
      {openSample && (
        <CreateSampleMaterial
          isOpen={openSample}
          details={details}
          onClose={() => setOpenSample(false)}
        />
      )}
    </section>
  );
}
