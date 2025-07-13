import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";

import { ActivityStepStatus, ExtraPackingStatus, OperationAction } from "@/lib";

import TimelineCard from "./card";
import { TimelineItemProps } from "./type";
import { useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery } from "@/lib/redux/api/openapi.generated";

interface Props {
  item: TimelineItemProps;
  activityId: string;
  productId: string;
  scheduleId: string;
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

const Active = ({ item, activityId, scheduleId, productId }: Props) => {
  const { data } =
    useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery(
      {
        productionScheduleId: scheduleId,
        productId,
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

  return (
    <li className="mb-10 ms-6">
      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
        <FaRegCircleDot className="size-9 text-green-500" />
      </span>
      <TimelineCard
        scheduleId={scheduleId}
        productId={productId}
        activityId={activityId}
        inProgress={
          showProgress.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.New &&
          !isPendingExtraPacking &&
          !(
            hasAction(showFinishedGoods) &&
            item.status === ActivityStepStatus.New
          )
        }
        showAtr={showAtrAction}
        isPendingExtraPacking={isPendingExtraPacking}
        isComplete={
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
        className="border border-primary-inverted"
      />
    </li>
  );
};

export default Active;
