"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
  LucideIconProps,
} from "@/components/ui";
import {
  MaterialReturnNotePartialReturnDto,
  MaterialReturnStatus,
  useLazyGetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { convertToLargestUnit, sanitizeNumber, Units } from "@/lib";

import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { ListsTable } from "@/shared/datatable";
import { columns } from "./columns";
import MaterialReturnsDetailsSkeleton from "./skeleton";

function MaterialReturnsDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadData, { data, isFetching, isLoading }] =
    useLazyGetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdQuery();

  useEffect(() => {
    loadData({ materialReturnNoteId: id }).unwrap();

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
  }, [id, triggerReload, loadData, dispatch]);

  // Process material return data
  const materialReturnData =
    data?.isFullReturn && data?.fullReturns
      ? data.fullReturns.map((item) => ({
          material: item.materialBatchReservedQuantity?.materialBatch?.material,
          quantity: sanitizeNumber(
            item.materialBatchReservedQuantity?.quantity,
          ),
          uoM: item.materialBatchReservedQuantity?.materialBatch?.uoM,
        }))
      : (data?.partialReturns ?? []);

  // Calculate summary statistics
  const totalItems = materialReturnData.length;
  const returnedItems = materialReturnData.filter((item) =>
    "returned" in item ? item.returned : false,
  ).length;
  const pendingItems = totalItems - returnedItems;

  // Get status badge styling
  const getStatusBadge = (status: MaterialReturnStatus) => {
    const statusMap = {
      0: { label: "Draft", className: "bg-gray-100 text-gray-800" },
      1: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      2: { label: "Approved", className: "bg-green-100 text-green-800" },
      3: { label: "Rejected", className: "bg-red-100 text-red-800" },
    };
    return statusMap[status] || statusMap[0];
  };

  const statusBadge = getStatusBadge(data?.status as MaterialReturnStatus);

  if (isLoading || isFetching) {
    return <MaterialReturnsDetailsSkeleton />;
  }

  return (
    <ScrollablePageWrapper>
      {/* Back Navigation */}
      <div
        className="group mb-6 flex items-center gap-2 cursor-pointer w-fit"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="h-5 w-5" />
        <div className="group-hover:underline">
          <PageTitle title="Material Returns Note" />
        </div>
      </div>

      {/* Main Header Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {data?.product?.name ?? "—"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Product Code: {data?.product?.code ?? "—"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
            >
              {statusBadge.label}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <InfoCard
              icon="Calendar"
              label="Return Date"
              value={
                data?.returnDate
                  ? format(new Date(data.returnDate), "MMM dd, yyyy")
                  : "-"
              }
            />
            <InfoCard
              icon="Building"
              label="Return Department"
              value={data?.createdBy?.department?.name}
            />
            <InfoCard
              icon="FileText"
              label="Production Schedule"
              value={data?.productionSchedule?.code}
            />
            <InfoCard
              icon="Hash"
              label="Batch Number"
              value={data?.batchNumber}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Package" className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon name="CircleCheck" className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Returned</p>
                <p className="text-xl font-bold">{returnedItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Icon name="Clock" className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold">{pendingItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Return Type Indicator */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Icon
              name={data?.isFullReturn ? "RotateCcw" : "ArrowUpRight"}
              className="h-5 w-5 text-blue-600"
            />
            <div>
              <span className="font-medium">
                {data?.isFullReturn ? "Full Return" : "Partial Return"}
              </span>
              <p className="text-sm text-gray-600">
                {data?.isFullReturn
                  ? "All materials from this batch are being returned"
                  : "Selected materials from this batch are being returned"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Returns List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Material Return List</h3>
              <CardDescription>
                Enter received quantity and assign material location before
                approval
              </CardDescription>
            </div>
            {data?.batchNumber && (
              <div className="text-sm text-gray-600">
                Batch: <span className="font-medium">{data.batchNumber}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {totalItems === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Icon
                name="Package"
                className="h-12 w-12 mx-auto mb-3 opacity-50"
              />
              <p>No materials to return</p>
            </div>
          ) : (
            <ListsTable
              data={materialReturnData as MaterialReturnNotePartialReturnDto[]}
              columns={columns(data?.status as MaterialReturnStatus)}
              isLoading={isFetching}
            />
          )}
        </CardContent>
      </Card>

      {/* Additional Details for Partial Returns */}
      {!data?.isFullReturn &&
        data?.partialReturns &&
        data.partialReturns.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Material Batch Details</h3>
              <CardDescription>
                Additional information about the material batches being returned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materialReturnData?.map((item, index) => {
                  const returnQty = convertToLargestUnit(
                    sanitizeNumber(item.quantity),
                    item.uoM?.symbol as Units,
                  );
                  const batchTotal = convertToLargestUnit(
                    sanitizeNumber(item.materialBatch?.totalQuantity),
                    item.materialBatch?.uoM?.symbol as Units,
                  );
                  const remaining = convertToLargestUnit(
                    sanitizeNumber(item.materialBatch?.remainingQuantity),
                    item.materialBatch?.uoM?.symbol as Units,
                  );

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.material?.name}</h4>
                        <span className="text-sm text-gray-500">
                          Code: {item.material?.code}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <DetailItem
                          label="Return Quantity"
                          value={`${returnQty.value} ${returnQty.unit}`}
                        />
                        <DetailItem
                          label="Batch Total"
                          value={`${batchTotal.value} ${batchTotal.unit}`}
                        />
                        <DetailItem
                          label="Remaining"
                          value={`${remaining.value} ${remaining.unit}`}
                        />
                        <DetailItem
                          label="Destination"
                          value={item.destinationWarehouse?.name}
                        />
                      </div>

                      {item.materialBatch?.expiryDate && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <DetailItem
                              label="Expiry Date"
                              value={format(
                                new Date(item.materialBatch.expiryDate),
                                "MMM dd, yyyy",
                              )}
                            />
                            <DetailItem
                              label="Manufacturing Date"
                              value={
                                item.materialBatch?.manufacturingDate
                                  ? format(
                                      new Date(
                                        item.materialBatch.manufacturingDate,
                                      ),
                                      "MMM dd, yyyy",
                                    )
                                  : "-"
                              }
                            />
                            <DetailItem
                              label="Date Received"
                              value={
                                item.materialBatch?.dateReceived
                                  ? format(
                                      new Date(item.materialBatch.dateReceived),
                                      "MMM dd, yyyy",
                                    )
                                  : "-"
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Additional Details for Full Returns */}
      {data?.isFullReturn &&
        data?.fullReturns &&
        data.fullReturns.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Material Batch Details</h3>
              <CardDescription>
                Complete information about all material batches being returned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.fullReturns.map((item, index) => {
                  const uomSymbol = item.materialBatchReservedQuantity
                    ?.materialBatch?.uoM?.symbol as Units;

                  const returnQty = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.quantity,
                    ),
                    uomSymbol,
                  );
                  const batchTotal = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.totalQuantity,
                    ),
                    uomSymbol,
                  );
                  const remaining = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.remainingQuantity,
                    ),
                    uomSymbol,
                  );
                  const assigned = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.quantityAssigned,
                    ),
                    uomSymbol,
                  );
                  const unassigned = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.quantityUnassigned,
                    ),
                    uomSymbol,
                  );
                  const consumed = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.consumedQuantity,
                    ),
                    uomSymbol,
                  );
                  const sampled = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.sampledQuantity,
                    ),
                    uomSymbol,
                  );
                  const quantityPerContainer = convertToLargestUnit(
                    sanitizeNumber(
                      item.materialBatchReservedQuantity?.materialBatch
                        ?.quantityPerContainer,
                    ),
                    uomSymbol,
                  );

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">
                          {item.materialBatchReservedQuantity?.materialBatch
                            ?.material?.name ??
                            `Material Batch ${item.materialBatchReservedQuantity?.materialBatch?.batchNumber || index + 1}`}
                        </h4>
                        <span className="text-sm text-gray-500">
                          Code:{" "}
                          {item.materialBatchReservedQuantity?.materialBatch
                            ?.material?.code ??
                            item.materialBatchReservedQuantity?.materialBatch
                              ?.batchNumber ??
                            "—"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <DetailItem
                          label="Return Quantity"
                          value={`${returnQty.value} ${returnQty.unit}`}
                        />
                        <DetailItem
                          label="Batch Total"
                          value={`${batchTotal.value} ${batchTotal.unit}`}
                        />
                        <DetailItem
                          label="Remaining"
                          value={`${remaining.value} ${remaining.unit}`}
                        />
                        <DetailItem
                          label="Destination"
                          value={item.destinationWarehouse?.name}
                        />
                      </div>

                      {/* Container Information */}
                      {item.materialBatchReservedQuantity?.materialBatch
                        ?.numberOfContainers && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <DetailItem
                              label="Containers"
                              value={
                                item.materialBatchReservedQuantity.materialBatch
                                  .numberOfContainers
                              }
                            />
                            <DetailItem
                              label="Quantity per Container"
                              value={`${quantityPerContainer.value} ${quantityPerContainer.unit}`}
                            />
                            <DetailItem
                              label="Source Warehouse"
                              value={
                                item.materialBatchReservedQuantity?.warehouse
                                  ?.name
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* Date Information */}
                      {(item.materialBatchReservedQuantity?.materialBatch
                        ?.expiryDate ||
                        item.materialBatchReservedQuantity?.materialBatch
                          ?.manufacturingDate ||
                        item.materialBatchReservedQuantity?.materialBatch
                          ?.dateReceived) && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            {item.materialBatchReservedQuantity?.materialBatch
                              ?.expiryDate && (
                              <DetailItem
                                label="Expiry Date"
                                value={format(
                                  new Date(
                                    item.materialBatchReservedQuantity.materialBatch.expiryDate,
                                  ),
                                  "MMM dd, yyyy",
                                )}
                              />
                            )}
                            {item.materialBatchReservedQuantity?.materialBatch
                              ?.manufacturingDate && (
                              <DetailItem
                                label="Manufacturing Date"
                                value={format(
                                  new Date(
                                    item.materialBatchReservedQuantity.materialBatch.manufacturingDate,
                                  ),
                                  "MMM dd, yyyy",
                                )}
                              />
                            )}
                            {item.materialBatchReservedQuantity?.materialBatch
                              ?.dateReceived && (
                              <DetailItem
                                label="Date Received"
                                value={format(
                                  new Date(
                                    item.materialBatchReservedQuantity.materialBatch.dateReceived,
                                  ),
                                  "MMM dd, yyyy",
                                )}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Batch Status and Quantities */}
                      <div className="mt-3 pt-3 border-t">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <DetailItem
                            label="Assigned Quantity"
                            value={`${assigned.value} ${assigned.unit}`}
                          />
                          <DetailItem
                            label="Unassigned Quantity"
                            value={`${unassigned.value} ${unassigned.unit}`}
                          />
                          <DetailItem
                            label="Consumed Quantity"
                            value={`${consumed.value} ${consumed.unit}`}
                          />
                          <DetailItem
                            label="Sampled Quantity"
                            value={`${sampled.value} ${sampled.unit}`}
                          />
                        </div>
                      </div>

                      {/* Return Status Indicator */}
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon
                            name={item.returned ? "CircleCheck" : "Clock"}
                            className={`h-4 w-4 ${item.returned ? "text-green-600" : "text-orange-600"}`}
                          />
                          <span
                            className={`text-sm font-medium ${item.returned ? "text-green-600" : "text-orange-600"}`}
                          >
                            {item.returned ? "Returned" : "Pending Return"}
                          </span>
                        </div>

                        {/* Batch Number Badge */}
                        {item.materialBatchReservedQuantity?.materialBatch
                          ?.batchNumber && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            Batch:{" "}
                            {
                              item.materialBatchReservedQuantity.materialBatch
                                .batchNumber
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
    </ScrollablePageWrapper>
  );
}

/** Reusable info card component */
function InfoCard({
  icon,
  label,
  value,
}: {
  icon: LucideIconProps;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon name={icon} className="h-4 w-4 text-gray-600" />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="font-medium">{value ?? "—"}</p>
      </div>
    </div>
  );
}

/** Detail item component for material batch details */
function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="font-medium">{value ?? "—"}</p>
    </div>
  );
}

export default MaterialReturnsDetails;
