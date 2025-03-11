"use client";

import { RowSelectionState } from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon, Separator } from "@/components/ui";
import {
  EMaterialKind,
  Units,
  convertToLargestUnit,
  getMatchingIds,
} from "@/lib";
import {
  useGetApiV1ProductionScheduleByScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";

import Purchase from "../details/products/purchase";
import { MaterialRequestDto } from "../details/products/type";
import TableCard from "./table";

const Page = () => {
  const router = useRouter();
  const { id, pid } = useParams();
  const scheduleId = id as string;
  const productId = pid as string;
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [rRowSelection, setRRowSelection] = useState<RowSelectionState>({});
  const [pRowSelection, setPRowSelection] = useState<RowSelectionState>({});
  const [purchaseLists, setPurchaseLists] = useState<MaterialRequestDto[]>([]);

  const [isOpenPurchase, setIsOpenPurchase] = useState(false);

  const [
    loadRawMaterials,
    { data: materialResponse, isLoading: isRawLoading },
  ] =
    useLazyGetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdQuery();
  const [
    loadPackMaterials,
    { data: packageResponse, isLoading: isPackageLoading },
  ] =
    useLazyGetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdQuery();

  useEffect(() => {
    loadRawMaterials({
      productionScheduleId: scheduleId,
      productId,
    });
    loadPackMaterials({
      productionScheduleId: scheduleId,
      productId,
    });

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadRawMaterials, loadPackMaterials, triggerReload]);

  const { data } = useGetApiV1ProductionScheduleByScheduleIdQuery({
    scheduleId,
  });

  const loadRawPurchaseData = () => {
    const material =
      materialResponse?.map((item) => ({
        id: item.material?.id as string,
      })) ?? [];
    const ids = getMatchingIds(material, rRowSelection);
    const filteredItems = materialResponse?.filter((item) =>
      ids.includes(item?.material?.id as string),
    );
    const filtered = filteredItems?.map((material) => {
      const uom = convertToLargestUnit(
        Number(material.quantityNeeded),
        material.baseUoM?.symbol as Units,
      ).unit;
      const quantityOnHand = convertToLargestUnit(
        Number(material.quantityOnHand),
        material.baseUoM?.symbol as Units,
      ).value;
      const qty = convertToLargestUnit(
        Number(material.quantityNeeded),
        material.baseUoM?.symbol as Units,
      ).value;
      return {
        code: material.material?.code,
        materialName: material.material?.name,
        materialId: material.material?.id,
        uom,
        quantityOnHand,
        quantityRequested: qty,
        quantity: qty,
        totalStock: material.material?.totalStock,
        uomId: material.baseUoM?.id,
      };
    }) as unknown as MaterialRequestDto[];
    setPurchaseLists(filtered);
    setIsOpenPurchase(true);
  };
  const loadPackagePurchaseData = () => {
    const material =
      packageResponse?.map((item) => ({
        id: item.material?.id as string,
      })) ?? [];
    const ids = getMatchingIds(material, pRowSelection);
    const productFound = data?.products?.find(
      (item) => item.product?.id === productId,
    );
    const filteredItems = packageResponse?.filter((item) =>
      ids.includes(item?.material?.id as string),
    );
    const filtered = filteredItems?.map((material) => {
      const uom = convertToLargestUnit(
        Number(material.quantityNeeded),
        material.baseUoM?.symbol as Units,
      ).unit;
      const quantityOnHand = convertToLargestUnit(
        Number(material.quantityOnHand),
        material.baseUoM?.symbol as Units,
      ).value;
      const quantity = material.quantityNeeded ?? 0;
      const excess =
        (convertToLargestUnit(
          productFound?.quantity as number,
          productFound?.product?.baseUoM?.symbol as Units,
        ).value === productFound?.product?.fullBatchSize
          ? material?.packingExcessMargin
          : (material?.packingExcessMargin ?? 0) / 2) ?? 0;
      const totalQuantityNeeded = Math.round((quantity + excess) * 100) / 100;
      const qty = convertToLargestUnit(
        Number(totalQuantityNeeded),
        material.baseUoM?.symbol as Units,
      ).value;
      return {
        code: material.material?.code,
        materialName: material.material?.name,
        materialId: material.material?.id,
        uom,
        quantityOnHand,
        quantityRequested: qty,
        quantity: qty,
        totalStock: material.material?.totalStock,
        uomId: material.baseUoM?.id,
      };
    }) as unknown as MaterialRequestDto[];
    setPurchaseLists(filtered);
    setIsOpenPurchase(true);
  };

  const productFound = data?.products?.find(
    (item) => item.product?.id === productId,
  );

  const onBack = () => {
    router.back();
  };

  return (
    <PageWrapper className="space-y-5">
      <div className="flex items-center gap-2">
        <Icon name="ArrowLeft" onClick={onBack} className="cursor-pointer" />
        <PageTitle title="Materials Purchase Requisition" />
      </div>
      <ScrollableWrapper className="space-y-5">
        {isRawLoading ? (
          <SkeletonLoadingPage />
        ) : (
          <TableCard
            type={EMaterialKind.Raw}
            rowSelection={rRowSelection}
            setRowSelection={setRRowSelection}
            title="Raw Materials"
            data={materialResponse ?? []}
            action={
              <div className="flex items-center gap-2 rounded-2xl bg-neutral-hover p-2 shadow-sm">
                {Object.keys(rRowSelection).length > 0 && (
                  <div className="flex items-center gap-2">
                    <Icon
                      name="SquareCheck"
                      className="size-6 text-primary-default"
                    />
                    <span>
                      {Object.keys(rRowSelection).length} Item
                      {Object.keys(rRowSelection).length > 1 && "s"}
                    </span>
                    <Separator orientation="vertical" />
                    <Button size="sm" onClick={loadRawPurchaseData}>
                      Purchase Requisition
                    </Button>
                  </div>
                )}
              </div>
            }
          />
        )}
        {isPackageLoading ? (
          <SkeletonLoadingPage />
        ) : (
          <TableCard
            type={EMaterialKind.Packing}
            rowSelection={pRowSelection}
            setRowSelection={setPRowSelection}
            title="Package Materials"
            data={
              packageResponse?.map((item) => {
                const excess =
                  (convertToLargestUnit(
                    productFound?.quantity as number,
                    productFound?.product?.baseUoM?.symbol as Units,
                  ).value === productFound?.product?.fullBatchSize
                    ? item?.packingExcessMargin
                    : (item?.packingExcessMargin ?? 0) / 2) ?? 0;
                return {
                  ...item,
                  packingExcessMargin: excess,
                };
              }) ?? []
            }
            action={
              <div className="flex items-center gap-2 rounded-2xl bg-neutral-hover p-2 shadow-sm">
                {Object.keys(pRowSelection).length > 0 && (
                  <div className="flex items-center gap-2">
                    <Icon
                      name="SquareCheck"
                      className="size-6 text-primary-default"
                    />
                    <span>
                      {Object.keys(pRowSelection).length} Item
                      {Object.keys(pRowSelection).length > 1 && "s"}
                    </span>
                    <Separator orientation="vertical" />
                    <Button size="sm" onClick={loadPackagePurchaseData}>
                      Purchase Requisition
                    </Button>
                  </div>
                )}
              </div>
            }
          />
        )}
        {purchaseLists.length > 0 && (
          <Purchase
            lists={purchaseLists}
            onClose={() => setIsOpenPurchase(false)}
            isOpen={isOpenPurchase}
            productId={productId}
            productionScheduleId={scheduleId}
          />
        )}
      </ScrollableWrapper>
    </PageWrapper>
  );
};

export default Page;
