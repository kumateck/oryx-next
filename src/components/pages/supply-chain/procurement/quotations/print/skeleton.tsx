import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@/components/ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PrintPreviewSkeleton = ({ isOpen, onClose }: Props) => {
  const handleDialogChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-4xl rounded-none" noClose>
        {/* Action buttons skeleton */}
        <div className="absolute -right-36 flex flex-col gap-4">
          <div className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 shadow-sm">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 shadow-sm">
            <Skeleton className="h-4 w-10 bg-red-400" />
          </div>
        </div>

        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <article className="bg-white">
          {/* Invoice Header Skeleton */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="border-b border-gray-200"></div>
          </div>

          {/* Title and Description Skeleton */}
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-5 w-96" />
          </div>

          {/* Table Skeleton */}
          <div className="space-y-3">
            {/* Table Header */}
            <div className="border border-gray-200 rounded-t-md">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="grid grid-cols-5 gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-18" />
                  <Skeleton className="h-4 w-22" />
                </div>
              </div>
            </div>

            {/* Table Rows Skeleton */}
            <div className="border-x border-b border-gray-200 rounded-b-md">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="grid grid-cols-5 gap-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default PrintPreviewSkeleton;
