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
import { useLazyGetApiV1ProductSpecificationsByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import ProductSpecificationSkeleton from "./loadingSkeleton";

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [fetchProductSpecification, { data: productSpcData, isLoading }] =
    useLazyGetApiV1ProductSpecificationsByIdQuery({});

  useEffect(() => {
    if (id) {
      fetchProductSpecification({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (isLoading) return <ProductSpecificationSkeleton />;
  return (
    <PageWrapper>
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div
          onClick={() => router.back()}
          className="flex text-gray-700 hover:underline p-0 items-center justify-start"
        >
          <Icon name="ArrowLeft" />
          <span>Product specification list</span>
        </div>
        <Button
          onClick={() =>
            router.push(`/qc/product-specification/${productSpcData?.id}/edit`)
          }
        >
          Edit
        </Button>
      </div>

      <PageTitle title="Product Specification Details" />
      <ScrollablePageWrapper>
        <Card>
          <CardHeader>
            <CardTitle>{productSpcData?.product?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-col md:flex-row">
              <div className="space-y-2">
                <div className="flex items-center justify-start gap-3">
                  <span>SPC Number:</span>
                  <span className="font-medium">
                    {productSpcData?.specificationNumber}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Effective Date:</span>
                  <span className="font-medium">
                    {productSpcData?.effectiveDate
                      ? format(
                          new Date(productSpcData.effectiveDate),
                          "MMMM dd, yyyy",
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Product Code:</span>
                  <span className="font-medium">
                    {productSpcData?.product?.code}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-start gap-3">
                  <span>Review Date:</span>
                  <span className="font-medium">
                    {productSpcData?.reviewDate
                      ? format(
                          new Date(productSpcData.reviewDate),
                          "MMMM dd, yyyy",
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Revision Number:</span>
                  <span className="font-medium">
                    {productSpcData?.revisionNumber}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Shell Life:</span>
                  <span className="font-medium">
                    {productSpcData?.product?.shelfLife}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-start gap-3">
                  <span>Supersedes:</span>
                  <span className="font-medium">
                    {productSpcData?.supersedesNumber}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Storage:</span>
                  <span className="font-medium">
                    {productSpcData?.product?.storageCondition}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Label Claim:</span>
                  <span className="font-medium">
                    {productSpcData?.labelClaim}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;
