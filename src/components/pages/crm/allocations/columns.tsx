"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import {
  AllocateProductionOrderDtoRead,
  usePutApiV1ProductionScheduleAllocateProductsDeliverByAllocatedProductIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { sanitizeNumber } from "@/lib";

import { useState } from "react";
import { TableMenuAction } from "@/shared/table-menu";
import CreateProFormalInvoice from "./proforma-invoice";
import { Button, DropdownMenuItem, Icon } from "@/components/ui";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends AllocateProductionOrderDtoRead,
>({ row }: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<AllocateProductionOrderDtoRead>(
    {} as AllocateProductionOrderDtoRead,
  );
  const dispatch = useDispatch();
  const [deliverItem, { isLoading }] =
    usePutApiV1ProductionScheduleAllocateProductsDeliverByAllocatedProductIdMutation();
  const handleDeliverItem = async (allocatedProductId: string) => {
    try {
      await deliverItem({
        allocatedProductId,
      }).unwrap();
      toast.success("Order delivered successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <section>
      {isLoading && details.id === row.original.id && (
        <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
      )}
      <TableMenuAction>
        {row.original.deliveredAt === null && (
          <DropdownMenuItem className="group">
            <Button
              variant="ghost"
              className="w-full gap-1 text-center items-center justify-center"
              onClick={() => {
                setDetails(row.original);
                handleDeliverItem(row.original.id as string);
              }}
            >
              <span>Marked as Delivered</span>
            </Button>
          </DropdownMenuItem>
        )}
        {/* <DropdownMenuItem className="group">
          <Button
            variant="ghost"
            className="w-full gap-1 text-center items-center justify-center"
            onClick={() => {
              setDetails(row.original);
              setIsOpen(true);
            }}
          >
            <span>Create Proforma Invoice</span>
          </Button>
        </DropdownMenuItem> */}
      </TableMenuAction>

      {isOpen && (
        <CreateProFormalInvoice
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          data={details}
        />
      )}
    </section>
  );
}

export const columns: ColumnDef<AllocateProductionOrderDtoRead>[] = [
  {
    accessorKey: "productOrderCode",
    header: "Product Order Code",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.productionOrder?.code ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.productionOrder?.customer?.name ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original?.createdAt
          ? format(new Date(row.original.createdAt), "dd MMMM, yyyy")
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "numberOfOrders",
    header: "Number of Orders",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.products?.length ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "totalValue",
    header: "Total Allocated Quantity",
    cell: ({ row }) => {
      const total = row.original.products?.reduce((total, item) => {
        const itemSum = item.fulfilledQuantities?.reduce(
          (sum, fq) => sum + (fq.quantity || 0),
          0,
        );
        return total + sanitizeNumber(itemSum);
      }, 0);
      return <div className="min-w-36">{total ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "deliveredAt",
    header: "Delivered At",
    cell: ({ row }) => (
      <div className=" px-2 py-1 text-center text-xs ">
        {row.original.deliveredAt
          ? format(new Date(row.original.deliveredAt), "dd MMMM, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
