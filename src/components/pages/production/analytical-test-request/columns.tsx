import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  AnalyticalTestRequestDto,
  usePutApiV1QaAnalyticalTestsStatusByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { ConfirmDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  AnalyticalTestRequestStatus,
  FormComplete,
  fullname,
  WorkflowFormType,
} from "@/lib";
import TableBadge from "@/shared/datatable/badge";
import { useState } from "react";
import { TakeSample } from "./forms/sample/create";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends AnalyticalTestRequestDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isStartTestModalOpen, setIsStartTestModalOpen] = useState(false);
  const [isAckModalOpen, setIsAckModalOpen] = useState(false);

  const [details, setDetails] = useState<AnalyticalTestRequestDto | null>(null);

  const [updateMutation, { isLoading }] =
    usePutApiV1QaAnalyticalTestsStatusByIdMutation();

  const handleUpdate = async (
    id: string,
    status: AnalyticalTestRequestStatus,
  ) => {
    try {
      // Run both async functions in parallel
      await updateMutation({
        id,
        updateAnalyticalTestRequest: {
          status,
        },
      }).unwrap(),
        toast.success("ATR Updated successfully");
      dispatch(commonActions.setTriggerReload());
      setDetails(null);
      setIsStartTestModalOpen(false);
      if (status === AnalyticalTestRequestStatus.Testing) {
        router.push(
          `/complete/${WorkflowFormType.Product}/${row.original.id}/${FormComplete.Batch}`,
        );
      }
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  return (
    <section className="flex items-center justify-end gap-2">
      {row.original.id === details?.id && isLoading && (
        <Icon name="LoaderCircle" className="animate-spin" />
      )}
      <TableMenuAction>
        {row.original.status === AnalyticalTestRequestStatus.New && (
          <DropdownMenuItem
            className="group"
            onClick={() => setIsSampleModalOpen(true)}
          >
            Pick Sample
          </DropdownMenuItem>
        )}
        {row.original.status === AnalyticalTestRequestStatus.Sampled && (
          <DropdownMenuItem
            className="group"
            onClick={() => {
              setDetails(row.original);
              setIsAckModalOpen(true);
            }}
          >
            Acknowlegde
          </DropdownMenuItem>
        )}
        {row.original.status === AnalyticalTestRequestStatus.Acknowledged && (
          <DropdownMenuItem
            className="group"
            onClick={() => {
              setDetails(row.original);
              setIsStartTestModalOpen(true);
            }}
          >
            Start Test
          </DropdownMenuItem>
        )}
      </TableMenuAction>
      {isSampleModalOpen && (
        <TakeSample
          isOpen={isSampleModalOpen}
          onClose={() => setIsSampleModalOpen(false)}
          id={row.original.id as string}
        />
      )}
      {isStartTestModalOpen && (
        <ConfirmDialog
          open={isStartTestModalOpen}
          onClose={() => setIsStartTestModalOpen(false)}
          icon="Info"
          title="Start Test"
          confirmText="Update"
          description={`Are you sure you want to start the test ?`}
          onConfirm={() => {
            handleUpdate(
              details?.id as string,
              AnalyticalTestRequestStatus.Testing,
            );
          }}
        />
      )}
      {isAckModalOpen && (
        <ConfirmDialog
          open={isAckModalOpen}
          onClose={() => setIsAckModalOpen(false)}
          icon="Info"
          title="Receive Sample"
          confirmText="Accept"
          description={`Are you sure you want to Receive the Sample ?`}
          onConfirm={() => {
            handleUpdate(
              details?.id as string,
              AnalyticalTestRequestStatus.Acknowledged,
            );
          }}
        />
      )}
    </section>
  );
}
export const columns: ColumnDef<AnalyticalTestRequestDto>[] = [
  {
    accessorKey: "code",
    header: "Schedule Code",
    cell: ({ row }) => {
      const code = row.original.productionSchedule?.code;
      const order = row.original.productionActivityStep?.order;

      return (
        <div className="min-w-36">
          {code}
          {order !== undefined && order !== null && <>: Step: {order}</>}
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="">{row.original.product?.name}</div>,
  },
  {
    accessorKey: "batch",
    header: "Batch #",
    cell: ({ row }) => (
      <div>{row.original.batchManufacturingRecord?.batchNumber}</div>
    ),
  },
  {
    accessorKey: "preparedOn",
    header: "Prepared On",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "preparedBy",
    header: "Prepared By",
    cell: ({ row }) => (
      <div>
        {fullname(
          row.original.createdBy?.firstName as string,
          row.original.createdBy?.lastName as string,
        )}
      </div>
    ),
  },
  {
    accessorKey: "live",
    header: "Product Livespan",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturingDate
          ? format(row.original?.manufacturingDate, "MMM dd, yyyy")
          : "-"}{" "}
        {"-"}{" "}
        {row.original.expiryDate
          ? format(row.original?.expiryDate, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <TableBadge
          className="rounded-full px-3 py-1 text-sm font-medium capitalize"
          status={Number(row.original?.status) as AnalyticalTestRequestStatus}
          statusEnum={AnalyticalTestRequestStatus}
        />
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
