import React from "react";

import { ProductionScheduleProductDto } from "@/lib/redux/api/openapi.generated";

import Product from "./product";

interface Props {
  products: ProductionScheduleProductDto[];
  scheduleId: string;
}
const Products = ({ products, scheduleId }: Props) => {
  return (
    <div className="w-full">
      <div className="">
        {products.map((tab, idx) => (
          <div key={idx}>
            <Product
              scheduleId={scheduleId}
              tab={tab}
              productId={tab.product?.id as string}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
