"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Card, CardContent, Icon } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { useLazyGetApiV1ProductionScheduleByScheduleIdQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";

import Products from "./products";

const ScheduleDetail = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const router = useRouter();
  const { id } = useParams();
  const scheduleId = id as string;
  const [loadSchedule, { data, isLoading }] =
    useLazyGetApiV1ProductionScheduleByScheduleIdQuery();

  useEffect(() => {
    loadSchedule({
      scheduleId,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId, triggerReload]);

  const onBack = () => {
    router.back();
  };

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon name="ArrowLeft" onClick={onBack} className="cursor-pointer" />
          <PageTitle title="Production Schedule" />
        </div>
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
