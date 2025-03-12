"use client";

import { format } from "date-fns";
import { useParams } from "next/navigation";
import React from "react";

import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import {
  useGetApiV1ProductionScheduleStockTransferBatchByStockTransferIdQuery,
  useGetApiV1ProductionScheduleStockTransferByStockTransferIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import { getColumns } from "./columns";

const GRNDetail = () => {
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

  console.log(transferResponse, "transferResponse");

  // useEffect(() => {
  //   if (grnResponse) {
  //     const batchOptions = grnResponse.materialBatches?.map((item) => {
  //       const batchNumber = item?.batchNumber as string;

  //       const materialName = item?.checklist?.material?.name as string;

  //       const manufacturerName = item?.checklist?.manufacturer?.name as string;

  //       // const invoiceNumber = parseFloat(qtyNeeded.toString()).toFixed(2);
  //       const invoiceNumber = item?.checklist?.shipmentInvoice?.code as string;

  //       const totalQuantity = item?.totalQuantity as number;

  //       const expiryDate = item.expiryDate;

  //       const manufacturingDate = item.dateReceived;

  //       const retestDate = item.dateReceived;

  //       const status = item.status;

  //       return {
  //         batchNumber,
  //         materialName,
  //         manufacturerName,
  //         invoiceNumber,
  //         totalQuantity,
  //         expiryDate,
  //         manufacturingDate,
  //         retestDate,
  //         status,
  //       };
  //     }) as GrnDto[];
  //     setPackageLists(batchOptions);
  //   }
  // }, [grnResponse]);
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1>Stock Transfer Details</h1>
          <Button
            variant={"default"}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500"
          >
            <Icon name="CircleCheck" className="h-4 w-4" />
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
