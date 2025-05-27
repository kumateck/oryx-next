"use client";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { EMaterialKind } from "@/lib";
import AccessTabs from "@/shared/access";
import PageTitle from "@/shared/title";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLazyGetApiV1MaterialArdQuery } from "@/lib/redux/api/openapi.generated";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { ServerDatatable } from "@/shared/datatable";
import { columns } from "./columns";
import { Create } from "./create";
import ScrollablePageWrapper from "@/shared/page-wrapper";

// usePostApiV1MaterialArdMutation
function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const pathname = usePathname();
  const type = searchParams.get("type") as unknown as EMaterialKind;

  const [loadAnalyticalRawData, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1MaterialArdQuery();

  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.common.searchInput);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    loadAnalyticalRawData({
      page: 1,
      pageSize: 30,
      searchQuery: searchValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, page, pageSize, type, searchValue, triggerReload]);

  const handleTabClick = (tabType: EMaterialKind) => {
    router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  };

  const data = result?.data || [];
  return (
    <PageWrapper>
      {isOpen && <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <PageTitle title="Analytical Raw Data" />
      <div className="flex w-full justify-between items-center">
        <AccessTabs
          handleTabClick={handleTabClick}
          containerClassName="w-60"
          type={type}
          tabs={[
            {
              label: EMaterialKind[EMaterialKind.Raw],
              value: EMaterialKind.Raw.toString(),
            },
            {
              label: EMaterialKind[EMaterialKind.Packing],
              value: EMaterialKind.Packing.toString(),
            },
          ]}
        />
        <Button onClick={() => setIsOpen(true)} className="flex items-center">
          <Icon name="Plus" />
          <span>Add ARD</span>
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
