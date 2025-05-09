import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { Button, Icon } from "@/components/ui";
import { convertToLargestUnit, getSmallestUnit, Units } from "@/lib";
import {
  BatchToSupply,
  BatchTransferRequest,
  ProductionExtraPackingWithBatchesDto,
  usePostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdMutation,
} from "@/lib/redux/api/openapi.generated";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends ProductionExtraPackingWithBatchesDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const [issueMutation, { isLoading }] =
    usePostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdMutation();

  const dispatch = useDispatch();
  const onIssue = async () => {
    try {
      const body = row.original.batches?.map((item) => {
        return {
          batchId: item?.batch?.id as string,
          quantity: item?.quantityToTake as number,
        };
      }) as BatchTransferRequest[];
      await issueMutation({
        productionExtraPackingId: row.original.id as string,
        body,
      }).unwrap();

      toast.success("Extra Packing issued successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      console.error("Error loading STOCK", error);
      ThrowErrorMessage(error);
    }
  };
  return (
    <section className="flex items-center justify-end gap-2">
      <Button
        onClick={onIssue}
        variant={"default"}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-500"
      >
        {isLoading ? (
          <Icon name="LoaderCircle" className="animate-spin" />
        ) : (
          <Icon name="CircleCheck" className="size-4" />
        )}
        <span>Issue</span>{" "}
      </Button>
    </section>
  );
}

export const columns: ColumnDef<ProductionExtraPackingWithBatchesDto>[] = [
  {
    accessorKey: "createdAt",
    header: "Requested Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "requestedBy",
    header: "Requested By",
    cell: ({ row }) => (
      <div className="">{row.original.createdBy?.firstName}</div>
    ),
  },
  {
    accessorKey: "psId",
    header: "Schedule Code",
    cell: ({ row }) => (
      <div className="">{row.original.productionSchedule?.code}</div>
    ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="">{row.original.product?.name}</div>,
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div className="">{row.original.material?.name}</div>,
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: ({ row }) => <div className="">{row.original.uoM?.symbol}</div>,
  },
  // {
  //   accessorKey: "qty",
  //   header: "Quantity",
  //   cell: ({ row }) => <div className="">{row.original.quantity}</div>,
  // },
  {
    accessorKey: "issuedQty",
    header: "Total Issued Qty",

    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.quantity as number,
        getSmallestUnit(row.original?.uoM?.symbol as Units),
      );
      return <div>{`${qty.value} ${qty.unit}`}</div>;
    },
  },
  {
    accessorKey: "batchbreakdown",
    header: "Batchwise Breakdown",
    cell: ({ row }) => (
      <div>
        <ul className="flex flex-wrap gap-2">
          {row.original.batches?.map((batch: BatchToSupply, idx: number) => {
            const qty = convertToLargestUnit(
              batch?.quantityToTake as number,
              getSmallestUnit(row.original?.uoM?.symbol as Units),
            );
            return (
              <li
                className="inline-block rounded-2xl border px-2 py-1 text-sm"
                key={idx}
              >
                <div className="flex gap-2">
                  <div className="text-primary-default">
                    {batch.batch?.batchNumber || "No Batch"}
                  </div>
                  <div className="font-semibold">
                    ( {`${qty.value} ${qty.unit}`})
                  </div>
                </div>
                <div className="text-xs text-danger-default">
                  {batch.batch?.expiryDate
                    ? format(
                        new Date(batch?.batch?.expiryDate ?? ""),
                        "MMM d, yyyy",
                      )
                    : "N/A"}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

  // {
  //   accessorKey: "comment",
  //   header: "Justification for Request",
  //   cell: ({ row }) => <div>{row.original.comments}</div>,
  // },
  // {
  //   accessorKey: "total",
  //   header: "Total Requested",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.items?.reduce((accumulator, item) => {
  //         return accumulator + (item.quantity || 0);
  //       }, 0)}
  //     </div>
  //   ),
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
