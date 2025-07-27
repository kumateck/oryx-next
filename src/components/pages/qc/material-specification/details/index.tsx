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
import { useLazyGetApiV1MaterialSpecificationsByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
              </div>
              <div>
                <div className="flex items-center justify-start gap-3">
                  <span>Supersedes:</span>
                  <span className="font-medium">
                    {materialData?.supersedesNumber}
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
          </CardContent>
        </Card>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;
