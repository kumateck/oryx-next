import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Separator,
} from "@/components/ui";
import {
  AllocateProductionOrderDtoRead,
  useGetApiV1ProductionScheduleAllocateProductsByAllocatedProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { PackageIcon } from "lucide-react";
import React from "react";

interface Props {
  allocationId: string;
}
const AllocationDetails = ({ allocationId }: Props) => {
  const { data } =
    useGetApiV1ProductionScheduleAllocateProductsByAllocatedProductIdQuery({
      allocatedProductId: allocationId,
    });

  const allocatedProduct = data as AllocateProductionOrderDtoRead;

  const { productionOrder, approved } = allocatedProduct;

  return (
    <ScrollArea className="h-full w-full p-0">
      <div className="container mx-auto py-8 px-2 max-w-6xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                Production Order
                <span className="ml-2 font-mono text-lg tracking-tight text-muted-foreground">
                  {productionOrder?.code}
                </span>
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="py-6 grid md:grid-cols-3 gap-4">
            {/* Customer */}
            <div>
              <div className="font-semibold text-muted-foreground mb-1">
                Customer
              </div>
              <div className="text-lg font-medium">
                {productionOrder?.customer?.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {productionOrder?.customer?.email}
              </div>
              <div className="text-sm">{productionOrder?.customer?.phone}</div>
              <div className="text-sm">
                {productionOrder?.customer?.address}
              </div>
            </div>
            {/* Order Info */}
            <div>
              <div className="font-semibold text-muted-foreground mb-1">
                Order Details
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-semibold">Total Value: </span>
                  <span>
                    GHS{" "}
                    {productionOrder?.totalValue?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Created at: </span>
                  <span>
                    {productionOrder?.createdAt
                      ? format(productionOrder?.createdAt, "MMM dd, yyyy")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
            {/* Summary */}
            <div>
              <div className="font-semibold text-muted-foreground mb-1">
                Summary
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-semibold">Products: </span>
                  <span>
                    {productionOrder?.products?.filter((p) => p.product).length}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Status: </span>
                  <span>
                    {approved ? (
                      <span className="text-green-700">Approved</span>
                    ) : (
                      <span className="text-yellow-700">Pending</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>
          <div className="grid gap-6">
            {productionOrder?.products?.map((orderProd, idx) =>
              orderProd.product ? (
                <Card key={orderProd.product.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <PackageIcon className="w-4 h-4 text-primary" />
                      {orderProd.product.name}
                      <span className="ml-2 text-xs font-mono text-muted-foreground">
                        {orderProd.product.code}
                      </span>
                      <Badge
                        variant={orderProd.fulfilled ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {orderProd.fulfilled ? "Fulfilled" : "Pending"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="py-4 grid md:grid-cols-3 gap-4">
                    {/* Product Details */}
                    <div>
                      <div className="font-semibold text-muted-foreground mb-1">
                        Product Details
                      </div>
                      <div className="text-sm">
                        <div>
                          <span className="font-semibold">Generic: </span>
                          <span>{orderProd.product.genericName || "-"}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Storage: </span>
                          <span>
                            {orderProd.product.storageCondition || "-"}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">Category: </span>
                          <span>{orderProd.product.category?.name || "-"}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Batch Size: </span>
                          <span>
                            {orderProd.product.fullBatchSize?.toLocaleString() ||
                              "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Order Quantity & Value */}
                    <div>
                      <div className="font-semibold text-muted-foreground mb-1">
                        Order
                      </div>
                      <div className="text-sm">
                        <div>
                          <span className="font-semibold">Quantity: </span>
                          <span>
                            {orderProd?.totalOrderQuantity?.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">Value: </span>
                          <span>
                            GHS{" "}
                            {orderProd.totalValue?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold">
                            Price per unit:{" "}
                          </span>
                          <span>
                            GHS {orderProd.product.price?.toFixed(2) ?? "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Fulfillment */}
                    <div>
                      <div className="font-semibold text-muted-foreground mb-1">
                        Fulfillment
                      </div>
                      <div className="flex flex-col gap-2">
                        {orderProd?.fulfilledQuantities?.length === 0 && (
                          <span className="italic text-muted-foreground">
                            Not fulfilled yet
                          </span>
                        )}
                        {orderProd?.fulfilledQuantities?.map((fq, fidx) => (
                          <div
                            key={fidx}
                            className="border rounded p-2 flex flex-col gap-1 bg-muted"
                          >
                            <div className="pl-6 text-sm">
                              Quantity:{" "}
                              <span className="font-semibold">
                                {fq?.quantity?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card key={"null-product-" + idx} className="opacity-60">
                  <CardHeader>
                    <CardTitle className="text-lg text-muted-foreground">
                      <span className="italic">
                        Unknown product (data missing)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Order Quantity: {orderProd.totalOrderQuantity}
                    </div>
                    <div className="text-xs">No product data available.</div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AllocationDetails;
