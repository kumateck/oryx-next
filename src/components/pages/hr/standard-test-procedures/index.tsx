"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon, Input } from "@/components/ui";
import { AuditModules, EMaterialKind } from "@/lib";
import { useLazyGetApiV1MaterialStpsQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import { Create } from "./create";
import AccessTabs from "@/shared/access";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useDebounce } from "@uidotdev/usehooks";

function Page() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchTerm = useDebounce(searchInput, 300);

  const dispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [loadStandardTest, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1MaterialStpsQuery();
  const triggerReload = useSelector((state) => state.common.triggerReload);

  // searchParams with a provided key/value pair
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL
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
    loadStandardTest({
      page,
      pageSize,
      searchQuery: debouncedSearchTerm,
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.standardTestProcedure,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, kind, debouncedSearchTerm, searchParams, pageSize, triggerReload]);

  const data = result?.data || [];
  return (
    <PageWrapper>
      {isOpen && <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <PageTitle title="Standard Test Procedure" />
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
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline">
              <Icon name="Filter" />
              <span>Filter</span>
            </Button>
            <Input
              suffix="Search"
              prefixClass="text-neutral-default"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
            />
          </div>
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
