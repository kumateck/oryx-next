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
import { Button, Icon } from "@/components/ui";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";

function Page() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loadAlerts, { data, isLoading, isFetching }] =
    useLazyGetApiV1AlertQuery();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();

  useEffect(() => {
    loadAlerts({
      page: page,
      pageSize: pageSize,
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.alerts,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadAlerts, page, pageSize, triggerReload]);

  return (
    <PageWrapper className="w-full">
      {open && <CreateAlert open={open} onClose={() => setOpen(false)} />}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col mr-auto">
          <PageTitle title="Alerts & Notifications " />
          <span className="text-sm">
            Create, edit and delete alerts & notifications
          </span>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Icon name="Plus" />
          Create Alert
        </Button>
      </div>
      <ScrollablePageWrapper className="space-y-2 mt-3 ">
        {isFetching || isLoading ? (
          <LoadingSkeleton />
        ) : Array.isArray(data?.data) && data.data.length > 0 ? (
          data.data.map((alert) => <AlertItem key={alert.id} alert={alert} />)
        ) : (
          <div className="text-center w-full py-6">No data found</div>
        )}
        <div className="pt-6">
          <AlertPagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            pageIndex={data?.pageIndex ?? 0}
            pageCount={data?.pageCount ?? 0}
            totalRecordCount={data?.totalRecordCount ?? 0}
            numberOfPagesToShow={data?.numberOfPagesToShow ?? 0}
            startPageIndex={data?.startPageIndex ?? 0}
            stopPageIndex={data?.stopPageIndex ?? 0}
          />
        </div>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}
export default Page;
