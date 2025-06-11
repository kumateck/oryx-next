import { Skeleton } from "@/components/ui";
import React from "react";

export const LoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <Skeleton
          key={index}
          className="grid gap-1 w-full grid-cols-11 rounded-lg shadow bg-gray-100"
        >
          <div className="col-span-2">
            <Skeleton className="h-7 p-2 w-5/6 rounded-xl" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-7 p-2 w-5/6 rounded-xl" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-7 p-2 w-5/6 rounded-xl" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-7 p-2 w-5/6 rounded-xl" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-7 p-2 w-5/6 rounded-xl" />
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-end space-x-2">
              <Skeleton className="h-7 p-2 w-full rounded-xl" />
              <Skeleton className="h-7 p-2 w-full rounded-xl" />
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  );
};
