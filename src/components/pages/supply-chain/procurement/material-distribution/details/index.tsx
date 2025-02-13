"use client";

import { useParams } from "next/navigation";
import React from "react";

import { useGetApiV1ProductionScheduleByScheduleIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import Products from "./products";

const ScheduleDetail = () => {
  const { id } = useParams();
  const scheduleId = id as string;
  const { data } = useGetApiV1ProductionScheduleByScheduleIdQuery({
    scheduleId,
  });

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <p className="text-sm text-neutral-500">Hellmuth Carroux GMBH & Co.</p>
        <PageTitle title="SID-PO-1234" />

        {/* <DragLists /> */}
        {data?.products && data?.products?.length > 0 && (
          <Products scheduleId={scheduleId} products={data?.products ?? []} />
        )}
      </div>
    </ScrollablePageWrapper>
  );
};

export default ScheduleDetail;
