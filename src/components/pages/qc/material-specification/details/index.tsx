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
  useLazyGetApiV1MaterialSpecificationsByIdQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MaterialSpecificationReferenceEnum, TestTypeEnum } from "../types";
import MaterialSpecificationSkeleton from "./loadingSkeleton";

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [fetchMaterialSpecification, { data: materialData, isLoading }] =
    useLazyGetApiV1MaterialSpecificationsByIdQuery({});

  useEffect(() => {
    if (id) {
      fetchMaterialSpecification({ id: id as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (isLoading) return <MaterialSpecificationSkeleton />;
  console.log("Material Data", materialData);
  return (
    <PageWrapper>
      <div className="flex items-center gap-2 mb-4 justify-between">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex p-0 items-center justify-start"
        >
          <Icon name="ArrowLeft" />
          <span>Material specification list</span>
        </Button>
        <Button
          onClick={() =>
            router.push(
              `/qc/material-specification/${materialData?.id}/edit?kind=${materialData?.material?.kind}`,
            )
          }
        >
          Edit
        </Button>
      </div>

      <PageTitle title="Material Specification Details" />
      <ScrollablePageWrapper>
        <Card>
          <CardHeader>
            <CardTitle>{materialData?.material?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-col md:flex-row">
              <div>
                <div className="flex items-center justify-start gap-3">
                  <span>SPC Number:</span>
                  <span className="font-medium">
                    {materialData?.specificationNumber}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Effective Date:</span>
                  <span className="font-medium">
                    {materialData?.effectiveDate
                      ? format(
                          new Date(materialData.effectiveDate),
                          "MMMM dd, yyyy",
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Material Code:</span>
                  <span className="font-medium">
                    {materialData?.material?.code}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-start gap-3">
                  <span>Review Date:</span>
                  <span className="font-medium">
                    {materialData?.reviewDate
                      ? format(
                          new Date(materialData.reviewDate),
                          "MMMM dd, yyyy",
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Revision Number:</span>
                  <span className="font-medium">
                    {materialData?.revisionNumber}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Shell Life:</span>
                  <span className="font-medium">
                    {materialData?.material?.pharmacopoeia}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-start gap-3">
                  <span>Supersedes:</span>
                  <span className="font-medium">
                    {materialData?.supercedesNumber}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Storage:</span>
                  <span className="font-medium">_</span>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <span>Label Claim:</span>
                  <span className="font-medium">
                    {materialData?.material?.alphabet}
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
            <div className="grid grid-cols-4 mb-2 font-medium text-gray-600">
              {["SR Number", "Test", "Specification", "Reference"].map(
                (value, index) => (
                  <div key={index + value}>{value}</div>
                ),
              )}
            </div>
            {materialData?.testSpecifications?.map((test, index) => (
              <div
                className="grid grid-cols-4 text-sm font-medium text-gray-900"
                key={index}
              >
                <div>{test?.srNumber}</div>
                <div>
                  {TestTypeEnum[test?.testName as TestType] || test?.testName}
                </div>
                <div>{test?.releaseSpecification}</div>
                <div>
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
