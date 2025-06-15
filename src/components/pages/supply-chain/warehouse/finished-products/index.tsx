"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1WarehouseFinishedGoodsDetailsQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [loadFisnishedProducts, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1WarehouseFinishedGoodsDetailsQuery();
  const dispatch = useDispatch();

  const router = useRouter();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);

  useEffect(() => {
    loadFisnishedProducts({
      page,
      pageSize,
      searchQuery: searchValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchValue, triggerReload]);
  const data = result?.data || [];
  console.log(data);
  return (
    <PageWrapper>
      <PageTitle title="Finished Products" />
      <ServerDatatable
        data={data}
        onRowClick={(row) => {
          router.push(`/supply-chain/warehouse/finished-products/${row.id}`);
        }}
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
