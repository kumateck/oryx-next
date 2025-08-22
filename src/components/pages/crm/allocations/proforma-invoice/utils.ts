import { AllocateProductionOrderDtoRead } from "@/lib/redux/api/openapi.generated";
import { InvoiceData, InvoiceProduct } from "./type";
import { sanitizeNumber } from "@/lib";

export const extractInvoiceData = (
  data: AllocateProductionOrderDtoRead,
): InvoiceData | undefined => {
  const { productionOrder } = data;

  if (!productionOrder) return undefined;

  const extractedProducts: InvoiceProduct[] =
    productionOrder.products?.map((productOrder) => {
      const totalFulfilledQuantity =
        productOrder?.fulfilledQuantities?.reduce(
          (sum, fulfilled) => sum + sanitizeNumber(fulfilled.quantity),
          0,
        ) ?? 0;

      const price = sanitizeNumber(productOrder?.product?.price);

      return {
        id: productOrder?.product?.id ?? "",
        name: productOrder?.product?.name ?? "",
        code: productOrder?.product?.code ?? "",
        description: productOrder?.product?.description ?? "",
        price,
        fulfilledQuantity: totalFulfilledQuantity,
        totalValue: sanitizeNumber(totalFulfilledQuantity) * price,
        storageCondition: productOrder?.product?.storageCondition ?? "",
        shelfLife: productOrder?.product?.shelfLife ?? "",
        labelClaim: productOrder?.product?.labelClaim ?? null,
      };
    }) ?? [];

  const totalAmount = extractedProducts.reduce(
    (sum, product) => sum + product.totalValue,
    0,
  );

  return {
    orderCode: productionOrder.code ?? "",
    customer: {
      name: productionOrder.customer?.name ?? "",
      email: productionOrder.customer?.email ?? "",
      phone: productionOrder.customer?.phone ?? "",
      address: productionOrder.customer?.address ?? "",
    },
    products: extractedProducts,
    orderDate: productionOrder.createdAt ?? "",
    totalAmount,
    isApproved: data.approved ?? false,
  };
};
