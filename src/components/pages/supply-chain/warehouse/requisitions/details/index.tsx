"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, PermissionKeys } from "@/lib";
import {
  useGetApiV1RequisitionByRequisitionIdQuery,
  usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { getColumns } from "./columns";
import { useUserPermissions } from "@/hooks/use-permission";
const IssueStockRequistions = () => {
  const { id } = useParams();
  const router = useRouter();
  const requisitionId = id as string;
  const { data: requisition } = useGetApiV1RequisitionByRequisitionIdQuery({
    requisitionId,
  });

  const [issueMutation, { isLoading }] =
    usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation();

  const onIssue = async () => {
    try {
      await issueMutation({
        stockRequisitionId: requisitionId,
      }).unwrap();

      toast.success("Stock Requisition issued successfully");
      router.push(`/warehouse/stock-requisition`);
    } catch (error) {
      console.error("Error loading STOCK", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  // check permissions here
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccessToRawMaterialReQuests = hasPermissionAccess(
    PermissionKeys.warehouse.issueRawMaterialRequisitions,
  );
  // check permission for packaging meterial
  const hasAccessToPackageMaterialRequests = hasPermissionAccess(
    PermissionKeys.warehouse.issuePackagingMaterialRequisitions,
  );

  return (
    <ScrollablePageWrapper>
      <div className="">
        <div className="flex items-center justify-between">
          <div
            className="group flex hover:underline items-center gap-1 hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <Icon name="ArrowLeft" className="h-5 w-5" />
            <span className="font-medium">Stock Requisitions</span>
          </div>
        </div>
        <div className="flex mb-3 items-center justify-between">
          <PageTitle title="Issue Stock Requisition Voucher" />
          {(hasAccessToRawMaterialReQuests ||
            hasAccessToPackageMaterialRequests) && (
            <Button
              onClick={onIssue}
              variant={"default"}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500"
            >
              {isLoading ? (
                <Icon name="LoaderCircle" className="animate-spin" />
              ) : (
                <Icon name="CircleCheck" className="size-4" />
              )}
              <span>Issue</span>{" "}
            </Button>
          )}
        </div>
        <Card className="mb-3">
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-lg">
                  {requisition?.code}
                </span>
                <div className="grid w-full grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Product
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {requisition?.product?.name}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Schedule
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {requisition?.productionSchedule?.code}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Request Date
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {requisition?.createdAt
                        ? format(requisition?.createdAt, "MMM d, yyyy. h:mma")
                        : ""}
                    </span>
                  </div>{" "}
                  <div className="space-y-2">
                    <span className="block text-sm font-normal text-neutral-400">
                      Justification
                    </span>
                    <span className="text-primary-500 block text-sm font-normal">
                      {requisition?.comments}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="space-y-4 p-5">
          <CardTitle>Issue Breakdown</CardTitle>
          <ClientDatatable
            columns={getColumns()}
            data={requisition?.items ?? []}
            normalTable
          />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default IssueStockRequistions;
