import React from "react";

import { Card } from "@/components/ui";
import { DistributionRequisitionItem } from "@/lib/redux/api/openapi.generated";

import TableForData from "./table";

interface ProductProps {
  item: DistributionRequisitionItem;
  scheduleId: string;
}

const Product = ({ item }: ProductProps) => {
  return (
    <div className="flex-1 space-y-2 overflow-auto">
      <Card className="space-y-4 p-5 pb-0">
        <TableForData lists={[item]} />
      </Card>
    </div>
  );
};

export default Product;
