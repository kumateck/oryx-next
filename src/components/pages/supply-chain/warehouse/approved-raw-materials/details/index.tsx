"use client";

import { useParams } from "next/navigation";
import React from "react";

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

  return (
    <ScrollablePageWrapper>
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
