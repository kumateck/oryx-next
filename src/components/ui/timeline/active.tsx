// import React, { useEffect, useState } from "react";
// import { FaRegCircleDot } from "react-icons/fa6";

// import {
//   ActivityStepStatus,
//   convertToLargestUnit,
//   ExtraPackingStatus,
//   OperationAction,
//   ProductBMRStatus,
//   Units,
// } from "@/lib";

// import TimelineCard from "./card";
// import { TimelineItemProps } from "./type";
// import {
//   useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery,
//   useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
//   useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery,
//   useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
// } from "@/lib/redux/api/openapi.generated";
// import { MaterialRequestDto } from "@/components/pages/production/schedule/details/products/type";

// interface Props {
//   item: TimelineItemProps;
//   activityId: string;
//   productId: string;
//   scheduleId: string;
// }

// const showProgress = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// const showComplete = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];
// const showFinalPacking = OperationAction.FinalPackingOrPartialReturn;
// const showFinishedGoods = OperationAction.FinishedGoodsTransferNote;
// const showExtraPackging = OperationAction.AdditionalStockRequest;
// const showAtr = OperationAction.Atr;
// const showFullReturn = OperationAction.FullReturn;
// const showStockRequisition = OperationAction.StockRequisition;
// const showBmrAndBprRequisition = OperationAction.BmrAndBprRequisition;
// const showDispatch = OperationAction.Dispatch;

// const Active = ({ item, activityId, scheduleId, productId }: Props) => {
//   const { data } =
//     useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery(
//       {
//         productionScheduleId: scheduleId,
//         productId,
//       },
//     );

//   const filterExtraPackingPendingApproval = data?.filter(
//     (item) => item.status === ExtraPackingStatus.Pending,
//   );
//   const isPendingExtraPacking =
//     filterExtraPackingPendingApproval &&
//     filterExtraPackingPendingApproval?.length > 0;

//   // Helper function to check if an action exists in the item's actions array
//   const hasAction = (actionType: OperationAction): boolean => {
//     return item.actions.some((action) => action.action === actionType);
//   };

//   // Check for specific actions
//   const showFinalPackingAction = hasAction(showFinalPacking);
//   const showFinishedGoodsAction = hasAction(showFinishedGoods);
//   const showExtraPackgingAction = hasAction(showExtraPackging);
//   const showAtrAction = hasAction(showAtr);
//   const showFullReturnAction = hasAction(showFullReturn);
//   const showStockRequisitionAction = hasAction(showStockRequisition);
//   const showBmrAndBprRequisitionAction = hasAction(showBmrAndBprRequisition);
//   const showDispatchAction = hasAction(showDispatch);

//   const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
//   const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
//   const [loadRawStock] =
//     useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery();
//   const [loadPackageStock] =
//     useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery();
//   const handleLoadMaterialStock = async (pId: string, psId: string) => {
//     try {
//       const [rResponse, pResponse] = await Promise.all([
//         loadRawStock({ productId: pId, productionScheduleId: psId }).unwrap(),
//         loadPackageStock({
//           productId: pId,
//           productionScheduleId: psId,
//         }).unwrap(),
//       ]);

//       const rawOptions = rResponse?.map((item) => {
//         const code = item?.material?.code as string;
//         const materialStatus = item?.status;
//         const uomName = item?.baseUoM?.symbol as Units;
//         const materialName = item?.material?.name as string;
//         const qtyNeeded = item?.quantityNeeded as number;
//         const qtyNeededConvert = convertToLargestUnit(qtyNeeded, uomName);
//         const quantityNeeded = qtyNeededConvert.value;
//         const quantityNeededUnit = qtyNeededConvert.unit;
//         const quantityNeededFloat = `${parseFloat(quantityNeeded.toString()).toFixed(2)}${quantityNeededUnit}`;

//         const qtyOnHand = item?.quantityOnHand as number;
//         const qtyOnHandConvert = convertToLargestUnit(qtyOnHand, uomName);
//         const quantityOnHand = qtyOnHandConvert.value;
//         const quantityOnHandUnit = qtyOnHandConvert.unit;
//         const quantityOnHandFloat = `${parseFloat(
//           quantityOnHand.toString(),
//         ).toFixed(2)}${quantityOnHandUnit}`;

//         const totalStock = item?.material?.totalStock as number;
//         const leftStock = totalStock - qtyOnHand;
//         const leftOverStock = leftStock > 0 ? leftStock : 0;
//         const totalStockConvert = convertToLargestUnit(leftOverStock, uomName);
//         const totalStockValue = totalStockConvert.value;
//         const totalStockUnit = totalStockConvert.unit;

//         const totalStockFloat = `${parseFloat(
//           totalStockValue.toString(),
//         ).toFixed(2)}${totalStockUnit}`;

//         const materialId = item?.material?.id as string;

//         return {
//           materialStatus,
//           code,
//           materialName,
//           materialId,
//           finalQuantityNeeded: quantityNeededFloat,
//           finalQuantityOnHand: quantityOnHandFloat,
//           finalTotalStock: totalStockFloat,
//           quantity: quantityNeeded,
//           uom: quantityNeededUnit,
//           uomId: item?.baseUoM?.id as string,
//         };
//       }) as MaterialRequestDto[];
//       setRawLists(rawOptions);
//       const packOptions = pResponse?.map((item) => {
//         const code = item?.material?.code as string;

//         const materialName = item?.material?.name as string;

//         const qtyNeeded = item?.quantityNeeded as number;

//         const quantityNeededFloat = parseFloat(qtyNeeded.toString()).toFixed(2);

//         const qtyOnHand = item?.quantityOnHand as number;

//         const quantityOnHandFloat = parseFloat(qtyOnHand.toString()).toFixed(2);

//         const totalStock = item?.material?.totalStock as number;
//         const leftStock = totalStock - qtyOnHand;
//         const leftOverStock = leftStock > 0 ? leftStock : 0;
//         const totalStockFloat = parseFloat(leftOverStock.toString()).toFixed(2);

//         const materialId = item?.material?.id as string;
//         const materialStatus = item?.status;
//         return {
//           materialStatus,
//           code,
//           materialName,
//           materialId,
//           finalQuantityNeeded: quantityNeededFloat,
//           finalQuantityOnHand: quantityOnHandFloat,
//           finalTotalStock: totalStockFloat,
//           quantity: qtyNeeded,
//           uom: item?.baseUoM?.symbol as Units,
//           uomId: item?.baseUoM?.id,
//         };
//       }) as MaterialRequestDto[];
//       setPackageLists(packOptions);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handleLoadMaterialStock(productId, scheduleId);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [productId, scheduleId]);
//   const { data: bmrData } =
//     useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery(
//       {
//         productionId: productId as string,
//         productionScheduleId: scheduleId as string,
//       },
//     );

//   return (
//     <li className="mb-10 ms-6">
//       <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
//         <FaRegCircleDot className="size-9 text-green-500" />
//       </span>
//       <TimelineCard
//         bmrStatus={bmrData?.status as ProductBMRStatus}
//         stockLists={rawLists.concat(packageLists)}
//         scheduleId={scheduleId}
//         productId={productId}
//         activityId={activityId}
//         inProgress={
//           showProgress.includes(Number(item.order)) &&
//           item.status === ActivityStepStatus.New &&
//           !isPendingExtraPacking &&
//           !(
//             hasAction(showFinishedGoods) &&
//             item.status === ActivityStepStatus.New
//           )
//         }
//         showAtr={showAtrAction}
//         isPendingExtraPacking={isPendingExtraPacking}
//         isComplete={
//           showComplete.includes(Number(item.order)) &&
//           item.status === ActivityStepStatus.InProgress
//         }
//         showFinalPacking={
//           showFinalPackingAction &&
//           item.status === ActivityStepStatus.InProgress
//         }
//         showFinishedGoods={
//           showFinishedGoodsAction && item.status === ActivityStepStatus.New
//         }
//         showExtraPackging={showExtraPackgingAction}
//         showFullReturn={showFullReturnAction}
//         showStockRequisition={showStockRequisitionAction}
//         showBmrAndBprRequisition={showBmrAndBprRequisitionAction}
//         showDispatch={showDispatchAction}
//         item={item}
//         className="border border-primary-inverted"
//       />
//     </li>
//   );
// };

// export default Active;

import React, { useEffect, useState } from "react";
import { FaRegCircleDot } from "react-icons/fa6";

import {
  ActivityStepStatus,
  convertToLargestUnit,
  ExtraPackingStatus,
  OperationAction,
  ProductBMRStatus,
  Units,
} from "@/lib";

import TimelineCard from "./card";
import { TimelineItemProps } from "./type";
import {
  ProductionScheduleProductDto,
  useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { MaterialRequestDto } from "@/components/pages/production/schedule/details/products/type";

interface Props {
  item: TimelineItemProps;
  activityId: string;
  productId: string;
  scheduleId: string;
  productInfo?: ProductionScheduleProductDto;
}

const showProgress = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const showComplete = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];
const showFinalPacking = OperationAction.FinalPackingOrPartialReturn;
const showFinishedGoods = OperationAction.FinishedGoodsTransferNote;
const showExtraPackging = OperationAction.AdditionalStockRequest;
const showAtr = OperationAction.Atr;
const showFullReturn = OperationAction.FullReturn;
const showStockRequisition = OperationAction.StockRequisition;
const showBmrAndBprRequisition = OperationAction.BmrAndBprRequisition;
const showDispatch = OperationAction.Dispatch;

const Active = ({
  item,
  activityId,
  scheduleId,
  productId,
  productInfo,
}: Props) => {
  // Only fetch data when this component is rendered (i.e., when item is active)
  const { data } =
    useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery(
      {
        productionScheduleId: scheduleId,
        productId,
      },
      {
        skip: productInfo?.cancelled,
      },
    );

  const { data: bmrData } =
    useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery(
      {
        productionId: productId as string,
        productionScheduleId: scheduleId as string,
      },
      {
        skip: productInfo?.cancelled,
      },
    );

  const filterExtraPackingPendingApproval = data?.filter(
    (item) => item.status === ExtraPackingStatus.Pending,
  );
  const isPendingExtraPacking =
    filterExtraPackingPendingApproval &&
    filterExtraPackingPendingApproval?.length > 0;

  // Helper function to check if an action exists in the item's actions array
  const hasAction = (actionType: OperationAction): boolean => {
    return item.actions.some((action) => action.action === actionType);
  };

  // Check for specific actions
  const showFinalPackingAction = hasAction(showFinalPacking);
  const showFinishedGoodsAction = hasAction(showFinishedGoods);
  const showExtraPackgingAction = hasAction(showExtraPackging);
  const showAtrAction = hasAction(showAtr);
  const showFullReturnAction = hasAction(showFullReturn);
  const showStockRequisitionAction = hasAction(showStockRequisition);
  const showBmrAndBprRequisitionAction = hasAction(showBmrAndBprRequisition);
  const showDispatchAction = hasAction(showDispatch);

  const [rawLists, setRawLists] = useState<MaterialRequestDto[]>([]);
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);
  const [loadRawStock] =
    useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery();
  const [loadPackageStock] =
    useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery();

  const handleLoadMaterialStock = async (pId: string, psId: string) => {
    if (productInfo?.cancelled) return; // Don't load data if cancelled

    try {
      const [rResponse, pResponse] = await Promise.all([
        loadRawStock({ productId: pId, productionScheduleId: psId }).unwrap(),
        loadPackageStock({
          productId: pId,
          productionScheduleId: psId,
        }).unwrap(),
      ]);

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
          uomId: item?.baseUoM?.id as string,
        };
      }) as MaterialRequestDto[];
      setRawLists(rawOptions);

      const packOptions = pResponse?.map((item) => {
        const code = item?.material?.code as string;
        const materialName = item?.material?.name as string;
        const qtyNeeded = item?.quantityNeeded as number;
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // This will only run when the Active component is mounted (i.e., when item is active)
    if (!productInfo?.cancelled) {
      handleLoadMaterialStock(productId, scheduleId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, scheduleId, productInfo?.cancelled]);

  return (
    <li className="mb-10 ms-6">
      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
        <FaRegCircleDot
          className={`size-9 ${productInfo?.cancelled ? "text-red-500" : "text-green-500"}`}
        />
      </span>
      <TimelineCard
        productInfo={productInfo}
        bmrStatus={bmrData?.status as ProductBMRStatus}
        stockLists={rawLists.concat(packageLists)}
        scheduleId={scheduleId}
        productId={productId}
        activityId={activityId}
        inProgress={
          !productInfo?.cancelled &&
          showProgress.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.New &&
          !isPendingExtraPacking &&
          !(
            hasAction(showFinishedGoods) &&
            item.status === ActivityStepStatus.New
          )
        }
        showAtr={showAtrAction}
        isPendingExtraPacking={!productInfo?.cancelled && isPendingExtraPacking}
        isComplete={
          !productInfo?.cancelled &&
          showComplete.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.InProgress
        }
        showFinalPacking={
          showFinalPackingAction &&
          item.status === ActivityStepStatus.InProgress
        }
        showFinishedGoods={
          showFinishedGoodsAction && item.status === ActivityStepStatus.New
        }
        showExtraPackging={showExtraPackgingAction}
        showFullReturn={showFullReturnAction}
        showStockRequisition={showStockRequisitionAction}
        showBmrAndBprRequisition={showBmrAndBprRequisitionAction}
        showDispatch={showDispatchAction}
        item={item}
        className={`border border-primary-inverted ${productInfo?.cancelled ? "opacity-75" : ""}`}
      />
    </li>
  );
};

export default Active;
