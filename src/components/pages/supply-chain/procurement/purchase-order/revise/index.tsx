"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Card, CardContent, Icon } from "@/components/ui";
import {
  convertToLargestUnit,
  convertToSmallestUnit,
  EMaterialKind,
  ErrorResponse,
  getLargestUnit,
  getSmallestUnit,
  isErrorResponse,
  RevisionType,
  Units,
} from "@/lib";
import {
  PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiArg,
  useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import TableForData from "./table";
import { RevisionRequestDto } from "./type";
import Create from "./create";
import DropdownBtns from "@/shared/btns/drop-btn";
import { toast } from "sonner";

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
    setItemLists(() => []);
    handleLoadPO(POId);

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [POId, triggerReload]);
  const [currency, setCurrency] = useState({
    label: "",
    value: "",
  });

  const handleLoadPO = async (pId: string) => {
    const res = await loadPO({
      purchaseOrderId: pId,
    }).unwrap();

    const supplierCurrency = {
      label: res?.supplier?.currency?.symbol ?? "",
      value: res?.supplier?.currency?.id ?? "",
    };
    const supplierType = Number(res.supplier?.type);
    setCurrency(supplierCurrency);
    const response = res?.items?.map((item, idx) => {
      const qty = convertToLargestUnit(
        item.quantity as number,
        getSmallestUnit(item.uom?.symbol as Units),
      );
      return {
        idIndex: (idx + 1).toString(),
        purchaseOrderItemId: item.id ?? "",
        material: {
          label: item.material?.name ?? "",
          value: item.material?.id ?? "",
        },
        uoM: {
          label: qty.unit ?? "",
          value: item.uom?.id ?? "",
        },
        supplierId: res.supplier?.id ?? "",
        quantity: qty.value ?? 0,
        price: item.price ?? 0,
        currency: supplierCurrency,
        type: RevisionType.UpdateItem,
        currencyId: item.currency?.id ?? "",
        supplierType,
      };
    }) as RevisionRequestDto[];

    setItemLists(() => response);
  };

  const onBack = () => {
    router.back();
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isMaterialType, setIsMaterialType] = useState<EMaterialKind>(
    EMaterialKind.Raw,
  );

  const [saveMutation, { isLoading: isSaving }] =
    usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation();

  const handleSave = async () => {
    try {
      await saveMutation({
        purchaseOrderId: POId,
        body: itemLists?.map((item) => {
          const qty = convertToSmallestUnit(
            item.quantity as number,
            getLargestUnit(item.uoM?.label as Units),
          );
          return {
            uoMId: item.uoM?.value,
            materialId: item.material?.value,
            currencyId: item.currency?.value,
            type: Number(item.type) as RevisionType,
            quantity: qty.value,
            price: item.price,
            purchaseOrderItemId: item.purchaseOrderItemId,
          };
        }),
      } satisfies PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiArg).unwrap();
      toast.success("Purchase Order revised successfully");
      router.push(`/procurement/purchase-orders/${POId}`);
    } catch (error) {
      console.error("Error saving purchase order:", error);
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
  };
  return (
    <ScrollablePageWrapper>
      <PageWrapper>
        <div className="flex justify-between gap-4 py-2">
          <div className="flex items-center gap-2">
            <Icon name="ArrowLeft" onClick={onBack} />
            <PageTitle title="Revise Purchase Order" />
          </div>
          <div className="flex items-center gap-2">
            <DropdownBtns
              title="Add New"
              icon="Plus"
              variant="outline"
              menus={[
                {
                  name: "Raw Material",
                  onClick: () => {
                    setIsOpen(true);
                    setIsMaterialType(EMaterialKind.Raw);
                  },
                },
                {
                  name: "Packing Material",
                  onClick: () => {
                    setIsOpen(true);
                    setIsMaterialType(EMaterialKind.Packing);
                  },
                },
              ]}
            />
            <Button onClick={handleSave}>
              {isSaving ? (
                <Icon name="LoaderCircle" className="mr-2 animate-spin" />
              ) : (
                <Icon name="Save" className="mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
        {isOpen && (
          <Create
            setItemLists={setItemLists}
            itemLists={itemLists}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            currency={currency}
            isMaterialType={isMaterialType}
          />
        )}
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
