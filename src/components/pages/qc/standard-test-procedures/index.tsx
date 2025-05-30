"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { AuditModules, EMaterialKind } from "@/lib";
import { useGetApiV1MaterialStpsQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useCallback, useState } from "react";
import { columns } from "./columns";
import { Create } from "./create";
import AccessTabs from "@/shared/access";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ScrollablePageWrapper from "@/shared/page-wrapper";

function Page() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const searchValue = useSelector((state) => state.common.searchInput);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const kind = searchParams.get("kind") as unknown as EMaterialKind;

  const {
    data: result,
    isLoading,
    isFetching,
  } = useGetApiV1MaterialStpsQuery({
    page,
    pageSize,
    searchQuery: searchValue,
    module: AuditModules.settings.name,
    subModule: AuditModules.settings.standardTestProcedure,
    materialKind: kind || EMaterialKind.Raw,
  });

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
