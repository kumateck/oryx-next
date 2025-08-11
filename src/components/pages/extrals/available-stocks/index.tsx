"use client";
import PageWrapper from "@/components/layout/wrapper";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import React, { useState } from "react";
import { columns } from "./columns";
import { InventoryType, splitWords } from "@/lib";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<string>(
    InventoryType.GeneralStore.toString(),
  );

  // const searchValue = useSelector((state) => state.common.searchInput);
  // const triggerReload = useSelector((state) => state.common.triggerReload);
  // const dispatch = useDispatch();
  // const debounceValue = useDebounce(searchValue, 500);

  // useEffect(() => {
  //   LoadData({
  //     page,
  //     pageSize,
  //     // inventoryType: activeTab as InventoryType,
  //     module: AuditModules.production.name,
  //     subModule: AuditModules.production.materialSpecification,
  //     searchQuery: debounceValue,
  //   });
  //   if (triggerReload) {
  //     dispatch(commonActions.unSetTriggerReload());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceValue, page, pageSize, triggerReload, activeTab]);

  // const data = result?.data ?? [];
  console.log(page, pageSize, activeTab);

  return (
    <PageWrapper className="w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <PageTitle title="Available Stocks" />
      </div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
          {Object.entries(InventoryType)
            .filter(([key]) => isNaN(Number(key)))
            .map(([label, value]) => (
              <TabsTrigger
                value={String(value)}
                key={String(value)}
                onClick={() => setActiveTab(String(value))}
                className="data-[state=active]:font-Bold h-9 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:text-primary-default data-[state=active]:shadow-none"
              >
                {splitWords(label)}
              </TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value={activeTab}>
          <ServerDatatable
            data={[]}
            columns={columns}
            isLoading={false}
            setPage={setPage}
            setPageSize={setPageSize}
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
      </Tabs>
    </PageWrapper>
  );
}

export default Page;
