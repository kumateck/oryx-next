"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PurchaseRequisitionSkeleton from "./loadingSkeleton";
import {
  InventoryPurchaseRequisitionDto,
  useLazyGetApiV1ProcurementInventoryByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import Edit from "../edit";
import { format } from "date-fns";

function Index() {
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const [loadData, { data, isLoading: loading }] =
    useLazyGetApiV1ProcurementInventoryByIdQuery();

  useEffect(() => {
    if (id) {
      loadData({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <PurchaseRequisitionSkeleton />;
  }
  return (
    <PageWrapper className="space-y-6">
      {isEdit && (
        <Edit
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          details={data as InventoryPurchaseRequisitionDto}
        />
      )}
      <div className="w-full flex items-center justify-between">
        <div className="w-fit flex items-center gap-2">
          <Icon
            name="ArrowLeft"
            onClick={() => router.back()}
            className="h-5 w-5 text-black hover:cursor-pointer"
          />
          <PageTitle title={`Purchase Requisition Details`} />
        </div>
        <Button onClick={() => setIsEdit(true)}>Edit</Button>
      </div>
      {data ? (
        <>
          <Card>
            <CardHeader>
              <span className="text-xs bg-opacity-45 font-medium px-2 py-1 bg-gray-400 text-white w-fit rounded-full">
                Pending
              </span>
              <CardTitle className="font-bold text-gray-900">
                {data?.code}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3 grid-cols-1 w-full">
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500 whitespace-nowrap">
                    Requisition Date:
                  </span>
                  <span className="text-gray-800">
                    {data?.createdAt
                      ? format(new Date(data.createdAt), "MMMM dd, yyyy")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500 whitespace-nowrap">
                    Expected Delivery Date:
                  </span>
                  <span className="text-gray-800">
                    {data?.expectedDeliveryDate
                      ? format(
                          new Date(data.expectedDeliveryDate),
                          "MMMM dd, yyyy",
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500 whitespace-nowrap">
                    Total Order Item(s):
                  </span>
                  <span className="text-gray-800">
                    {data?.items?.length || 0}
                  </span>
                </div>
                <div className="flex gap-2 text-lg">
                  <span className="text-gray-500">Remarks:</span>
                  <span className="text-gray-800">
                    {data?.remarks || "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-gray-900">
                Purchase Requisition Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">No items found</span>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <span className="text-gray-500">
            Oops! No purchase requisition found
          </span>
        </div>
      )}
    </PageWrapper>
  );
}

export default Index;
