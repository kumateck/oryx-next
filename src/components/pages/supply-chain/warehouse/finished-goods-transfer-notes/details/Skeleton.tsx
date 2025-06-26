import { Card, CardContent, CardHeader, Skeleton } from "@/components/ui";

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-start gap-3">
            <Skeleton className="h-4 w-[150px]" />
            <div className="h-4 w-0.5 bg-gray-700" />
            <Skeleton className="h-4 w-[100px]" />
            <div className="h-4 w-0.5 bg-gray-700" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 py-4">
          <Skeleton className="h-6 w-1/3" />

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, colIndex) => (
              <div key={colIndex} className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingSkeleton;
