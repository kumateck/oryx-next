"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
} from "@/components/ui";
import { useGetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdQuery } from "@/lib/redux/api/openapi.generated";
// import { ListsTable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import { ListsTable } from "@/shared/datatable";
// import { columns } from "./columns";

function MaterialReturnsDetails() {
  const router = useRouter();
  const { id } = useParams();
  const materialReturnNoteId = id as string;
  const { data } =
    useGetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdQuery({
      materialReturnNoteId,
    });

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
          <PageTitle title={"Material Returns Note"} />
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader className="font-bold">{data?.product?.name}</CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 mt-1 text-sm">
            <div className="flex gap-2 items-center">
              <span>Return Department:</span>
              <span className="font-medium">
                {data?.createdBy?.department?.name}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Return Date:</span>
              <span className="font-medium">
                {data?.returnDate
                  ? format(data?.returnDate, "MMM dd, yyyy")
                  : "-"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Production Schedule:</span>
              <span className="font-medium">
                {data?.productionSchedule?.code}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          Material Return List
          <CardDescription>
            Enter Received quantity and assign material location before approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ListsTable data={data?.partialReturns || []} columns={columns} />
        </CardContent>
      </Card>
    </ScrollablePageWrapper>
  );
}

export default MaterialReturnsDetails;
