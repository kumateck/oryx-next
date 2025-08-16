import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";

function ItemsDetailsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-6 w-full col-span-1" />
            <Skeleton className="h-6 w-full col-span-1" />
            <Skeleton className="h-6 w-full col-span-2" />
          </div>
        </CardContent>
      </Card>

      {/* Attachments Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold uppercase">
            Attachments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image placeholders */}
          <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2 grid-cols-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full min-h-40 md:min-h-48 h-full rounded-lg"
              />
            ))}
          </div>

          {/* Document placeholders */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-2 grid-cols-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border px-4 py-4"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col w-full space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ItemsDetailsSkeleton;
