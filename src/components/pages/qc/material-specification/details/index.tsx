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
  FormResponseDto,
  useLazyGetApiV1MaterialSpecificationsByIdQuery,
} from "@/lib/redux/api/openapi.generated";

import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import MaterialSpecificationSkeleton from "./loadingSkeleton";
import FormResponseView from "@/shared/form-response-view";
import ScrollableWrapper from "@/shared/scroll-wrapper";

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
      <ScrollableWrapper className=" pb-20">
        <div className="space-y-4">
          <Card className="pb-5">
            <CardHeader>
              <CardTitle>{materialData?.material?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between flex-col md:flex-row">
                <div>
                  <div className="flex items-center justify-start gap-3">
                    <span>SPEC Number:</span>
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
          <div className="py-5">
            <PageTitle title="Form Responses" />
            <FormResponseView
              responses={
                materialData?.response?.formResponses as FormResponseDto[]
              }
            />
          </div>
        </div>
      </ScrollableWrapper>
    </PageWrapper>
  );
}

export default Page;
