import React from "react";

import { Card, CardContent } from "@/components/ui";
import { Units, convertToLargestUnit } from "@/lib";
import { DistributionRequisitionItem } from "@/lib/redux/api/openapi.generated";

interface Props {
  item: DistributionRequisitionItem;
  uom: Units;
}
const DistributeCard = ({ item, uom }: Props) => {
  const requested = convertToLargestUnit(item.quantityRequested as number, uom);
  const distributed = convertToLargestUnit(
    item.quantityAllocated as number,
    uom,
  );
  return (
    <Card className="pb-0 pt-5">
      <CardContent>
        <p>Department: {item.department?.name}</p>
        <p>
          Quantity Requsted: {requested.value} {requested.unit}
        </p>
        <p>
          Quantity Distributed: {distributed.value} {distributed.unit}
        </p>
      </CardContent>
    </Card>
  );
};

export default DistributeCard;
