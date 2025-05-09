"use client";
import { Button, Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { ApprovalDocument, splitWords } from "@/lib";
import { useGetApiV1ApprovalByModelTypeAndModelIdQuery } from "@/lib/redux/api/openapi.generated";

import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import POApproval from "./po";
import ActivityLog from "./activity-log";
import { format } from "date-fns";
import LeaveDetails from "./leave-request";
import Comments from "./comments";
import PurchaseRequisition from "./purchase-requisition";

// const statusColors: Record<ApprovalStatus, string> = {
//   [ApprovalStatus.Pending]: "bg-gray-500 text-white",
//   [ApprovalStatus.Approved]: "bg-green-500 text-white",
//   [ApprovalStatus.Rejected]: "bg-red-500 text-white",
// };

const DetailPage = () => {
  const { type, id } = useParams();
  const router = useRouter();
  const { data } = useGetApiV1ApprovalByModelTypeAndModelIdQuery({
    modelId: id as string,
    modelType: type as string,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  return (
    <ScrollablePageWrapper className="space-y-5">
      {isOpen && (
        <Comments
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          id={id as string}
          type={type as string}
          action={actionType}
        />
      )}
      <div className="flex items-center justify-between">
        <div
          className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          <div className="group-hover:underline">
            <PageTitle title={"Approval List"} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="success"
            onClick={() => {
              setActionType("approve");
              setIsOpen(true);
            }}
          >
            <Icon name="Plus" className="h-4 w-4 text-secondary-500" />
            Approve
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setActionType("reject");
              setIsOpen(true);
            }}
          >
            <Icon name="X" className="h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="font-semibold">
          {splitWords(data?.modelType as string)}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <div>
            {/* <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                data?.status !== undefined && data?.status !== null
                  ? statusColors[data.status as ApprovalStatus]
                  : "bg-gray-500 text-white"
              }`}
            >
              {data?.status !== undefined && data?.status !== null
                ? splitWords(ApprovalStatus[data.status as ApprovalStatus])
                : "Pending"}
            </span> */}
          </div>
        </CardHeader>
        <CardContent>
          <span className="font-semibold">Approval Details</span>

          <div className="flex items-center justify-between mt-1 text-sm">
            <div className="flex gap-2 items-center">
              <span>Approval Name:</span>
              <span className="font-medium">
                {splitWords(data?.modelType as string)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Requested By:</span>
              <span className="font-medium">{data?.requestedBy?.name}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Request Date:</span>
              <span className="font-medium">
                {data?.createdAt ? format(data.createdAt, "MMM dd, yyyy") : "-"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {(() => {
        switch (type) {
          case ApprovalDocument.PurchaseOrder:
            return <POApproval id={id as string} />;
          case ApprovalDocument.LeaveRequest:
            return <LeaveDetails id={id as string} />;
          case ApprovalDocument.PurchaseRequisition:
            return <PurchaseRequisition id={id as string} />;

          default:
            return null;
        }
      })()}

      <ActivityLog approvalLogs={data?.approvalLogs} />
      {/* <ActivityLog approvalLogs={mockApprovalLogs} /> */}
    </ScrollablePageWrapper>
  );
};

export default DetailPage;
