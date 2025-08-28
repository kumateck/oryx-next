import { Skeleton } from "@/components/ui";
import React from "react";

const SkeletonLoader = () => (
  <div className="space-y-4">
    {/* Table header skeleton */}
    <div className="grid grid-cols-4 gap-4 p-4 border-b">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-20" />
    </div>

    {/* Table rows skeleton */}
    {[...Array(4)].map((_, index) => (
      <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    ))}
  </div>
);
export default SkeletonLoader;
