"use client";
import {
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1WarehouseBincardinformationByProductIdProductQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { bincardColumn, generalColumn } from "./columns";
import ScrollablePageWrapper from "@/shared/page-wrapper";

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
    useLazyGetApiV1ProductByProductIdQuery({});

  const [
    loadBincardData,
    {
      data: bincardResult,
      isFetching: isBincardFetching,
      isLoading: isBincardLoading,
    },
  ] = useLazyGetApiV1WarehouseBincardinformationByProductIdProductQuery({});
  useEffect(() => {
    loadFinishedProductDetails({
      productId: finishedProductId,
    });
    loadBincardData({
      productId: finishedProductId,
      page,
      pageSize,
      searchQuery: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedProductId]);
  // const generalData = data?. || [];
  const generalData = [];
  const bincardData = bincardResult?.data || [];
  console.log("Bincard Data:", bincardData);
  // console.log("General Data:", generalData);
  return (
    <ScrollablePageWrapper className="flex flex-col">
      <div
        className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="size-4" />
        <span>Approved Product</span>
      </div>
      <div className="flex flex-col my-4">
        <span className="text-gray-500 text-sm">NL-012</span>
        <PageTitle title={(data?.name as string) ?? "Product Name"} />
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
