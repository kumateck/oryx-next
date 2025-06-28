"use client";
import {
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  useLazyGetApiV1WarehouseBincardinformationByProductIdProductQuery as fetchBincardData,
  useLazyGetApiV1ProductionScheduleFinishedGoodsTransferNoteByProductIdProductQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
// import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { bincardColumn, generalColumn } from "./columns";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { AuditModules } from "@/lib";

const tabs = [
  {
    id: "general-information",
    name: "General Information",
  },
  {
    id: "bincard-information",
    name: "Bincard Information",
  },
];

function Page() {
  const [pageSize, setPageSize] = useState(30);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id as string);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const router = useRouter();
  const finishedProductId = id as string;
  const [loadFinishedProductDetails, { data, isLoading, isFetching }] =
    useLazyGetApiV1ProductionScheduleFinishedGoodsTransferNoteByProductIdProductQuery(
      {},
    );

  const [
    loadBincardData,
    {
      data: bincardResult,
      isFetching: isBincardFetching,
      isLoading: isBincardLoading,
    },
  ] = fetchBincardData({});

  useEffect(() => {
    loadFinishedProductDetails({
      productId: finishedProductId,
    });
    loadBincardData({
      productId: finishedProductId,
      page,
      pageSize,
      searchQuery: "",
      module: AuditModules.warehouse.name,
      subModule: AuditModules.warehouse.approvedProducts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedProductId, activeTab, page, pageSize]);

  const generalData = data?.data || [];
  const bincardData = bincardResult?.data || [];
  console.log("Bincard Data:", bincardResult);
  console.log(
    "General Data:",
    data,
    "and this one should be worikng as far as I know it will work in my process",
  );
  return (
    <ScrollablePageWrapper className="flex flex-col">
      <div
        className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="size-4" />
        <span>Approved Product</span>
      </div>

      <Tabs defaultValue={activeTab} className="">
        <TabsList className="mb-4 gap-x-6 rounded-none border-b border-b-neutral-input bg-transparent p-0 py-0">
          {tabs.map((tab, idx) => (
            <TabsTrigger
              value={tab.id}
              key={idx}
              onClick={() => setActiveTab(tab?.id as string)}
              className="data-[state=active]:font-bold px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:text-primary-default data-[state=active]:shadow-none"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full">
          <TabsContent className="w-full" value="general-information">
            <ServerDatatable
              data={generalData}
              columns={generalColumn}
              setPage={setPage}
              setPageSize={setPageSize}
              isLoading={isLoading || isFetching}
              meta={{
                pageIndex: page,
                pageCount: 1,
                totalRecordCount: 1,
                numberOfPagesToShow: 1,
                startPageIndex: 1,
                stopPageIndex: 1,
                pageSize,
              }}
            />
          </TabsContent>
          <TabsContent value="bincard-information">
            <ServerDatatable
              data={bincardData}
              columns={bincardColumn}
              setPage={setPage}
              setPageSize={setPageSize}
              isLoading={isBincardFetching || isBincardLoading}
              meta={{
                pageIndex: 1,
                pageCount: 1,
                totalRecordCount: 1,
                numberOfPagesToShow: 1,
                startPageIndex: 1,
                stopPageIndex: 1,
                pageSize,
              }}
            />
          </TabsContent>
        </div>
      </Tabs>
    </ScrollablePageWrapper>
  );
}

export default Page;
