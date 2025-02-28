"use client";

import { format } from "date-fns";
import { useParams } from "next/navigation";
import React from "react";

import { Card, CardContent } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { useGetApiV1ProductionScheduleByScheduleIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";

import Products from "./products";

const ScheduleDetail = () => {
  const { id } = useParams();
  const scheduleId = id as string;
  const { data, isLoading } = useGetApiV1ProductionScheduleByScheduleIdQuery({
    scheduleId,
  });

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <PageTitle title="Production Schedule" />
        {isLoading ? (
          <SkeletonLoadingPage />
        ) : (
          <Card>
            <CardContent className="space-y-4 py-2">
              <div className="flex justify-start gap-4">
                <div className="w-full space-y-2">
                  <span className="font-Medium text-primary-500 block text-3xl">
                    {data?.code}
                  </span>
                  <div className="grid w-full grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Schedule Start Date
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.scheduledStartTime
                          ? format(data?.scheduledStartTime, "MMM dd, yyyy")
                          : "-"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        End Start Date
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.scheduledEndTime
                          ? format(data?.scheduledEndTime, "MMM dd, yyyy")
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-1 text-neutral-dark">
                  <span className="block text-sm font-normal text-neutral-secondary">
                    Remarks
                  </span>
                  <TheAduseiEditorViewer content={data?.remarks ?? ""} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* <DragLists /> */}
        {data?.products && data?.products?.length > 0 ? (
          <Products scheduleId={scheduleId} products={data?.products ?? []} />
        ) : (
          <SkeletonLoadingPage />
        )}
      </div>
    </ScrollablePageWrapper>
  );
};

export default ScheduleDetail;
