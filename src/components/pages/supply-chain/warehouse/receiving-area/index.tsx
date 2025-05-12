"use client";

import { RowSelectionState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Checkbox, Icon } from "@/components/ui";
import { EMaterialKind, PermissionKeys, Section } from "@/lib";
import {
  DistributedRequisitionMaterialDto,
  useLazyGetApiV1WarehouseDistributedRequisitionMaterialsQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { findRecordWithFullAccess, getMatchingIds } from "@/lib/utils";
import AccessTabs from "@/shared/access";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import CreateGRN from "./create-grn";
import NoAccess from "@/shared/no-access";

const ReceivingArea = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kind = searchParams.get("kind") as unknown as EMaterialKind; // Extracts 'type' from URL

  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1WarehouseDistributedRequisitionMaterialsQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [isGRNOpen, setIsGRNOpen] = useState(false);

  useEffect(() => {
    loadData({
      page,
      pageSize,
      kind: kind ?? EMaterialKind.Raw,
    });
    if (triggerReload) {
      setRowSelection({});
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, page, pageSize, triggerReload]);

  const data = (result?.data || []).map(
    (item: DistributedRequisitionMaterialDto) => ({
      ...item,
      // id: item.id || "",
    }),
  );
  const selectedIds = getMatchingIds(data, rowSelection);

  const selectedData = data.filter((item: DistributedRequisitionMaterialDto) =>
    selectedIds.includes(item.id as string),
  );

  const isCreateGRNDisabled =
    selectedData.length === 0 ||
    selectedData.some((row: Record<string, any>) => row.status === 0);

  const pathname = usePathname();

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
  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access

  const hasAccessToPacking = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.viewReceivedPackagingMaterialsItems,
  );

  const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.viewReceivedRawMaterialsItems,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  if (isClient && !hasAccessToPacking && kind?.toString() === "1") {
    //redirect to no access
    return <NoAccess />;
  }
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Received Materials" />
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
            {findRecordWithFullAccess(
              permissions,
              PermissionKeys.warehouse.createGrnForRawMaterialsChecklistedItems,
            ) && (
              <Button
                type="button"
                variant={"ghost"}
                className="bg-neutral-dark text-white"
                size={"sm"}
                onClick={() => setIsGRNOpen(true)}
                disabled={isCreateGRNDisabled}
              >
                <Icon name="Plus" className="h-4 w-4" /> <span>Create GRN</span>
              </Button>
            )}
            {findRecordWithFullAccess(
              permissions,
              PermissionKeys.warehouse
                .createGrnForPackagingMaterialsChecklistedItems,
            ) && (
              <Button
                type="button"
                variant={"ghost"}
                className="bg-neutral-dark text-white"
                size={"sm"}
                onClick={() => setIsGRNOpen(true)}
                disabled={isCreateGRNDisabled}
              >
                <Icon name="Plus" className="h-4 w-4" /> <span>Create GRN</span>
              </Button>
            )}
          </div>
        )}
        {isGRNOpen && (
          <CreateGRN
            onGRNClose={() => setIsGRNOpen(false)}
            isGRNOpen={isGRNOpen}
            selectedIds={selectedIds}
            data={data}
          />
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
          pageIndex: result?.pageIndex ?? 0,
          pageCount: result?.pageCount ?? 1,
          totalRecordCount: result?.totalRecordCount ?? 0,
          numberOfPagesToShow: result?.numberOfPagesToShow ?? 5,
          startPageIndex: result?.startPageIndex ?? 0,
          stopPageIndex: result?.stopPageIndex ?? 1,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default ReceivingArea;
