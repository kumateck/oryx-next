"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Button, Card, CardContent, Icon } from "@/components/ui";
// import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { formatAmount, PermissionKeys } from "@/lib";
import {
  useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  // useLazyGetApiV1ProductionScheduleByScheduleIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import PageTitle from "@/shared/title";
import { ListsTable } from "@/shared/datatable";
import { getColumns } from "./columns";
import { useUserPermissions } from "@/hooks/use-permission";

const PODetail = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const router = useRouter();
  const { id } = useParams();
  const POId = id as string;
  const [loadPO, { data, isLoading }] =
    useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery();

  useEffect(() => {
    loadPO({
      purchaseOrderId: POId,
    }).unwrap();

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [POId, triggerReload]);

  const onBack = () => {
    router.back();
  };

  // check permissions here
  const { hasPermissionAccess } = useUserPermissions();
  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon
              name="ArrowLeft"
              onClick={onBack}
              className="cursor-pointer"
            />
            <PageTitle title="Purchase Order" />
          </div>
          <div className="flex items-center gap-2">
            {hasPermissionAccess(
              PermissionKeys.procurement.reviseExistingPurchaseOrder,
            ) && (
              <Button
                variant={"default"}
                onClick={() =>
                  router.push(`/procurement/purchase-orders/${id}/revise`)
                }
              >
                <Icon name="FilePenLine" />
                <span>Revise</span>
              </Button>
            )}
            <Button variant={"success"}>
              <Icon name="Mail" />
              <span>Send Mail</span>
            </Button>
          </div>
        </div>
        {isLoading ? (
          <SkeletonLoadingPage />
        ) : (
          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="flex justify-start gap-4">
                <div className="w-full space-y-2">
                  <span className="font-Medium text-primary-500 block text-3xl">
                    {data?.code}
                  </span>
                  <div className="grid w-full grid-cols-5 gap-4 gap-y-6">
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Supplier Name
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.supplier?.name}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Profoma Invoice #
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.proFormaInvoiceNumber}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Sea Freight
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {formatAmount(Number(data?.seaFreight), {
                          currencySymbol:
                            data?.supplier?.currency?.symbol?.toString(),
                        })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Total Fob Value
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {formatAmount(Number(data?.totalFobValue), {
                          currencySymbol:
                            data?.supplier?.currency?.symbol?.toString(),
                        })}
                      </span>
                    </div>{" "}
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Insurance
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {formatAmount(Number(data?.insurance), {
                          currencySymbol:
                            data?.supplier?.currency?.symbol?.toString(),
                        })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Total CIF Value
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {formatAmount(Number(data?.totalCifValue), {
                          currencySymbol:
                            data?.supplier?.currency?.symbol?.toString(),
                        })}
                      </span>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Amount in Words
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.amountInFigures}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Payment Terms
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.termsOfPayment?.name}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Delivery Mode
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.deliveryMode?.name}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Order Date
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.createdAt
                          ? format(data?.createdAt, "MMM dd, yyyy")
                          : "-"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-sm font-normal text-neutral-secondary">
                        Expected Delivery Date
                      </span>
                      <span className="block text-sm font-normal text-neutral-dark">
                        {data?.expectedDeliveryDate
                          ? format(data?.expectedDeliveryDate, "MMM dd, yyyy")
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <ListsTable
          data={data?.items ?? []}
          columns={getColumns(data?.supplier?.currency?.symbol ?? "")}
        />
      </div>
    </ScrollablePageWrapper>
  );
};

export default PODetail;
