"use client";

import { RowSelectionState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Checkbox } from "@/components/ui";
import { EMaterialKind, PermissionKeys } from "@/lib";
import { useLazyGetApiV1MaterialRejectsQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import AccessTabs from "@/shared/access";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useDebounce } from "@uidotdev/usehooks";

const ReceivingArea = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);
  const debouncedValue = useDebounce(searchValue, 500);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1MaterialRejectsQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData({
      page,
      pageSize,
      searchQuery: debouncedValue,
    });
    if (triggerReload) {
      setRowSelection({});
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, page, pageSize, debouncedValue, triggerReload]);

  const data = result || [];

  const pathname = usePathname();
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
  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  if (
    !hasPermissionAccess(
      PermissionKeys.warehouse.viewReceivedRawMaterialsItems,
    ) ||
    !hasPermissionAccess(
      PermissionKeys.warehouse.viewReceivedPackagingMaterialsItems,
    )
  ) {
    return <NoAccess />;
  }
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Rejected Materials" />
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
        {Object.keys(rowSelection).length > 0 && (
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={Object.keys(rowSelection).length > 0}
                onChange={() => setRowSelection({})}
              />
              <div>{Object.keys(rowSelection).length} Items</div>
            </div>
          </div>
        )}
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPageSize={setPageSize}
        setPage={setPage}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        meta={{
          pageIndex: 1,
          pageCount: 1,
          totalRecordCount: 1,
          numberOfPagesToShow: 1,
          startPageIndex: 1,
          stopPageIndex: 1,
          pageSize: 1,
        }}
      />
    </PageWrapper>
  );
};

export default ReceivingArea;
