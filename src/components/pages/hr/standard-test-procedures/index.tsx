"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { AuditModules } from "@/lib";
import { useLazyGetApiV1StandardTestProceduresQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import { Create } from "./create";

function Page() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const dispatch = useDispatch();
  const [loadStandardTest, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1StandardTestProceduresQuery();
  const triggerReload = useSelector((state) => state.common.triggerReload);

  useEffect(() => {
    loadStandardTest({
      page,
      pageSize,
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.standardTestProcedure,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);
  const data = result?.data || [];
  return (
    <PageWrapper>
      {isOpen && <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <div className="flex w-full justify-between items-center py-2">
        <PageTitle title="Standard Test Procedure" />
        <div className="w-fit flex items-center justify-center gap-4">
          <Button onClick={() => setIsOpen(true)}>
            <Icon name="Plus" />
            <span>Add Standard Test</span>
          </Button>
        </div>
      </div>
      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: result?.pageIndex as number,
          pageCount: result?.pageCount as number,
          totalRecordCount: result?.totalRecordCount as number,
          numberOfPagesToShow: result?.numberOfPagesToShow as number,
          startPageIndex: result?.startPageIndex as number,
          stopPageIndex: result?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
}

export default Page;
