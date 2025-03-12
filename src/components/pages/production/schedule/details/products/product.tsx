import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import { toast } from "sonner";

import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import {
  BatchSizeType,
  ErrorResponse,
  Units,
  convertToLargestUnit,
  isErrorResponse,
  isStockUnAvailable,
  routes,
} from "@/lib";
import {
  ProductDtoRead,
  ProductionActivityDtoRead,
  ProductionScheduleProductDto,
  ProductionStatus,
  useLazyGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
  usePostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";

import { getColumns } from "./columns";
// import Purchase from "./purchase";
import Stock from "./stock";
// import TableForData from "./table";
import { MaterialRequestDto, ScheduleProductStatus } from "./type";

interface ProductProps {
  productId: string;
  scheduleId: string;
  tab: ProductionScheduleProductDto;
  batchSizeType: BatchSizeType;
}
const Product = ({
  productId,
  scheduleId,
  tab,
  batchSizeType,
}: ProductProps) => {
  const router = useRouter();

  const [startProductionMutation, { isLoading: isProcessingStart }] =
    usePostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdMutation();
  // const { data: activity } =
  //   useGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery(
  //     {
  //       productId,
  //       productionScheduleId: scheduleId,
  //     },
  //   );

  const [loadActivity, { isLoading: isLoadingActivity }] =
    useLazyGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery();

  // console.log(isLoadingActivity, "isLoadingActivity");

  const [product, setProduct] = useState<ProductDtoRead>();
  const [activity, setActivity] = useState<ProductionActivityDtoRead>();
  const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);

  const [enableStatusButton, setEnableStatusButton] =
    useState<ScheduleProductStatus>(ScheduleProductStatus.None);

  const [isOpenStock, setIsOpenStock] = useState(false);
  const [
    loadRawStock,
    { isLoading: isLoadingRawStock, isFetching: isFetchingRaw },
  ] =
    useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery();
  const [
    loadPackageStock,
    { isLoading: isLoadingPackageStock, isFetching: isFetchingPackage },
  ] =
    useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery();
  const [loadProductInfo, { isLoading: isLoadingProduct }] =
    useLazyGetApiV1ProductByProductIdQuery();
  const handleLoadMaterialStock = async (
    pId: string,
    psId: string,
    batchSizeType: BatchSizeType,
  ) => {
    try {
      // const productResponse = await loadProductInfo({
      //   productId: pId,
      // }).unwrap();
      // const rResponse = await loadRawStock({
      //   productId: pId,
      //   productionScheduleId: psId,
      // }).unwrap();
      // const pResponse = await loadPackageStock({
      //   productId: pId,
      //   productionScheduleId: psId,
      // }).unwrap();
      const [productResponse, rResponse, pResponse, activityResponse] =
        await Promise.all([
          loadProductInfo({ productId: pId }).unwrap(),
          loadRawStock({ productId: pId, productionScheduleId: psId }).unwrap(),
          loadPackageStock({
            productId: pId,
            productionScheduleId: psId,
          }).unwrap(),
          loadActivity({ productId: pId, productionScheduleId: psId }).unwrap(),
        ]);

      setProduct(productResponse);
      // console.log(isStockUnAvailable(rResponse), "isStockUnAvailable raw");
      // console.log(isStockUnAvailable(pResponse), "isStockUnAvailable pack");
      const isnotAvailable =
        isStockUnAvailable(rResponse) || isStockUnAvailable(pResponse);
      // console.log(isnotAvailable, "isnotAvailable");
      if (isnotAvailable) {
        setEnableStatusButton(ScheduleProductStatus.Purchase);
      }
      if (!isnotAvailable) {
        setEnableStatusButton(ScheduleProductStatus.Start);
      }

      const rawOptions = rResponse?.map((item) => {
        const code = item?.material?.code as string;
        const materialStatus = item?.status;
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
        const leftStock = totalStock - qtyOnHand;
        const leftOverStock = leftStock > 0 ? leftStock : 0;
        const totalStockConvert = convertToLargestUnit(leftOverStock, uomName);
        const totalStockValue = totalStockConvert.value;
        const totalStockUnit = totalStockConvert.unit;

        const totalStockFloat = `${parseFloat(
          totalStockValue.toString(),
        ).toFixed(2)}${totalStockUnit}`;

        const materialId = item?.material?.id as string;

        return {
          materialStatus,
          code,
          materialName,
          materialId,
          finalQuantityNeeded: quantityNeededFloat,
          finalQuantityOnHand: quantityOnHandFloat,
          finalTotalStock: totalStockFloat,
          quantity: quantityNeeded,
          uom: quantityNeededUnit,
          uomId: item?.baseUoM?.id,
        };
      }) as MaterialRequestDto[];
      setRawLists(rawOptions);
      const packOptions = pResponse?.map((item) => {
        const code = item?.material?.code as string;

        const materialName = item?.material?.name as string;
        const excess =
          (batchSizeType === BatchSizeType.Full
            ? item?.packingExcessMargin
            : (item?.packingExcessMargin ?? 0) / 2) ?? 0;
        const qtyNeeded = (item?.quantityNeeded as number) + excess;

        const quantityNeededFloat = parseFloat(qtyNeeded.toString()).toFixed(2);

        const qtyOnHand = item?.quantityOnHand as number;

        const quantityOnHandFloat = parseFloat(qtyOnHand.toString()).toFixed(2);

        const totalStock = item?.material?.totalStock as number;
        const leftStock = totalStock - qtyOnHand;
        const leftOverStock = leftStock > 0 ? leftStock : 0;
        const totalStockFloat = parseFloat(leftOverStock.toString()).toFixed(2);

        const materialId = item?.material?.id as string;
        const materialStatus = item?.status;
        return {
          materialStatus,
          code,
          materialName,
          materialId,
          finalQuantityNeeded: quantityNeededFloat,
          finalQuantityOnHand: quantityOnHandFloat,
          finalTotalStock: totalStockFloat,
          quantity: qtyNeeded,
          uom: item?.baseUoM?.symbol as Units,
          uomId: item?.baseUoM?.id,
        };
      }) as MaterialRequestDto[];
      setPackageLists(packOptions);

      setActivity(activityResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadMaterialStock(productId, scheduleId, batchSizeType);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSizeType, productId, scheduleId]);

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
      console.log(error, "error");
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const StepWorkflowActivity = (order: number, status: ProductionStatus) => {
    switch (order) {
      case 1:
        return <div></div>;
      case 2:
        return (
          <div>
            {status === 0 && (
              <Button
                onClick={() => setIsOpenStock(true)}
                className="flex items-center gap-2"
              >
                <Icon name="Layers" />
                <span>Stock Requisition</span>
              </Button>
            )}
          </div>
        );

      default:
        break;
    }
  };

  const ProductStatus = (status: ScheduleProductStatus) => {
    switch (status) {
      case ScheduleProductStatus.Start:
        return (
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
        );
      case ScheduleProductStatus.Purchase:
        return (
          <Button
            className="flex items-center gap-2"
            onClick={() =>
              router.push(routes.viewScheduleRequisition(scheduleId, productId))
            }
          >
            <Icon name="CreditCard" />
            <span>Purchase Requisition</span>
          </Button>
        );
      case ScheduleProductStatus.Stock:
        return (
          <Button
            onClick={() => setIsOpenStock(true)}
            className="flex items-center gap-2"
          >
            <Icon name="Layers" />
            <span>Stock Requisition</span>
          </Button>
        );
      default:
        break;
    }
  };

  return (
    <div className="flex-1 space-y-2 overflow-auto">
      {isLoadingProduct || isLoadingActivity ? (
        <SkeletonLoadingPage />
      ) : (
        <Card className="space-y-1 p-5 pb-0">
          <CardContent className="space-y-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col space-y-1">
                {activity ? (
                  <Link href={`/production/activities/${activity?.id}/board`}>
                    <span className="text-sm font-semibold underline">
                      View Current Production Step
                    </span>
                  </Link>
                ) : (
                  <span className="text-sm font-semibold">
                    Current Production Step
                  </span>
                )}

                <div className="flex items-center gap-2">
                  {activity ? (
                    <FaRegCircleDot className="size-4 text-green-500" />
                  ) : (
                    <div className="size-4 rounded-full bg-neutral-secondary" />
                  )}
                  <span className="text-sm">
                    {activity
                      ? activity?.currentStep?.operation?.name
                      : "Not Started"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end space-y-1">
                {activity ? (
                  <div>
                    {StepWorkflowActivity(
                      activity?.currentStep?.order as number,
                      activity?.currentStep?.status as ProductionStatus,
                    )}
                  </div>
                ) : (
                  <div>{ProductStatus(enableStatusButton)}</div>
                )}
              </div>
            </div>

            <div className="grid w-full grid-cols-8 justify-start gap-2">
              <div className="space-y-1">
                <span className="block text-sm font-normal text-neutral-secondary">
                  Code
                </span>
                <span className="block text-sm font-normal text-neutral-dark">
                  {product?.code}
                </span>
              </div>
              <div className="col-span-2 space-y-1">
                <span className="block text-sm font-normal text-neutral-secondary">
                  Name
                </span>
                <span className="block text-sm font-normal text-neutral-dark">
                  {product?.name}
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
              <div className="col-span-2 space-y-1">
                <span className="block text-sm font-normal text-neutral-secondary">
                  Packing Style
                </span>
                <span className="block text-sm font-normal text-neutral-dark">
                  {product?.packageStyle}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="space-y-4 p-5 pb-0">
        <CardTitle>Raw Material</CardTitle>
        <ClientDatatable
          normalTable
          data={rawLists}
          columns={getColumns}
          isLoading={isLoadingRawStock || isFetchingRaw}
        />
      </Card>

      <Card className="space-y-4 p-5">
        <CardTitle>Packaging Material</CardTitle>
        <ClientDatatable
          normalTable
          data={packageLists}
          columns={getColumns}
          isLoading={isLoadingPackageStock || isFetchingPackage}
        />
      </Card>

      {isOpenStock && (
        <Stock
          lists={[...rawLists, ...packageLists]}
          onClose={() => setIsOpenStock(false)}
          isOpen={isOpenStock}
          notEdittable
          productId={productId}
          productionScheduleId={scheduleId}
          productionActivityStepId={activity?.currentStep?.id}
        />
      )}
    </div>
  );
};

export default Product;
