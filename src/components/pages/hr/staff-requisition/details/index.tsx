"use client";
import PageWrapper from "@/components/layout/wrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  Skeleton,
} from "@/components/ui";
import { AppointmentType, AuditModules, StaffRequisitionType } from "@/lib";
import { useGetApiV1StaffRequisitionsByIdQuery } from "@/lib/redux/api/openapi.generated";
import PageTitle from "@/shared/title";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams();
  const routes = useRouter();
  const { data, isLoading } = useGetApiV1StaffRequisitionsByIdQuery({
    id: id as string,
    module: AuditModules.management.name,
    subModule: AuditModules.management.staffRequisition,
  });
  if (isLoading) {
    return <StaffRequestCardSkeleton />;
  }

  return (
    <PageWrapper className="space-y-4">
      <div
        onClick={() => routes.back()}
        className="flex hover:underline cursor-pointer w-fit mb-3 items-center justify-center"
      >
        <Icon name="ArrowLeft" />
        <span className="ml-2 text-gray-700">Staff Requisition List</span>
      </div>
      <PageTitle title="Staff Requisition" />
      <Card className="max-w-4xl">
        <CardHeader>
          <div className="flex text-sm items-center justify-start gap-2 pb-2">
            <span>
              Created on{" "}
              {data?.createdAt && format(data?.createdAt, "MMM dd, yyyy")}
            </span>
            <div className="w-px h-4 border border-gray-700" />
            <span>By {data?.department?.name} department</span>
          </div>
          <CardTitle className="mt-10">{data?.department?.code}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="space-y-1">
              <p>
                Number of staff:{" "}
                <span className="font-semibold">{data?.staffRequired}</span>
              </p>
              <p>
                Job Title:{" "}
                <span className="font-semibold">{data?.qualification}</span>
              </p>
              <p>
                Qualification:{" "}
                <span className="font-semibold">
                  {data?.educationalQualification}
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p>
                Justification for request:{" "}
                <span className="font-semibold">{data?.justification}</span>
              </p>
              <p>
                Budjet type:{" "}
                <span className="font-semibold">
                  {data?.qualification != null &&
                  data?.budgetStatus !== undefined
                    ? StaffRequisitionType[data.budgetStatus]
                    : ""}
                </span>
              </p>
              <p>
                Additional requirements:{" "}
                <span className="font-semibold">
                  {data?.additionalRequirements ?? "none"}
                </span>
              </p>
            </div>
            <div className="space-y-1">
              <p>
                Educational Qualification:
                <span className="font-semibold">
                  {data?.educationalQualification}
                </span>
              </p>
              <p>
                Appointment type:{" "}
                <span className="font-semibold">
                  {AppointmentType[data?.appointmentType as AppointmentType]}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default Page;

const StaffRequestCardSkeleton = () => {
  return (
    <div className="rounded-md border p-4 space-y-4 bg-white">
      {/* Top line */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-32" />
        <span className="text-gray-400">|</span>
        <Skeleton className="h-4 w-28" />
      </div>

      {/* SRID + Job Info */}
      <div className="space-y-1">
        <Skeleton className="h-5 w-24" /> {/* SRID */}
        <Skeleton className="h-4 w-20" /> {/* Number of staff */}
        <Skeleton className="h-4 w-64" /> {/* Job title */}
        <Skeleton className="h-4 w-48" /> {/* Qualification */}
      </div>

      {/* Grid info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-1">
            <Skeleton className="h-3 w-24" /> {/* Label */}
            <Skeleton className="h-4 w-40" /> {/* Value */}
          </div>
        ))}
      </div>
    </div>
  );
};
