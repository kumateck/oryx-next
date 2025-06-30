import { Card, CardContent, CardHeader, Skeleton } from "@/components/ui";

export const OvertimeDetailsSkeleton = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <Skeleton className="h-5 w-40 mb-4" />
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-52" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between gap-4 text-sm">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3 w-1/3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
            <div className="w-1/3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          </div>

          <div className="space-y-3 mt-10">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
