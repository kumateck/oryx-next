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
                  Stock Transfer Details
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Request Department:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {stockTransferResponse?.fromDepartment?.name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Requisition Date:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {stockTransferResponse?.createdAt
                        ? format(
                            stockTransferResponse?.createdAt,
                            "yyyy d MMM, h:mm:ss a",
                          )
                        : "-"}
                    </span>
                  </div>{" "}
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Approved Date:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {stockTransferResponse?.approvedAt
                        ? format(
                            stockTransferResponse?.approvedAt,
                            "yyyy d MMM, h:mm:ss a",
                          )
                        : "-"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Justification:{" "}
                    </span>
                    <span className="inline text-sm font-normal text-neutral-dark">
                      {/* {stockTransferResponse?.} */}
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
          />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default GRNDetail;
