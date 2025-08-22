"use client";
import {
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  useLazyGetApiV1WarehouseBincardinformationByProductIdProductQuery,
  FinishedGoodsTransferNoteDtoRead,
  useLazyGetApiV1ProductionScheduleApprovedProductsByProductIdQuery,
  useGetApiV1ProductByProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { ListsTable, ServerDatatable } from "@/shared/datatable";
// import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { bincardColumn, generalColumn } from "./columns";

import { AuditModules } from "@/lib";
import ProductInfo from "./product";
import PageWrapper from "@/components/layout/wrapper";
import ScrollableWrapper from "@/shared/scroll-wrapper";

const tabs = ["Stock Information", "Bincard Information"];

function Page() {
  const [pageSize, setPageSize] = useState(30);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const router = useRouter();

  const finishedProductId = id as string;

  const [loadApprovedProducts, { data: approvedProductDetails, isLoading }] =
    useLazyGetApiV1ProductionScheduleApprovedProductsByProductIdQuery();

  const { data: product } = useGetApiV1ProductByProductIdQuery({
    productId: finishedProductId,
  });
  const [
    loadBincardData,
    {
      data: bincardResult,
      isFetching: isBincardFetching,
      isLoading: isBincardLoading,
    },
  ] = useLazyGetApiV1WarehouseBincardinformationByProductIdProductQuery({});

  useEffect(() => {
    if (activeTab === 0) {
      loadApprovedProducts({
        productId: finishedProductId,
      });
    } else {
      loadBincardData({
        productId: finishedProductId,
        page,
        pageSize,
        searchQuery: "",
        module: AuditModules.warehouse.name,
        subModule: AuditModules.warehouse.approvedProducts,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedProductId, activeTab, page, pageSize]);

  const bincardData = bincardResult?.data || [];

  const approvedProducts =
    (approvedProductDetails as FinishedGoodsTransferNoteDtoRead[]) || [];

  return (
    <PageWrapper className="space-y-4">
      <div
        className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="size-4" />
        <span>Approved Product</span>
      </div>
      <ProductInfo product={product} />
      <ScrollableWrapper className="flex flex-col">
        <Tabs defaultValue={activeTab.toString()} className="">
          <TabsList className="mb-4 gap-x-6 rounded-none border-b border-b-neutral-input bg-transparent p-0 py-0">
            {tabs.map((tab, idx) => (
              <TabsTrigger
                value={idx.toString()}
                key={idx}
                onClick={() => setActiveTab(idx)}
                className="data-[state=active]:font-bold px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:text-primary-default data-[state=active]:shadow-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="w-full">
            <TabsContent className="w-full" value={"0"}>
              <ListsTable
                data={approvedProducts}
                columns={generalColumn}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="1">
              <ServerDatatable
                data={bincardData}
                columns={bincardColumn}
                setPage={setPage}
                setPageSize={setPageSize}
                isLoading={isBincardFetching || isBincardLoading}
                meta={{
                  pageIndex: bincardResult?.pageIndex as number,
                  pageCount: bincardResult?.pageCount as number,
                  totalRecordCount: bincardResult?.totalRecordCount as number,
                  numberOfPagesToShow:
                    bincardResult?.numberOfPagesToShow as number,
                  startPageIndex: bincardResult?.startPageIndex as number,
                  stopPageIndex: bincardResult?.stopPageIndex as number,
                  pageSize,
                }}
              />
            </TabsContent>
          </div>
        </Tabs>
      </ScrollableWrapper>
    </PageWrapper>
  );
}

export default Page;
