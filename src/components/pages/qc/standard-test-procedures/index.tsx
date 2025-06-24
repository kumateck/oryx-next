"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { AuditModules, EMaterialKind } from "@/lib";
import { useLazyGetApiV1MaterialStpsQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { Create } from "./create";
import AccessTabs from "@/shared/access";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

function Page() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const kind = searchParams.get("kind") as unknown as EMaterialKind;

  const [LoadData, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1MaterialStpsQuery();

  // Extracts 'type' from URL
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const handleTabClick = (tabType: EMaterialKind) => {
    router.push(pathname + "?" + createQueryString("kind", tabType.toString()));
  };

  useEffect(() => {
    LoadData({
      page,
      pageSize,
      searchQuery: searchValue,
      materialKind: kind || EMaterialKind.Raw,
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.standardTestProcedure,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, kind, searchValue, searchParams, pageSize, triggerReload]);

  const data = result?.data || [];
  return (
    <PageWrapper>
      {isOpen && (
        <Create kind={kind} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      <PageTitle title="Standard Test Procedure - Material" />
      <div className="flex w-full justify-between items-center">
        <AccessTabs
          handleTabClick={handleTabClick}
          type={kind}
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
        <div className="w-fit flex items-center justify-center gap-4">
          <Button onClick={() => setIsOpen(true)}>
            <Icon name="Plus" />
            <span>Add Standard Test</span>
          </Button>
        </div>
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
