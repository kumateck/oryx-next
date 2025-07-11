import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/components/layout/wrapper";
import ScrollablePageWrapper from "@/shared/page-wrapper";

function ProductSpecificationSkeleton() {
  return (
    <PageWrapper>
      <div className="flex items-center gap-2 mb-4 justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>

      <Skeleton className="h-6 w-72 mb-4" />

      <ScrollablePageWrapper>
        {/* Material Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-60" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-col md:flex-row gap-6">
              {[...Array(3)].map((_, i) => (
                <div className="space-y-3" key={i}>
                  {[...Array(3)].map((_, j) => (
                    <div className="flex items-center gap-3" key={j}>
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test and Specifications */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">
              <Skeleton className="h-6 w-64" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>

            {[...Array(3)].map((_, i) => (
              <div className="grid grid-cols-4 gap-4 mb-2" key={i}>
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default ProductSpecificationSkeleton;
