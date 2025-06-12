"use client";
import PageTitle from "@/shared/title";
import { AlertItem } from "./alertItem";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useEffect, useState } from "react";
import { CreateAlert } from "./create";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1AlertQuery } from "@/lib/redux/api/openapi.generated";
import { LoadingSkeleton } from "./loadingSkeleton";
import { AuditModules } from "@/lib";
import { AlertPagination } from "./alertPagination";
import { AlertResponse } from "./types";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loadAlerts, { data, isLoading, isFetching }] =
    useLazyGetApiV1AlertQuery();

  useEffect(() => {
    loadAlerts({
      page: page,
      pageSize: pageSize,
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.alerts,
    });
  }, [loadAlerts, page, pageSize]);
  const { data: alerts = [], ...alertPagination } =
    (data as { value: AlertResponse })?.value || {};
  return (
    <PageWrapper className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col mr-auto">
          <PageTitle title="Alerts & Notifications " />
          <span className="text-sm">
            Create, edit and delete alerts & notifications
          </span>
        </div>
        <CreateAlert />
      </div>
      <ScrollablePageWrapper className="space-y-2 mt-3 ">
        {isFetching || isLoading ? (
          <LoadingSkeleton />
        ) : alerts?.length > 0 ? (
          alerts?.map((alert) => <AlertItem key={alert.id} alert={alert} />)
        ) : (
          <div className="text-center w-full py-6">No data found</div>
        )}
        <div className="pt-6">
          <AlertPagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            {...alertPagination}
          />
        </div>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}
export default Page;
