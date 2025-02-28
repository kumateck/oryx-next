import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoadingPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-neutral-quaternary" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-neutral-quaternary" />
            <Skeleton className="h-3 w-24 bg-neutral-quaternary" />
          </div>
        </div>

        <Skeleton className="h-6 w-full bg-neutral-quaternary" />
        <Skeleton className="h-6 w-5/6 bg-neutral-quaternary" />
        <Skeleton className="h-40 w-full rounded-lg bg-neutral-quaternary" />

        <div className="flex justify-around">
          <Skeleton className="h-8 w-20 rounded-md bg-neutral-quaternary" />
          <Skeleton className="h-8 w-20 rounded-md bg-neutral-quaternary" />
          <Skeleton className="h-8 w-20 rounded-md bg-neutral-quaternary" />
        </div>
      </div>
    </div>
  );
}
