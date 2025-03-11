"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { StockTransfer, TransferType } from "@/lib";
import {
  useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery,
  useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery,
} from "@/lib/redux/api/openapi.generated";
import AccessTabs from "@/shared/access";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [
    loadInboundRequests,
    { isLoading: isLoadingInbound, data: responseInbound },
  ] = useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery();
  const [
    loadOutboundRequests,
    { isLoading: isLoadingOutbound, data: responseOutbound },
  ] = useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery();

  console.log(isLoadingOutbound, responseOutbound);
  useEffect(() => {
    loadInboundRequests({
      page,
      pageSize,
      status: StockTransfer.New,
    });
    loadOutboundRequests({
      page,
      pageSize,
      status: StockTransfer.New,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type") as unknown as TransferType; // Extracts 'type' from URL

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
              label: TransferType[TransferType.Inbound],
              value: TransferType.Inbound.toString(),
            },
            {
              label: TransferType[TransferType.Outbound],
              value: TransferType.Outbound.toString(),
            },
          ]}
        />
      </div>

      <ServerDatatable
        data={responseInbound?.data || []}
        columns={columns}
        isLoading={isLoadingInbound}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: responseInbound?.pageIndex as number,
          pageCount: responseInbound?.pageCount as number,
          totalRecordCount: responseInbound?.totalRecordCount as number,
          numberOfPagesToShow: responseInbound?.numberOfPagesToShow as number,
          startPageIndex: responseInbound?.startPageIndex as number,
          stopPageIndex: responseInbound?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default Page;
