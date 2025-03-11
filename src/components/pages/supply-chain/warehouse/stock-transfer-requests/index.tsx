"use client";

import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { StockTransfer } from "@/lib";
import {
  useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery, // useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery,
} from "@/lib/redux/api/openapi.generated";
// import AccessTabs from "@/shared/access";
import PageTitle from "@/shared/title";

import { getColumns } from "./columns";
import TransferTable from "./table";

const Page = () => {
  // const router = useRouter();

  // const searchParams = useSearchParams();
  // const type = searchParams.get("type") as unknown as TransferType; // Extracts 'type' from URL

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
  // const [
  //   loadOutboundRequests,
  //   {
  //     isLoading: isLoadingOutbound,
  //     data: responseOutbound,
  //     isFetching: isFetchingOutbound,
  //   },
  // ] = useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery();

  useEffect(() => {
    // const transferType = Number(type);

    // if (transferType === TransferType.Inbound) {
    loadInboundRequests({
      page,
      pageSize,
      status: StockTransfer.Approved,
    });
    // }

    // if (transferType === TransferType.Outbound) {
    //   loadOutboundRequests({
    //     page,
    //     pageSize,
    //     // status: StockTransfer.Approved,
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams],
  // );

  // const handleTabClick = (tabType: TransferType) => {
  //   router.push(pathname + "?" + createQueryString("type", tabType.toString()));
  // };

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Stock Transfer Issues" />
        {/* <AccessTabs
          handleTabClick={handleTabClick}
          containerClassName="w-60"
          type={type}
          tabs={[
            {
              label: TransferType[TransferType.Inbound],
              value: TransferType.Inbound.toString(),
            },
            // {
            //   label: TransferType[TransferType.Outbound],
            //   value: TransferType.Outbound.toString(),
            // },
          ]}
        /> */}
      </div>

      <TransferTable
        response={responseInbound}
        isLoading={isLoadingInbound || isFetchingInbound}
        columns={getColumns()}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
      />
    </PageWrapper>
  );
};

export default Page;
