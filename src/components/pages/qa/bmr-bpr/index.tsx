"use client";

import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1QaAnalyticalTestsQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loadData, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1QaAnalyticalTestsQuery({});

  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  useEffect(() => {
    loadData({ page, pageSize, searchQuery: searchValue });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchValue]);
  const tableData = result?.data || [];
  return (
    <PageWrapper>
      <PageTitle title="Analytical Test Requests" />
      <div className="mt-4" />
      <ServerDatatable
        columns={columns}
        data={tableData}
        setPage={setPage}
        isLoading={isLoading || isFetching}
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
      {/* <CreateSampleFormResolver /> */}
    </PageWrapper>
  );
}

export default Page;
