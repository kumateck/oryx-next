"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { PermissionKeys, TransferType, StockTransfer } from "@/lib";
import {
  useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery,
  useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import AccessTabs from "@/shared/access";
import PageTitle from "@/shared/title";

import { getColumns } from "./columns";
import TransferTable from "./table";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";

const Page = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as unknown as TransferType; // Extracts 'type' from URL

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
        status: StockTransfer.New,
        searchQuery: searchInput,
      });
    }

    if (transferType === TransferType.Outgoing) {
      loadOutboundRequests({
        page,
        pageSize,
        status: StockTransfer.Approved,
        searchQuery: searchInput,
      });
    }
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, type, searchInput, triggerReload]);

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

  const handleTabClick = (tabType: TransferType) => {
    router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  };
  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  const hasAccess = hasPermissionAccess(
    PermissionKeys.production.viewStockTransferRequests,
  );
  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Stock Transfer" />
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
