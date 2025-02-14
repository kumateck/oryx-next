import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import {
  ErrorResponse,
  Units,
  convertToLargestUnit,
  isErrorResponse,
  quantityAvailable,
} from "@/lib";
import {
  ProductionScheduleProductDto,
  useGetApiV1ProductByProductIdQuery,
  useGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleMaterialStockByProductIdAndQuantityRequiredQuery,
  useGetApiV1ProductionSchedulePackageMaterialStockByProductIdAndQuantityRequiredQuery,
  usePostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdMutation,
} from "@/lib/redux/api/openapi.generated";

import Purchase from "./purchase";
import TableForData from "./table";
import { MaterialRequestDto } from "./type";

interface ProductProps {
  productId: string;
  scheduleId: string;
  tab: ProductionScheduleProductDto;
}
const Product = ({ productId, scheduleId, tab }: ProductProps) => {
  const [startProductionMutation, { isLoading: isProcessingStart }] =
    usePostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdMutation();
  const { data: activity } =
    useGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery(
      {
        productId,
        productionScheduleId: scheduleId,
      },
    );

  const { data } = useGetApiV1ProductByProductIdQuery({
    productId,
  });
  const { data: materialStockResponse } =
    useGetApiV1ProductionScheduleMaterialStockByProductIdAndQuantityRequiredQuery(
      {
        productId,
        quantityRequired: tab.quantity as number,
      },
    );
  const { data: packageStockResponse } =
    useGetApiV1ProductionSchedulePackageMaterialStockByProductIdAndQuantityRequiredQuery(
      {
        productId,
        quantityRequired: tab.quantity as number,
      },
    );

  // console.log(packageStockResponse, "packageStockResponse");
  const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
  const [purchaseLists, setPurchaseLists] = useState<MaterialRequestDto[]>([]);
  const [enablePurchase, setEnablePurchase] = useState(false);
  const [isOpenPurchase, setIsOpenPurchase] = useState(false);

  //   console.log(data, "data");
  useEffect(() => {
    if (materialStockResponse) {
      setEnablePurchase(!quantityAvailable(materialStockResponse));

      if (!quantityAvailable(materialStockResponse)) {
        const filteredMaterials = materialStockResponse
          .filter(
            (item) => Number(item.quantityNeeded) > Number(item.quantityOnHand),
          )
          ?.map((material) => {
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
        setPurchaseLists(filteredMaterials);
      }

      const rawOptions = materialStockResponse?.map((item) => {
        const code = item?.material?.code as string;
        const uomName = item?.baseUoM?.symbol as Units;
        const materialName = item?.material?.name as string;
        const qtyNeeded = item?.quantityNeeded as number;
        const qtyNeededConvert = convertToLargestUnit(qtyNeeded, uomName);
        const quantityNeeded = qtyNeededConvert.value;
        const quantityNeededUnit = qtyNeededConvert.unit;
        const quantityNeededFloat = `${parseFloat(quantityNeeded.toString()).toFixed(2)}${quantityNeededUnit}`;

        const qtyOnHand = item?.quantityOnHand as number;
        const qtyOnHandConvert = convertToLargestUnit(qtyOnHand, uomName);
        const quantityOnHand = qtyOnHandConvert.value;
        const quantityOnHandUnit = qtyOnHandConvert.unit;
        const quantityOnHandFloat = `${parseFloat(
          quantityOnHand.toString(),
        ).toFixed(2)}${quantityOnHandUnit}`;

        const totalStock = item?.material?.totalStock as number;
        const totalStockConvert = convertToLargestUnit(totalStock, uomName);
        const totalStockValue = totalStockConvert.value;
        const totalStockUnit = totalStockConvert.unit;
        const totalStockFloat = `${parseFloat(
          totalStockValue.toString(),
        ).toFixed(2)}${totalStockUnit}`;

        const materialId = item?.material?.id as string;

        return {
          code,
          materialName,
          materialId,
          finalQuantityNeeded: quantityNeededFloat,
          finalQuantityOnHand: quantityOnHandFloat,
          finalTotalStock: totalStockFloat,
        };
      }) as MaterialRequestDto[];
      setRawLists(rawOptions);
    }
  }, [materialStockResponse]);
  useEffect(() => {
    if (packageStockResponse) {
      // const packingExcessMargin = data?.packingExcessMargin as number;

      setEnablePurchase(!quantityAvailable(packageStockResponse));

      const packOptions = packageStockResponse?.map((item) => {
        const code = item?.material?.code as string;

        const materialName = item?.material?.name as string;

        const qtyNeeded = item?.quantityNeeded as number;

        const quantityNeededFloat = parseFloat(qtyNeeded.toString()).toFixed(2);

        const qtyOnHand = item?.quantityOnHand as number;

        const quantityOnHandFloat = parseFloat(qtyOnHand.toString()).toFixed(2);

        const totalStock = item?.material?.totalStock as number;

        const totalStockFloat = parseFloat(totalStock.toString()).toFixed(2);

        const materialId = item?.material?.id as string;

        return {
          code,
          materialName,
          materialId,
          finalQuantityNeeded: quantityNeededFloat,
          finalQuantityOnHand: quantityOnHandFloat,
          finalTotalStock: totalStockFloat,
        };
      }) as MaterialRequestDto[];
      setPackageLists(packOptions);
    }
  }, [packageStockResponse, data]);

  const convertUnit = convertToLargestUnit(
    Number(tab.quantity),
    tab?.product?.baseUoM?.symbol as Units,
  );

  const handleStartProduction = async () => {
    try {
      await startProductionMutation({
        productId,
        productionScheduleId: scheduleId,
      }).unwrap();
      toast.success("Production started successfully");
      // router.push(`/production/schedules`);
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div className="flex-1 space-y-2 overflow-auto">
      <Card className="space-y-1 p-5 pb-0">
        <CardContent>
          <div className="grid w-full grid-cols-6 justify-start gap-2">
            <div className="space-y-1">
              <span className="block text-sm font-normal text-neutral-secondary">
                Code
              </span>
              <span className="block text-sm font-normal text-neutral-dark">
                {data?.code}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-sm font-normal text-neutral-secondary">
                Name
              </span>
              <span className="block text-sm font-normal text-neutral-dark">
                {data?.name}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-sm font-normal text-neutral-secondary">
                Batch Size
              </span>
              <span className="block text-sm font-normal text-neutral-dark">
                {convertUnit?.value}
                {convertUnit?.unit}
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-sm font-normal text-neutral-secondary">
                Packing Style
              </span>
              <span className="block text-sm font-normal text-neutral-dark">
                {data?.packageStyle}
              </span>
            </div>

            <div className="col-span-2 flex items-center justify-end space-y-1">
              {activity ? (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-semibold text-neutral-secondary">
                    Production Current Step
                  </span>
                  <div className="rounded-md border px-1.5 py-0.5 text-sm">
                    {activity?.currentStep?.operation?.name}
                  </div>
                  <Link
                    className="rounded-md border px-1.5 py-0.5 text-sm"
                    href={`/production/product/${productId}/board`}
                  >
                    Flow
                  </Link>
                </div>
              ) : (
                <div>
                  {enablePurchase ? (
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => setIsOpenPurchase(true)}
                    >
                      <Icon name="CreditCard" />
                      <span>Purchase Requisition</span>
                    </Button>
                  ) : (
                    <Button
                      className="flex items-center gap-2"
                      onClick={handleStartProduction}
                    >
                      {isProcessingStart ? (
                        <Icon name="LoaderCircle" className="animate-spin" />
                      ) : (
                        <Icon name="TvMinimalPlay" />
                      )}
                      <span>Start Production</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="space-y-4 p-5 pb-0">
        <CardTitle>Raw Material</CardTitle>
        <TableForData lists={rawLists} setItemLists={setRawLists} />
      </Card>
      <Card className="space-y-4 p-5">
        <CardTitle>Packaging Material</CardTitle>
        <TableForData lists={packageLists} setItemLists={setPackageLists} />
      </Card>
      {enablePurchase && isOpenPurchase && (
        <Purchase
          lists={purchaseLists}
          onClose={() => setIsOpenPurchase(false)}
          isOpen={isOpenPurchase}
        />
      )}
    </div>
  );
};

export default Product;
