"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { useLazyGetApiV1ProductionScheduleFinishedGoodsTransferNoteByIdQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import PageWrapper from "@/components/layout/wrapper";
import LoadingSkeleton from "./Skeleton";

const FinishedGoodsTransferNoteDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const finishedGoodsTransferNoteId = id as string;
  const [loadFinishedGoodsDetails, { data, isLoading }] =
    useLazyGetApiV1ProductionScheduleFinishedGoodsTransferNoteByIdQuery();

  const router = useRouter();

  useEffect(() => {
    loadFinishedGoodsDetails({
      id: finishedGoodsTransferNoteId,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedGoodsTransferNoteId, triggerReload]);
  return (
    <PageWrapper>
      <div
        className="group mb-2 flex items-center gap-1 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title={"Finished Goods Transfer Notes"} />
        </div>
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-3">
          <Card>
            <CardContent className="space-y-4 py-2">
              <CardHeader>
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center justify-center gap-2">
                    <div>Transfer note code:</div>
                    <div className="font-medium">
                      {data?.transferNoteNumber ?? "Not Available"}
                    </div>
                  </div>
                  <div className="h-4 w-0.5 bg-gray-700"></div>
                  <div className="flex w-fit items-center justify-center gap-2">
                    <div>Date:</div>
                    <div className="font-medium">
                      {data?.createdAt
                        ? format(data.createdAt, "MMMM dd, yyyy")
                        : "-"}
                    </div>
                  </div>
                  <div className="h-4 w-0.5 bg-gray-700"></div>
                  <div className="flex w-fit items-center justify-center gap-2">
                    <div>By:</div>
                    <div className="font-medium">
                      {`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <div className="my-4 space-y-4">
                <h1 className="text-xl font-semibold">
                  {data?.batchManufacturingRecord?.product?.name ??
                    "Not Available"}
                </h1>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
                  {/* Row 1 */}
                  <div>
                    <div className="flex items-center">
                      <div>Product Name:</div>
                      <div className="font-medium">
                        {data?.batchManufacturingRecord?.product?.name ??
                          "Not Available"}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>Product Code:</div>
                      <div className="font-medium">
                        {data?.batchManufacturingRecord?.product?.code ??
                          "Not Available"}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>Batch Number:</div>
                      <div className="font-medium">
                        {data?.batchManufacturingRecord?.batchNumber ??
                          "Not Available"}
                      </div>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div>
                    <div className="flex items-center">
                      <div>Manufacturing Date:</div>
                      <div className="font-medium">
                        {data?.batchManufacturingRecord?.manufacturingDate
                          ? format(
                              data.batchManufacturingRecord.manufacturingDate,
                              "MMMM dd, yyyy",
                            )
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>Expiry Date:</div>
                      <div className="font-medium">
                        {data?.batchManufacturingRecord?.expiryDate
                          ? format(
                              data.batchManufacturingRecord.expiryDate,
                              "MMMM dd, yyyy",
                            )
                          : "Not Available"}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>Total Transfer Quntity:</div>
                      <div className="font-medium">
                        {data?.totalQuantity ?? "Not Available"}
                        {data?.uoM?.name}
                      </div>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div>
                    <div className="flex items-center">
                      <div>Quantity per pack:</div>
                      <div className="font-medium">
                        {data?.quantityPerPack ?? "Not Available"}
                        {data?.uoM?.name}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>QAR number:</div>
                      <div className="font-medium">
                        {data?.qarNumber ?? "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageWrapper>
  );
};

export default FinishedGoodsTransferNoteDetail;
