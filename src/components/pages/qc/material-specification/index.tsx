"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1MaterialSpecificationsQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import React, { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { useSelector } from "@/lib/redux/store";
import { useDebounce } from "@uidotdev/usehooks";
import { AuditModules, EMaterialKind } from "@/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropdownBtns from "@/shared/btns/drop-btn";
import AccessTabs from "@/shared/access";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();

  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const dispatch = useDispatch();
  const debounceValue = useDebounce(searchValue, 500);

  const searchParams = useSearchParams();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

  const pathname = usePathname();

  const [LoadData, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1MaterialSpecificationsQuery({});

  useEffect(() => {
    LoadData({
      page,
      pageSize,
      module: AuditModules.production.name,
      subModule: AuditModules.production.materialSpecification,
      materialKind: kind ?? EMaterialKind.Raw,
      searchQuery: debounceValue,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, page, pageSize, kind, triggerReload]);

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
  const handleCreateTabClick = (tabType: EMaterialKind) => {
    router.push(
      `${pathname}/create` +
        "?" +
        createQueryString("kind", tabType.toString()),
    );
  };

  const data = result?.data ?? [];

  return (
    <PageWrapper className="w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Material Specification" />
        {/* 
         
        */}
        <DropdownBtns
          icon="Plus"
          title="Create Specification"
          menus={[
            {
              name: "Raw",
              onClick: () => {
                handleCreateTabClick(EMaterialKind.Raw);
              },
            },
            {
              name: "Packing",
              onClick: () => {
                handleCreateTabClick(EMaterialKind.Packing);
              },
            },
          ]}
        />
      </div>
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

      <ServerDatatable
        data={data}
        onRowClick={(row) =>
          router.push(`/qc/material-specification/${row.id}/details`)
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
