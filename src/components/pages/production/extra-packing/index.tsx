"use client";
import { Button, Card, CardTitle, Icon } from "@/components/ui";

import React, { useEffect, useState } from "react";

import {
  useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
  usePostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { useParams, useRouter } from "next/navigation";
import PageWrapper from "@/components/layout/wrapper";
import { MaterialRequestDto } from "./type";
import TableForData from "./table";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";
import { routes } from "@/lib";

const ExtraPacking = () => {
  const router = useRouter();
  const { psId, pId, id } = useParams();
  const productionScheduleId = psId as string;
  const productId = pId as string;
  const activityId = id as string;
  const [itemLists, setItemLists] = useState<MaterialRequestDto[]>([]);

  const [savePackingMaterial, { isLoading: isLoadingSave }] =
    usePostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdMutation();
  const [
    loadPackageStock,
    { isLoading: isLoadingPackageStock, isFetching: isFetchingPackage },
  ] =
    useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery();
  const handleLoadPackingMaterial = async (pId: string, psId: string) => {
    const response = await loadPackageStock({
      productId: pId,
      productionScheduleId: psId,
    }).unwrap();

    const packingMaterial = response.map((item) => ({
      materialId: item?.material?.id as string,
      code: item?.material?.code as string,
      materialName: item?.material?.name as string,
      uomId: item?.baseUoM?.id as string,
      uom: item?.baseUoM?.name as string,
      quantity: 0,
      quantityOnHand: item?.quantityOnHand as number,
    }));
    setItemLists(packingMaterial);
  };

  useEffect(() => {
    if (productionScheduleId && productId) {
      handleLoadPackingMaterial(productId, productionScheduleId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productionScheduleId, productId]);

  const handleSubmit = async () => {
    try {
      await savePackingMaterial({
        productionScheduleId: productionScheduleId,
        productId: productId,
        body: itemLists?.map((item) => ({
          materialId: item?.materialId,
          quantity: item?.quantity,
          uoMId: item?.uomId,
        })),
      }).unwrap();
      toast.success("Extra Packing Saved Successfully");
      router.push(routes.viewBoard(activityId));
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  return (
    <PageWrapper>
      <Card className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <CardTitle>Extra Packasging Material</CardTitle>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2"
          >
            {isLoadingSave && (
              <Icon name="LoaderCircle" className="animate-spin" />
            )}
            <span>Save Changes</span>
          </Button>
        </div>
        <TableForData
          lists={itemLists}
          setItemLists={setItemLists}
          isLoading={isLoadingPackageStock || isFetchingPackage}
        />
      </Card>
    </PageWrapper>
  );
};

export default ExtraPacking;
