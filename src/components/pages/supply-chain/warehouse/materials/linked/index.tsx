"use client";
import PageWrapper from "@/components/layout/wrapper";
import { EMaterialKind, routes } from "@/lib";
import { useLazyGetApiV1MaterialDepartmentQuery } from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { columns } from "./column";
import { useSelector } from "@/lib/redux/store";

const Page = () => {
  const router = useRouter();
  const searchQuery = useSelector((state) => state.common.searchInput);

  const searchParams = useSearchParams();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

  const pathname = usePathname();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadMaterials, { isLoading, isFetching, data: rawMaterials }] =
    useLazyGetApiV1MaterialDepartmentQuery();
  const handleLoadMaterials = async (
    kind: EMaterialKind,
    page: number,
    pageSize: number,
    searchQuery?: string,
  ) => {
    await loadMaterials({
      page,
      pageSize,
      kind: kind || EMaterialKind.Raw,
      searchQuery,
    }).unwrap();
  };

  useEffect(() => {
    handleLoadMaterials(kind, page, pageSize, searchQuery);
    // if (triggerReload) {
    //   // dispatch(commonActions.unSetTriggerReload());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, page, pageSize, searchQuery]);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
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

  return (
    <PageWrapper className="w-full space-y-2">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Linked Materials (Stock Levels)" />
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
      </div>

      <ServerDatatable
        data={rawMaterials?.data ?? []}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        onRowClick={(row) => {
          router.push(routes.viewMaterial(row?.material?.id as string));
        }}
        meta={{
          pageIndex: rawMaterials?.pageIndex as number,
          pageCount: rawMaterials?.pageCount as number,
          totalRecordCount: rawMaterials?.totalRecordCount as number,
          numberOfPagesToShow: rawMaterials?.numberOfPagesToShow as number,
          startPageIndex: rawMaterials?.startPageIndex as number,
          stopPageIndex: rawMaterials?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default Page;
