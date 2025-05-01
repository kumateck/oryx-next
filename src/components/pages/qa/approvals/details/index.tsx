"use client";
import { Button, Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { ApprovalDocument, ApprovalStatus, splitWords } from "@/lib";
import { useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery } from "@/lib/redux/api/openapi.generated";

import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import POApproval from "./po";

const statusColors: Record<ApprovalStatus, string> = {
  [ApprovalStatus.Pending]: "bg-gray-500 text-white",
  [ApprovalStatus.Approved]: "bg-green-500 text-white",
  [ApprovalStatus.Rejected]: "bg-red-500 text-white",
};

const DetailPage = () => {
  const { type, id } = useParams();
  const router = useRouter();
  const { data } = useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery({
    purchaseOrderId: id as string,
  });
  return (
    <ScrollablePageWrapper className="space-y-5">
      <div className="flex items-center justify-between">
        <div
          className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          <div className="group-hover:underline">
            <PageTitle title={"Leave Request List"} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"success"}>Approve</Button>
          <Button variant={"destructive"}>Reject</Button>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="font-semibold">Purchase Order Approval</h2>
      </div>

      <Card>
        <CardHeader>
          <div>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                data?.status !== undefined && data?.status !== null
                  ? statusColors[data.status as ApprovalStatus]
                  : "bg-gray-500 text-white"
              }`}
            >
              {data?.status !== undefined && data?.status !== null
                ? splitWords(ApprovalStatus[data.status as ApprovalStatus])
                : "Pending"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <span className="font-semibold">Approval Details</span>

          <div className="flex items-center justify-between mt-1 text-sm">
            <div className="flex gap-2 items-center">
              <span>Approval Name:</span>
              <span className="font-medium">Approval Name</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Requested By:</span>
              <span className="font-medium">Requested By</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Request Date:</span>
              <span className="font-medium">Request Date</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {(() => {
        switch (type) {
          case ApprovalDocument.PurchaseOrder:
            return <POApproval id={id as string} />;

          default:
            return null;
        }
      })()}

      <Card>
        <CardHeader>Approval Log</CardHeader>
        <CardContent>
          <span className="">Activity Log</span>
        </CardContent>
      </Card>
    </ScrollablePageWrapper>
  );
};

export default DetailPage;
