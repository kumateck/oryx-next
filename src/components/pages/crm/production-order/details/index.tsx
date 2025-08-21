"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import {
  ProductionOrderDto,
  useLazyGetApiV1ProductionOrdersByIdQuery,
  useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery,
  ApprovedProductDetailDtoRead,
  FinishedGoodsTransferNoteDtoRead,
} from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "./loadingSkeleton";
import { format } from "date-fns";
import { ListsTable } from "@/shared/datatable";
import { columns } from "./columns";
import OrderAllocation from "../allocation";
export function filterApprovedFinishedGoods(
  data: ApprovedProductDetailDtoRead,
): ApprovedProductDetailDtoRead {
  return {
    ...data,
    finishedGoodsTransferNotes: data.finishedGoodsTransferNotes?.filter(
      (note: FinishedGoodsTransferNoteDtoRead) => note.isApproved === true,
    ),
  };
}
function Index() {
  const router = useRouter();
  const { id } = useParams();
  const [loadProductionOrderById, { data, isLoading }] =
    useLazyGetApiV1ProductionOrdersByIdQuery();
  const [loadApprovedProducts] =
    useLazyGetApiV1ProductionScheduleApprovedProductsProductByProductIdQuery();
  const [isOpenAllocation, setIsOpenAllocation] = useState(false);
  const [orderData, setOrderData] = useState<ProductionOrderDto>();
  // const [allocationData, setAllocationData] = useState<any>();
  useEffect(() => {
    if (id) {
      loadProductionOrderById({ id: id as string });
      handleLoadData(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLoadData = async (id: string) => {
    const order = await loadProductionOrderById({ id }).unwrap();
    setOrderData(order);
    order.products?.map(async (order) => {
      const productId = order?.product?.id as string;
      const productResponse = await loadApprovedProducts({
        productId,
      }).unwrap();
      const approvedProducts = filterApprovedFinishedGoods(
        productResponse as ApprovedProductDetailDtoRead,
      );
      console.log(approvedProducts, "productResponse");
      // const
      // const stockQuantity = productResponse.
      return {
        ...order,
        approvedProducts,
      };
    });

    // const products = await loadApprovedProducts({ id }).unwrap();
    // setAllocationData(products);
  };

  console.log(orderData);
  if (isLoading) return <LoadingSkeleton />;
  return (
    <PageWrapper className="space-y-4">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div onClick={() => router.back()}>
            <Icon name="ArrowLeft" className="h-5 w-5 cursor-pointer" />
          </div>
          <PageTitle title="Production Order Details" />
        </div>
        <div className="flex items-center ml-auto gap-2">
          <Button
            onClick={() => setIsOpenAllocation(true)}
            className="flex items-center gap-2"
          >
            <Icon name="Plus" />
            <span>Allocation</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-start gap-4 ">
            <div className="pr-2 border-r-2 border-r-gray-700">
              {data?.code}
            </div>
            <div className="pr-2 flex gap-2 items-center border-r-2 border-r-gray-700">
              <span>Created on:</span>
              <span>
                {data?.createdAt && format(data?.createdAt, "dd MMMM, yyyy")}
              </span>
            </div>
            <div className="pr-2 flex items-center gap-2">
              <span>By:</span>
              <span>{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            <CardTitle className="text-xl font-semibold">
              {data?.customer?.name}
            </CardTitle>
            <CardDescription>
              <div className="flex w-full items-center justify-between gap-2">
                <div className="space-x-1">
                  <span>Email: </span>
                  <span className="text-gray-800">{data?.customer?.email}</span>
                </div>
                <div className="space-x-1">
                  <span>Phone: </span>
                  <span className="text-gray-800">{data?.customer?.phone}</span>
                </div>
                <div className="space-x-1">
                  <span>Address: </span>
                  <span className="text-gray-800">{data?.customer?.phone}</span>
                </div>
              </div>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ListsTable data={data?.products ?? []} columns={columns} />
        </CardContent>

        {/* <PharmaceuticalInventoryForm /> */}
        {isOpenAllocation && (
          <OrderAllocation
            isOpen={isOpenAllocation}
            onClose={() => setIsOpenAllocation(false)}
            orderedProduct={data?.products ?? []}
            productionOrderId={data?.id as string}
          />
        )}
      </Card>
    </PageWrapper>
  );
}

export default Index;
