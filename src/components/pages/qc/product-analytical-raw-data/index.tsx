"use client";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import { useLazyGetApiV1ProductArdQuery } from "@/lib/redux/api/openapi.generated";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { ServerDatatable } from "@/shared/datatable";
import { columns } from "./columns";
import { Create } from "./create";
import ScrollablePageWrapper from "@/shared/page-wrapper";

// usePostApiV1MaterialArdMutation
function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const [loadAnalyticalRawData, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1ProductArdQuery();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.common.searchInput);

  useEffect(() => {
    loadAnalyticalRawData({
      page: page,
      pageSize: pageSize,
      searchQuery: searchValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchValue, triggerReload]);

  const data = result?.data || [];
  return (
    <PageWrapper>
      {isOpen && <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <div className="flex w-full justify-between items-center">
        <PageTitle title="Analytical Raw Data - Product" />
        <Button onClick={() => setIsOpen(true)} className="flex items-center">
          <Icon name="Plus" />
          <span>Add Product ARD</span>
        </Button>
      </div>
      <ScrollablePageWrapper>
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
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;
