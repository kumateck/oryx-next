"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { PermissionKeys, StockTransfer, TransferType } from "@/lib";
import {
  DepartmentStockTransferDtoRead,
  useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery,
  useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery, // useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery,
} from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import PageTitle from "@/shared/title";

import { getColumns } from "./columns";
import TransferTable from "./table";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type") as unknown as TransferType; // Extracts 'type' from URL
  const pathname = usePathname();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [
    loadInboundRequests,
    {
      isLoading: isLoadingInbound,
      data: responseInbound,
      isFetching: isFetchingInbound,
    },
  ] = useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery();
  const [
    loadOutboundRequests,
    {
      isLoading: isLoadingOutbound,
      data: responseOutbound,
      isFetching: isFetchingOutbound,
    },
  ] = useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery();

  useEffect(() => {
    const transferType = Number(type);

    if (transferType === TransferType.Incoming) {
      loadInboundRequests({
        page,
        pageSize,
        status: StockTransfer.Approved,
      });
    }

    if (transferType === TransferType.Outgoing) {
      loadOutboundRequests({
        page,
        pageSize,
        status: StockTransfer.Approved,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

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

  const handleTabClick = (tabType: TransferType) => {
    router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  };

  const onRowClick = (row: DepartmentStockTransferDtoRead) => {
    router.push(`/warehouse/stock-transfer-requests/${row.id}/details`);
  };

  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();

  if (
    !hasPermissionAccess(
      PermissionKeys.warehouse.issueRawMaterialStockTransfers,
    ) ||
    hasPermissionAccess(
      PermissionKeys.warehouse.issuePackagingMaterialStockTransfers,
    )
  ) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Stock Transfer Issues" />
        <AccessTabs
          handleTabClick={handleTabClick}
          containerClassName="w-60"
          type={type}
          tabs={[
            {
              label: TransferType[TransferType.Incoming],
              value: TransferType.Incoming.toString(),
            },
            {
              label: TransferType[TransferType.Outgoing],
              value: TransferType.Outgoing.toString(),
            },
          ]}
        />
      </div>

      {Number(type) === TransferType.Incoming ? (
        <TransferTable
          response={responseInbound}
          isLoading={isLoadingInbound || isFetchingInbound}
          columns={getColumns(type)}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPage={setPage}
          onRowClick={onRowClick}
        />
      ) : (
        <TransferTable
          response={responseOutbound}
          isLoading={isLoadingOutbound || isFetchingOutbound}
          columns={getColumns(type)}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPage={setPage}
        />
      )}
    </PageWrapper>
  );
};

export default Page;
