import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@/components/ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSkeleton = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Purchase Order Final Details</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-4">
          {/* Left Side - Purchase Order Details and Table */}
          <div className="w-1/2">
            {/* Purchase Order Info Skeleton */}
            <div className="mb-5 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>

            {/* Table Skeleton */}
            <div className="space-y-3">
              {/* Table Header */}
              <div className="border border-gray-200 rounded-t-md">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="grid grid-cols-5 gap-4">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 w-18" />
                  </div>
                </div>
              </div>

              {/* Table Rows Skeleton */}
              <div className="border-x border-b border-gray-200 rounded-b-md">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="grid grid-cols-5 gap-4">
                      <Skeleton className="h-4 w-8" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-14" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form Skeleton */}
          <div className="w-1/2 space-y-6">
            {/* Form Fields Skeleton */}
            <div className="space-y-4">
              {/* Terms of Payment */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Delivery Mode */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Invoice Number */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Estimated Delivery Date */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Financial Fields Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Amount in Words */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>

            {/* Footer Buttons Skeleton */}
            <DialogFooter className="justify-end gap-4 py-6">
              <div className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 shadow-sm">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 shadow-sm">
                <Skeleton className="h-4 w-4 bg-primary-foreground/20" />
                <Skeleton className="h-4 w-8 bg-primary-foreground/20" />
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSkeleton;
