"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Card, CardContent, Icon } from "@/components/ui";
import { RevisionType } from "@/lib";
import { useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";
import { RevisionRequestDto } from "./type";

const RevisePurchaseOrder = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [itemLists, setItemLists] = useState<RevisionRequestDto[]>([]);

  const router = useRouter();
  const { id } = useParams();
  const POId = id as string;
  const [loadPO] =
    useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery();

  useEffect(() => {
    handleLoadPO(POId);

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [POId, triggerReload]);

  const handleLoadPO = async (pId: string) => {
    const res = await loadPO({
      purchaseOrderId: pId,
    }).unwrap();

    const response = res?.items?.map((item, idx) => ({
      idIndex: (idx + 1).toString(),
      // purchaseOrderItemId: item.purchaseOrderItemId ?? "",
      material: {
        label: item.material?.name ?? "",
        value: item.material?.id ?? "",
      },
      uoM: {
        label: item.uom?.name ?? "",
        value: item.uom?.id ?? "",
      },
      quantity: item.quantity ?? 0,
      price: item.price ?? 0,
      currency: {
        label: item.currency?.name ?? "",
        value: item.currency?.id ?? "",
      },
      type: RevisionType.UpdateItem,
      currencyId: item.currency?.id ?? "",
    })) as RevisionRequestDto[];

    setItemLists(response);
  };

  const onBack = () => {
    router.back();
  };
  return (
    <ScrollablePageWrapper>
      <PageWrapper>
        <div className="flex items-center gap-2">
          <Icon name="ArrowLeft" onClick={onBack} />
          <PageTitle title="Revise Purchase Order" />
        </div>
        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="w-full py-6">
              <TableForData lists={itemLists} setItemLists={setItemLists} />
            </div>
          </CardContent>
        </Card>
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default RevisePurchaseOrder;
