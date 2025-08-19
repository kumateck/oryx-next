"use client";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { useLazyGetApiV1ProductionScheduleFinishedGoodsTransferNoteQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const dispatch = useDispatch();

  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1ProductionScheduleFinishedGoodsTransferNoteQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
      searchQuery: searchValue,
      onlyApproved: false,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchValue]);

  const data = result?.data || [];
  return (
    <PageWrapper>
      <div className=" py-2">
        <PageTitle title="Finished Goods Transfer Notes" />
      </div>
      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        // onRowClick={(row) => {
        //   router.push(`/warehouse/finished-goods-transfer-notes/${row?.id}`);
        // }}
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
