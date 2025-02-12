"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";

import { Card, CardTitle } from "@/components/ui";
import { useGetApiV1ProductionScheduleManufacturingByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";
import { MaterialRequestDto } from "./type";

const IssueDetails = () => {
  const { id } = useParams();
  const bmrId = id as string;
  const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
  const { data } = useGetApiV1ProductionScheduleManufacturingByIdQuery({
    id: bmrId,
  });
  console.log(data, "data");
  // const { data: materialStockResponse } =
  //   useGetApiV1ProductionScheduleMaterialStockByProductIdAndQuantityRequiredQuery(
  //     {
  //       productId,
  //       quantityRequired: tab.quantity as number,
  //     },
  //   );
  // const { data: packageStockResponse } =
  //   useGetApiV1ProductionSchedulePackageMaterialStockByProductIdAndQuantityRequiredQuery(
  //     {
  //       productId,
  //       quantityRequired: tab.quantity as number,
  //     },
  //   );
  return (
    <ScrollablePageWrapper>
      <div>
        <PageTitle title={"Issue Details"} />
      </div>

      <Card className="space-y-4 p-5 pb-0">
        <CardTitle>Raw Material</CardTitle>
        <TableForData lists={rawLists} setItemLists={setRawLists} />
      </Card>
      <Card className="space-y-4 p-5">
        <CardTitle>Packaging Material</CardTitle>
        <TableForData lists={packageLists} setItemLists={setPackageLists} />
      </Card>
    </ScrollablePageWrapper>
  );
};

export default IssueDetails;
