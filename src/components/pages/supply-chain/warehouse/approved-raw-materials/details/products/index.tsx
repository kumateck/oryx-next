import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { ProductionScheduleProductDto } from "@/lib/redux/api/openapi.generated";

interface Props {
  products: ProductionScheduleProductDto[];
  scheduleId: string;
}
const Products = ({ products }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(
    products[0].product?.id as string,
  );
  return (
    <div className="w-full">
      <Tabs defaultValue={activeTab} className="">
        <TabsList className="mb-4 gap-x-6 rounded-none border-b border-b-neutral-input bg-transparent p-0 py-0">
          {products?.map((tab, idx) => (
            <TabsTrigger
              key={idx}
              value={tab.product?.id as string}
              onClick={() => setActiveTab(tab.product?.id as string)}
              className="data-[state=active]:font-Bold h-9 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:text-primary-default data-[state=active]:shadow-none"
            >
              {tab.product?.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* <div className="">
          {products.map((tab, idx) => (
            <TabsContent key={idx} value={tab.product?.id as string}>
              <Product
                scheduleId={scheduleId}
                tab={tab}
                productId={tab.product?.id as string}
              />
            </TabsContent>
          ))}
        </div> */}
      </Tabs>
    </div>
  );
};

export default Products;
