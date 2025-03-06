import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import {
  useLazyGetApiV1MaterialByMaterialIdBatchesV2Query,
  useLazyGetApiV1WarehouseBincardinformationByMaterialIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";

import { bincardColumns, generalColumns } from "../columns";

interface Props {
  materialId: string;
}
const MaterialDetails = ({ materialId }: Props) => {
  const tabs = [
    {
      id: "general-information",
      name: "General Information",
    },
    {
      id: "bincard-information",
      name: "Bincard Information",
    },
    {
      id: "reserved-quantity",
      name: "Reserved Quantity",
    },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id as string);

  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1MaterialByMaterialIdBatchesV2Query();

  const [
    loadBincardData,
    {
      data: bincardResult,
      isFetching: isBincardFetching,
      isLoading: isBincardLoading,
    },
  ] = useLazyGetApiV1WarehouseBincardinformationByMaterialIdQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadData({
      page,
      pageSize,
      warehouseId: "51d2bb5a-3321-40f7-b16c-701968a2377c",
      materialId,
    });

    loadBincardData({
      page,
      pageSize,
      materialId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];
  const bincardData = bincardResult?.data || [];
  return (
    <div className="w-full">
      <Tabs defaultValue={activeTab} className="">
        <TabsList className="mb-4 gap-x-6 rounded-none border-b border-b-neutral-input bg-transparent p-0 py-0">
          {tabs?.map((tab, idx) => (
            <TabsTrigger
              key={idx}
              value={tab?.id as string}
              onClick={() => setActiveTab(tab?.id as string)}
              className="data-[state=active]:font-Bold h-9 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:text-primary-default data-[state=active]:shadow-none"
            >
              {tab?.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="">
          <TabsContent value={"general-information"}>
            <ServerDatatable
              data={data}
              columns={generalColumns}
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
          </TabsContent>
          <TabsContent value={"bincard-information"}>
            <ServerDatatable
              data={bincardData}
              columns={bincardColumns}
              isLoading={isBincardLoading || isBincardFetching}
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
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MaterialDetails;
