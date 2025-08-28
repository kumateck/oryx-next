"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, PermissionKeys } from "@/lib";
import {
  BatchTransferRequest,
  useGetApiV1ProductionScheduleStockTransferBatchByStockTransferIdQuery,
  useGetApiV1ProductionScheduleStockTransferByStockTransferIdQuery,
  usePutApiV1ProductionScheduleStockTransferIssueByStockTransferIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import { getColumns } from "./columns";
import { useUserPermissions } from "@/hooks/use-permission";
import NoAccess from "@/shared/no-access";

const GRNDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const stockTransferId = id as string;
  const { data: transferResponse } =
    useGetApiV1ProductionScheduleStockTransferBatchByStockTransferIdQuery({
      stockTransferId,
    });

  const { data: stockTransferResponse } =
    useGetApiV1ProductionScheduleStockTransferByStockTransferIdQuery({
      stockTransferId,
    });

  const [issueMutation, { isLoading }] =
    usePutApiV1ProductionScheduleStockTransferIssueByStockTransferIdMutation();

  const onIssue = async () => {
    try {
      await issueMutation({
        stockTransferId,
        body: transferResponse?.map((item) => ({
          batchId: item.batch?.id as string,
          quantity: item.quantityToTake as number,
        })) as BatchTransferRequest[],
      }).unwrap();

      toast.success("Batch issued successfully");
      router.push(`/warehouse/stock-transfer-requests`);
      // dispatch(commonActions.setTriggerReload());
    } catch (error) {
      console.error("Error loading GRN", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const { hasPermissionAccess } = useUserPermissions();
  if (
    !hasPermissionAccess(
      PermissionKeys.warehouse.viewRawMaterialTransferList,
    ) ||
    !hasPermissionAccess(
      PermissionKeys.warehouse.viewPackagingMaterialTransferList,
    )
  ) {
    return <NoAccess />;
  }
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1>Stock Transfer Details</h1>

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
        </div>
        <Card>
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">
                  {stockTransferResponse?.material?.code}
                </span>
                <div className="grid w-full grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Material
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {stockTransferResponse?.material?.name}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Request Department
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {stockTransferResponse?.toDepartment?.name}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Request Date
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {stockTransferResponse?.createdAt
                        ? format(
                            stockTransferResponse?.createdAt,
                            "MMM d, yyyy. h:mma",
                          )
                        : ""}
                    </span>
                  </div>{" "}
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Approval Date
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {stockTransferResponse?.approvedAt
                        ? format(
                            stockTransferResponse?.approvedAt,
                            "MMM d, yyyy. h:mma",
                          )
                        : ""}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Justification
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {/* {stockTransferResponse?.a} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="space-y-4 p-5">
          <CardTitle>Issue Breakdown</CardTitle>
          <ClientDatatable
            columns={getColumns()}
            data={transferResponse ?? []}
            normalTable
          />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default GRNDetail;
