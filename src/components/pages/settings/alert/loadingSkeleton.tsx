import { Skeleton } from "@/components/ui";
import React from "react";

export const LoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="grid gap-1 w-full grid-cols-11 rounded-lg shadow px-2 py-3 bg-gray-100">
          <div className="col-span-2">
            <Skeleton className="h-5 rounded" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-5 rounded" />
          </div>
          <div className="col-span-2">
              <Skeleton className="h-5 rounded" />
          </div>
          <div className="col-span-2">
              <Skeleton className="h-5 rounded" />
          </div>
          <div className="col-span-2">
              <Skeleton className="h-5 rounded" />
          </div>
          <div className="col-span-1">
              <Skeleton className="h-5" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
};
