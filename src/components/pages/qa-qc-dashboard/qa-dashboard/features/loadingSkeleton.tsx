import { Card, CardHeader, CardContent, Skeleton } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";

export function QaDashboardSkeleton() {
  return (
    <ScrollablePageWrapper className="space-y-4">
      {/* Header */}
      <div className="flex w-full items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" /> {/* Page Title */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" /> {/* Refresh Icon */}
            <Skeleton className="h-4 w-32" /> {/* Text */}
          </div>
        </div>

        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-md" />
          ))}
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex w-full justify-between items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-16" />
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Stats Cards */}
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex w-full justify-between items-center gap-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollablePageWrapper>
  );
}
