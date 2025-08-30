import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollablePageWrapper from "@/shared/page-wrapper";

function MaterialReturnsDetailsSkeleton() {
  return (
    <ScrollablePageWrapper>
      {/* Back Navigation Skeleton */}
      <div className="mb-6 flex items-center gap-2 w-fit">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Main Header Card Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Skeleton className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Skeleton className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-6 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Return Type Indicator Skeleton */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Returns List Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-3 w-72" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Table Header Skeleton */}
          <div className="border rounded-lg">
            <div className="border-b p-4 bg-gray-50">
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-20" />
                ))}
              </div>
            </div>

            {/* Table Rows Skeleton */}
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div key={rowIndex} className="border-b last:border-b-0 p-4">
                <div className="grid grid-cols-5 gap-4 items-center">
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <Skeleton key={colIndex} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Material Batch Details Skeleton */}
      <Card className="mt-6">
        <CardHeader>
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-3 w-80" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  {Array.from({ length: 4 }).map((_, detailIndex) => (
                    <div key={detailIndex}>
                      <Skeleton className="h-3 w-24 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, dateIndex) => (
                      <div key={dateIndex}>
                        <Skeleton className="h-3 w-20 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Created Information Skeleton */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-48" />
          </div>
        </CardContent>
      </Card>
    </ScrollablePageWrapper>
  );
}

export default MaterialReturnsDetailsSkeleton;
