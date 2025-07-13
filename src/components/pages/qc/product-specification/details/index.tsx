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
import {
  TestType,
  useLazyGetApiV1ProductSpecificationsByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MaterialSpecificationReferenceEnum, TestTypeEnum } from "../types";
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
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Test and Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 mb-2 font-medium text-gray-600">
              <div className="col-span-1">SR Number</div>
              <div className="col-span-2">Test</div>
              <div className="col-span-2">Specification</div>
              <div className="col-span-1">Reference</div>
            </div>
            {productSpcData?.testSpecifications?.map((test, index) => (
              <div
                className="grid grid-cols-6 gap-3 space-y-2 text-sm font-medium text-gray-900"
                key={index}
              >
                <div className="col-span-1">{test?.srNumber}</div>
                <div className="col-span-2">
                  {TestTypeEnum[test?.testName as TestType] || test?.testName}
                </div>
                <div className="col-span-2">{test?.releaseSpecification}</div>
                <div className="col-span-1">
                  {
                    MaterialSpecificationReferenceEnum[
                      test?.reference as MaterialSpecificationReferenceEnum
                    ]
                  }
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;
