"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import { Icon } from "@/components/ui";
import { useGetApiV1MaterialByMaterialIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import MaterialDetails from "./material-details";

const ApprovedRawMaterialDetail = () => {
  const { id } = useParams();
  const materialId = id as string;
  const { data } = useGetApiV1MaterialByMaterialIdQuery({
    materialId,
  });
  const router = useRouter();

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
          <PageTitle title={"Approved Materials"} />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm">{data?.code}</p>
        <PageTitle title={data?.name as string} />
        {/* <DragLists /> */}
        {/* {data?.products && data?.products?.length > 0 && (
          <Products scheduleId={scheduleId} products={data?.products ?? []} />
        )} */}
        <MaterialDetails materialId={materialId} />
      </div>
    </ScrollablePageWrapper>
  );
};

export default ApprovedRawMaterialDetail;
