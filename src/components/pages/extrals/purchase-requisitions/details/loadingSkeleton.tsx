import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PageWrapper from "@/components/layout/wrapper";

export default function PurchaseRequisitionSkeleton() {
  return (
    <PageWrapper className="space-y-6">
      <div className="w-full flex items-center justify-between">
        <div className="w-fit flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3 grid-cols-1 w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-2 text-lg">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-28" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
