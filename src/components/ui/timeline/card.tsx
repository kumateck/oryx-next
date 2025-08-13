// // import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";

// import FinishedGoodsTransfer from "@/components/pages/production/activities/finished-goods-note";
// import {
//   ActivityStepStatus,
//   ErrorResponse,
//   ProductBMRStatus,
//   cn,
//   getInitials,
//   isErrorResponse,
//   routes,
//   splitWords,
// } from "@/lib";
// import {
//   ProductionStatus,
//   useGetApiV1QaAnalyticalTestsActivityStepByActivityStepIdQuery,
//   usePostApiV1ProductionScheduleReturnBeforeProductionMutation,
//   usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation,
// } from "@/lib/redux/api/openapi.generated";
// import { commonActions } from "@/lib/redux/slices/common";

// import { AvatarStack } from "../avatar-stack";
// import { Button } from "../button";
// import { Icon } from "../icon";
// import { Label } from "../label";
// import { TimelineItemProps } from "./type";
// import Link from "next/link";
// import { TriangleAlertIcon } from "lucide-react";

// import { Alert, AlertDescription, AlertTitle } from "../alert";
// import AnalyticalTestRequest from "@/shared/atr";
// import ThrowErrorMessage from "@/lib/throw-error";
// import { ReasonDialog } from "../reason-dialog";
// import BMRStatus from "./bmr-status";
// import Stock from "@/components/pages/production/schedule/details/products/stock";
// import { MaterialRequestDto } from "@/components/pages/production/schedule/details/products/type";

// interface Props {
//   stockLists: MaterialRequestDto[];
//   item: TimelineItemProps;
//   className?: string;
//   isComplete?: boolean;
//   inProgress?: boolean;
//   showFinalPacking?: boolean;
//   showFinishedGoods?: boolean;
//   showExtraPackging?: boolean;
//   isPendingExtraPacking?: boolean;
//   showAtr?: boolean;
//   showFullReturn?: boolean;
//   showStockRequisition?: boolean;
//   showBmrAndBprRequisition?: boolean;
//   showDispatch?: boolean;
//   activityId?: string;
//   productId?: string;
//   scheduleId?: string;
//   bmrStatus?: ProductBMRStatus;
// }
// const TimelineCard = ({
//   item,
//   className,
//   isComplete,
//   inProgress,
//   showFinishedGoods,
//   showFinalPacking,
//   activityId,
//   scheduleId,
//   productId,
//   showExtraPackging,
//   isPendingExtraPacking,
//   showAtr,
//   showFullReturn,
//   showStockRequisition,
//   showBmrAndBprRequisition,
//   showDispatch,
//   bmrStatus,
//   stockLists,
// }: Props) => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [isOpenStock, setIsOpenStock] = useState(false);

//   const [isFullReturnOpen, setIsFullReturnOpen] = useState(false);

//   const [updateActivity, { isLoading }] =
//     usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation();
//   const { data: activityATRData } =
//     useGetApiV1QaAnalyticalTestsActivityStepByActivityStepIdQuery({
//       activityStepId: item.id as string,
//     });

//   const [fullMaterialReturn, { isLoading: isReturning }] =
//     usePostApiV1ProductionScheduleReturnBeforeProductionMutation();
//   const onComplete = async (status: ProductionStatus) => {
//     try {
//       await updateActivity({
//         productionStepId: item.id as string,
//         status,
//       }).unwrap();
//       toast.success("Activity completed successfully");
//       dispatch(commonActions.setTriggerReload());
//     } catch (error) {
//       toast.error(isErrorResponse(error as ErrorResponse)?.description);
//     }
//   };

//   const onFinalPacking = (id: string) => {
//     router.push(routes.viewFinalPacking(id));
//   };
//   const onExtraPacking = (id: string) => {
//     router.push(
//       routes.viewExtraPacking(id, productId as string, scheduleId as string),
//     );
//   };

//   const onDispatch = (id: string) => {
//     console.log("first", id);
//   };

//   const onFullReturn = async (reason: string) => {
//     try {
//       await fullMaterialReturn({
//         productId,
//         productionScheduleId: scheduleId,
//         reason,
//       }).unwrap();

//       toast.success("Material returned successfully");
//       dispatch(commonActions.setTriggerReload());
//       setIsFullReturnOpen(false);
//       router.push(routes.productionSchedules());
//     } catch (error) {
//       ThrowErrorMessage(error);
//     }
//   };

//   return (
//     <div className="relative">
//       <div
//         className={cn(
//           "max-w-4xl rounded-2xl bg-white p-4 shadow transition-opacity relative",
//           className,
//         )}
//       >
//         <div className=" ">
//           <span className=" rounded-full  h-6 w-6 bg-white ring-2  ring-lime-300 absolute -top-3 left-0 flex items-center justify-center">
//             {item.order}
//           </span>
//         </div>
//         <h3 className="mb-1 flex items-center justify-between text-lg font-semibold text-neutral-dark">
//           {item.title}

//           <span className="me-2 ms-3 rounded-2xl bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
//             {splitWords(ActivityStepStatus[item.status as ActivityStepStatus])}
//           </span>
//         </h3>

//         <p className="mb-4 text-sm font-normal text-neutral-default">
//           {item.description}{" "}
//         </p>
//         <div className="flex items-center justify-between gap-4">
//           <div className="space-y-2">
//             <Label className="text-base font-semibold text-neutral-secondary">
//               {item.imagesLabel}
//             </Label>
//             {item.images && (
//               <AvatarStack
//                 fallbackClass={cn("bg-neutral-input text-neutral-dark")}
//                 avatars={item.images?.map((item) => ({
//                   name: getInitials(item?.name),
//                   fullname: item?.name,
//                   url: item?.url,
//                 }))}
//               />
//             )}
//           </div>
//           {item.extra}

//           <div className="flex items-center gap-2 justify-end">
//             <Link
//               href={`${routes.viewDetails(
//                 activityId as string,
//                 item?.id as string,
//               )}?scheduleId=${scheduleId}&productId=${productId}`}
//             >
//               <Button variant="secondary" className="text-sm font-semibold">
//                 View Details
//               </Button>
//             </Link>

//             {inProgress && !activityATRData && (
//               <Button onClick={() => onComplete(ActivityStepStatus.InProgress)}>
//                 {isLoading ? (
//                   <Icon name="LoaderCircle" className="animate-spin" />
//                 ) : (
//                   splitWords(ActivityStepStatus[ActivityStepStatus.InProgress])
//                 )}
//               </Button>
//             )}
//             {isComplete && !activityATRData && (
//               <Button onClick={() => onComplete(ActivityStepStatus.Completed)}>
//                 {isLoading ? (
//                   <Icon name="LoaderCircle" className="animate-spin" />
//                 ) : (
//                   ActivityStepStatus[ActivityStepStatus.Completed]
//                 )}
//               </Button>
//             )}
//             {showFinalPacking && (
//               <Button onClick={() => onFinalPacking(activityId as string)}>
//                 <Icon name="Navigation" />
//                 <span>Final Packing</span>
//               </Button>
//             )}
//             {showExtraPackging && (
//               <Button onClick={() => onExtraPacking(activityId as string)}>
//                 <Icon name="Navigation" />
//                 <span>Extra Packing Request</span>
//               </Button>
//             )}

//             {showFullReturn && (
//               <Button onClick={() => setIsFullReturnOpen(true)}>
//                 <Icon name="Navigation" />
//                 <span>Full Return</span>
//               </Button>
//             )}

//             {showStockRequisition && (
//               <Button onClick={() => setIsOpenStock(true)}>
//                 <Icon name="Navigation" />
//                 <span>Stock Requisition</span>
//               </Button>
//             )}
//             {showBmrAndBprRequisition && (
//               <div>
//                 <BMRStatus
//                   status={bmrStatus as ProductBMRStatus}
//                   title="BMR & BPR"
//                 />
//               </div>
//             )}
//             {showDispatch && (
//               <Button onClick={() => onDispatch(item?.id as string)}>
//                 <Icon name="Navigation" />
//                 <span>Dispatch</span>
//               </Button>
//             )}
//           </div>
//           {showAtr && (
//             <AnalyticalTestRequest
//               scheduleId={scheduleId as string}
//               productId={productId as string}
//               productionActivityStepId={item?.id as string}
//             />
//           )}
//           {showFinishedGoods && (
//             <FinishedGoodsTransfer
//               scheduleId={scheduleId as string}
//               productId={productId as string}
//               productionActivityStepId={item?.id as string}
//             />
//           )}
//         </div>
//         {isFullReturnOpen && (
//           <ReasonDialog
//             isLoading={isReturning}
//             onConfirm={(reason) => onFullReturn(reason)}
//             open={isFullReturnOpen}
//             onClose={() => setIsFullReturnOpen(false)}
//             title="Full Materials Return"
//             description="Please provide a reason for this action."
//             confirmText="Return"
//             textareaPlaceholder="Type your reason here..."
//           />
//         )}
//         {isOpenStock && (
//           <Stock
//             lists={stockLists ?? []}
//             onClose={() => setIsOpenStock(false)}
//             isOpen={isOpenStock}
//             notEdittable
//             productId={productId}
//             productionScheduleId={scheduleId}
//             productionActivityStepId={item?.id as string}
//           />
//         )}
//         {isPendingExtraPacking && (
//           <div className="pt-2  w-full">
//             <Alert variant={"warning"}>
//               <TriangleAlertIcon className="h-4 w-4" />
//               <AlertTitle>Heads up!</AlertTitle>
//               <AlertDescription>
//                 Extra packing request is pending for approval
//               </AlertDescription>
//             </Alert>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// //ProductBMRStatus
// export default TimelineCard;

// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import FinishedGoodsTransfer from "@/components/pages/production/activities/finished-goods-note";
import {
  ActivityStepStatus,
  ErrorResponse,
  ProductBMRStatus,
  RequisitionStatus,
  cn,
  getInitials,
  isErrorResponse,
  routes,
  splitWords,
} from "@/lib";
import {
  ProductionScheduleProductDtoRead,
  ProductionStatus,
  useGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleStockRequisitionRawByProductionScheduleIdAndProductIdQuery,
  useGetApiV1QaAnalyticalTestsActivityStepByActivityStepIdQuery,
  usePostApiV1ProductionScheduleReturnBeforeProductionMutation,
  usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import { AvatarStack } from "../avatar-stack";
import { Button } from "../button";
import { Icon } from "../icon";
import { Label } from "../label";
import { TimelineItemProps } from "./type";
import Link from "next/link";
import { TriangleAlertIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../alert";
import AnalyticalTestRequest from "@/shared/atr";
import ThrowErrorMessage from "@/lib/throw-error";
import { ReasonDialog } from "../reason-dialog";
import BMRStatus from "./bmr-status";
import Stock from "@/components/pages/production/schedule/details/products/stock";
import { MaterialRequestDto } from "@/components/pages/production/schedule/details/products/type";
import TableBadge from "@/shared/datatable/badge";

interface Props {
  stockLists?: MaterialRequestDto[];
  item: TimelineItemProps;
  className?: string;
  isComplete?: boolean;
  inProgress?: boolean;
  showFinalPacking?: boolean;
  showFinishedGoods?: boolean;
  showExtraPackging?: boolean;
  isPendingExtraPacking?: boolean;
  showAtr?: boolean;
  showFullReturn?: boolean;
  showStockRequisition?: boolean;
  showBmrAndBprRequisition?: boolean;
  showDispatch?: boolean;
  activityId?: string;
  productId?: string;
  scheduleId?: string;
  bmrStatus?: ProductBMRStatus;
  productInfo?: ProductionScheduleProductDtoRead;
}

const TimelineCard = ({
  item,
  className,
  isComplete,
  inProgress,
  showFinishedGoods,
  showFinalPacking,
  activityId,
  scheduleId,
  productId,
  showExtraPackging,
  isPendingExtraPacking,
  showAtr,
  showFullReturn,
  showStockRequisition,
  showBmrAndBprRequisition,
  showDispatch,
  bmrStatus,
  stockLists,
  productInfo,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isOpenStock, setIsOpenStock] = useState(false);
  const [isFullReturnOpen, setIsFullReturnOpen] = useState(false);

  const [updateActivity, { isLoading }] =
    usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation();

  // Only fetch ATR data when showAtr is true
  const { data: activityATRData } =
    useGetApiV1QaAnalyticalTestsActivityStepByActivityStepIdQuery(
      {
        activityStepId: item.id as string,
      },
      {
        skip: !showAtr || productInfo?.cancelled,
      },
    );

  const { data: stockPackageReq } =
    useGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery(
      {
        productionScheduleId: scheduleId as string,
        productId: productId as string,
      },
      {
        skip: !showStockRequisition || productInfo?.cancelled,
      },
    );
  const { data: stockRawReq } =
    useGetApiV1ProductionScheduleStockRequisitionRawByProductionScheduleIdAndProductIdQuery(
      {
        productionScheduleId: scheduleId as string,
        productId: productId as string,
      },
      {
        skip: !showStockRequisition || productInfo?.cancelled,
      },
    );
  const [fullMaterialReturn, { isLoading: isReturning }] =
    usePostApiV1ProductionScheduleReturnBeforeProductionMutation();

  const onComplete = async (status: ProductionStatus) => {
    if (productInfo?.cancelled) return;
    try {
      await updateActivity({
        productionStepId: item.id as string,
        status,
      }).unwrap();
      toast.success("Activity completed successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const onFinalPacking = (id: string) => {
    if (productInfo?.cancelled) return;
    router.push(routes.viewFinalPacking(id));
  };

  const onExtraPacking = (id: string) => {
    if (productInfo?.cancelled) return;
    router.push(
      routes.viewExtraPacking(id, productId as string, scheduleId as string),
    );
  };

  const onDispatch = (id: string) => {
    if (productInfo?.cancelled) return;
    console.log("first", id);
  };

  const onFullReturn = async (reason: string) => {
    if (productInfo?.cancelled) return;
    try {
      await fullMaterialReturn({
        productId,
        productionScheduleId: scheduleId,
        reason,
      }).unwrap();

      toast.success("Material returned successfully");
      dispatch(commonActions.setTriggerReload());
      setIsFullReturnOpen(false);
      router.push(routes.productionSchedules());
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "max-w-4xl rounded-2xl bg-white p-4 shadow transition-opacity relative",
          className,
        )}
      >
        <div className=" ">
          <span className=" rounded-full  h-6 w-6 bg-white ring-2  ring-lime-300 absolute -top-3 left-0 flex items-center justify-center">
            {item.order}
          </span>
        </div>
        <h3 className="mb-1 flex items-center justify-between text-lg font-semibold text-neutral-dark">
          {item.title}
          {productInfo?.cancelled && (
            <span className="rounded-2xl bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
              Cancelled
            </span>
          )}
          <span className="me-2 ms-3 rounded-2xl bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
            {splitWords(ActivityStepStatus[item.status as ActivityStepStatus])}
          </span>
        </h3>

        <p className="mb-4 text-sm font-normal text-neutral-default">
          {item.description}{" "}
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold text-neutral-secondary">
              {item.imagesLabel}
            </Label>
            {item.images && (
              <AvatarStack
                fallbackClass={cn("bg-neutral-input text-neutral-dark")}
                avatars={item.images?.map((item) => ({
                  name: getInitials(item?.name),
                  fullname: item?.name,
                  url: item?.url,
                }))}
              />
            )}
          </div>
          {item.extra}

          <div className="flex items-center gap-2 justify-end">
            <Link
              href={`${routes.viewDetails(
                activityId as string,
                item?.id as string,
              )}?scheduleId=${scheduleId}&productId=${productId}`}
            >
              <Button variant="secondary" className="text-sm font-semibold">
                View Details
              </Button>
            </Link>

            {inProgress && !activityATRData && !productInfo?.cancelled && (
              <Button onClick={() => onComplete(ActivityStepStatus.InProgress)}>
                {isLoading ? (
                  <Icon name="LoaderCircle" className="animate-spin" />
                ) : (
                  splitWords(ActivityStepStatus[ActivityStepStatus.InProgress])
                )}
              </Button>
            )}
            {isComplete && !activityATRData && !productInfo?.cancelled && (
              <Button onClick={() => onComplete(ActivityStepStatus.Completed)}>
                {isLoading ? (
                  <Icon name="LoaderCircle" className="animate-spin" />
                ) : (
                  ActivityStepStatus[ActivityStepStatus.Completed]
                )}
              </Button>
            )}
            {showFinalPacking && !productInfo?.cancelled && (
              <Button onClick={() => onFinalPacking(activityId as string)}>
                <Icon name="Navigation" />
                <span>Final Packing</span>
              </Button>
            )}
            {showExtraPackging && !productInfo?.cancelled && (
              <Button onClick={() => onExtraPacking(activityId as string)}>
                <Icon name="Navigation" />
                <span>Extra Packing Request</span>
              </Button>
            )}

            {showFullReturn && !productInfo?.cancelled && (
              <Button onClick={() => setIsFullReturnOpen(true)}>
                <Icon name="Navigation" />
                <span>Full Return</span>
              </Button>
            )}

            {showStockRequisition && (
              <div>
                {stockPackageReq || stockRawReq ? (
                  <div>
                    <div className="flex flex-col">
                      <span>Packing Material Requisition:</span>
                      <TableBadge
                        status={stockPackageReq?.status as RequisitionStatus}
                        statusEnum={RequisitionStatus}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>Raw Material Requisition:</span>
                      <TableBadge
                        status={stockRawReq?.status as RequisitionStatus}
                        statusEnum={RequisitionStatus}
                      />
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => setIsOpenStock(true)}>
                    <Icon name="Navigation" />
                    <span>Stock Requisition</span>
                  </Button>
                )}
              </div>
            )}
            {showBmrAndBprRequisition && (
              <div>
                <BMRStatus
                  status={bmrStatus as ProductBMRStatus}
                  title="BMR & BPR"
                />
              </div>
            )}
            {showDispatch && (
              <Button onClick={() => onDispatch(item?.id as string)}>
                <Icon name="Navigation" />
                <span>Dispatch</span>
              </Button>
            )}
          </div>
          {showAtr && !productInfo?.cancelled && (
            <AnalyticalTestRequest
              scheduleId={scheduleId as string}
              productId={productId as string}
              productionActivityStepId={item?.id as string}
            />
          )}
          {showFinishedGoods && !productInfo?.cancelled && (
            <FinishedGoodsTransfer
              scheduleId={scheduleId as string}
              productId={productId as string}
              productionActivityStepId={item?.id as string}
            />
          )}
        </div>
        {isFullReturnOpen && !productInfo?.cancelled && (
          <ReasonDialog
            isLoading={isReturning}
            onConfirm={(reason) => onFullReturn(reason)}
            open={isFullReturnOpen}
            onClose={() => setIsFullReturnOpen(false)}
            title="Full Materials Return"
            description="Please provide a reason for this action."
            confirmText="Return"
            textareaPlaceholder="Type your reason here..."
          />
        )}
        {isOpenStock && !productInfo?.cancelled && (
          <Stock
            lists={stockLists ?? []}
            onClose={() => setIsOpenStock(false)}
            isOpen={isOpenStock}
            notEdittable
            productId={productId}
            productionScheduleId={scheduleId}
            productionActivityStepId={item?.id as string}
          />
        )}
        {isPendingExtraPacking && !productInfo?.cancelled && (
          <div className="pt-2  w-full">
            <Alert variant={"warning"}>
              <TriangleAlertIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Extra packing request is pending for approval
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
