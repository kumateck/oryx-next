"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { RequisitionStatus, RequisitionType } from "@/lib";
import { useGetApiV1RequisitionByRequisitionIdQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const requisitionStatusColors: { [key in RequisitionStatus]: string } = {
  [RequisitionStatus.New]: "bg-gray-500",
  [RequisitionStatus.Pending]: "bg-blue-500",
  [RequisitionStatus.Sourced]: "bg-yellow-500",
  [RequisitionStatus.Completed]: "bg-green-500",
  [RequisitionStatus.Rejected]: "bg-red-500",
};

const RequisitionDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const requisitionId = id as string;
  const { data } = useGetApiV1RequisitionByRequisitionIdQuery({
    requisitionId,
  });

  const isPurchase = data?.requisitionType === RequisitionType.Purchase;

  return (
    <ScrollablePageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Requisitions"} />
        </div>
      </div>
      <div className="space-y-3">
        <h1>{isPurchase ? "Purchase Requisition" : "Stock Requisition"}</h1>
        <Card>
          <CardContent className="space-y-4 py-2">
            <div
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                data?.status !== undefined
                  ? requisitionStatusColors[data.status]
                  : "bg-gray-500"
              }`}
            >
              {data?.status !== undefined ? RequisitionStatus[data.status] : ""}
            </div>
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">{data?.code}</span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Product Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.product?.name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Requisition Date:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      {data?.createdAt
                        ? format(new Date(data.createdAt), "MMMM dd, yyyy")
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="space-y-4 p-5">
          <CardTitle>
            {isPurchase
              ? "Purchase Requisition Items"
              : "Stock Requisition Items"}
          </CardTitle>
          <ClientDatatable columns={columns} data={data?.items ?? []} />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default RequisitionDetails;
