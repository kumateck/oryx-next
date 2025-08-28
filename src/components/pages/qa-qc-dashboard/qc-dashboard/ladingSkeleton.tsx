import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";

export default function QcDashboardSkeleton() {
  return (
    <ScrollablePageWrapper className="space-y-4">
      {/* Header */}
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex w-full justify-between items-center gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Batch Test & Approvals Cards */}
      <div className="grid gap-2 md:gap-4 grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex w-full justify-between items-center gap-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <div className="grid grid-cols-2 gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}
