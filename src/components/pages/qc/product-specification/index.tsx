"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1ProductSpecificationsQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { useSelector } from "@/lib/redux/store";
import { useDebounce } from "@uidotdev/usehooks";
import { AuditModules } from "@/lib";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { Button, Icon } from "@/components/ui";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const router = useRouter();

  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();
  const debounceValue = useDebounce(searchValue, 500);

  const [LoadData, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProductSpecificationsQuery({});

  useEffect(() => {
    LoadData({
      page,
      pageSize,
      module: AuditModules.production.name,
      subModule: AuditModules.production.productSpecification,
      searchQuery: debounceValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, page, pageSize, triggerReload]);

  const data = result?.data ?? [];
  console.log(data);
  return (
    <PageWrapper className="w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Product Specification" />
        <Button onClick={() => router.push("/qc/product-specification/create")}>
          <Icon name="Plus" />
          <span>Create Product Specification</span>
        </Button>
      </div>

      <ServerDatatable
        data={data}
        onRowClick={(row) =>
          router.push(`/qc/product-specification/${row.id}/details`)
        }
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
