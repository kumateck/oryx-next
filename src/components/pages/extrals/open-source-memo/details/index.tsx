import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Icon,
  CardFooter,
} from "@/components/ui";
import { useGetApiV1ProcurementInventoryMemoByIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
// import { useGetApiV1ProcurementInventoryMarketVendorsQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useRouter, useParams } from "next/navigation";
import { columns } from "./columns";
import ItemsDetailsSkeleton from "./loadingSkeleton";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetApiV1ProcurementInventoryMemoByIdQuery({
    id: id as string,
  });

  if (isLoading) return <ItemsDetailsSkeleton />;

  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="flex items-center gap-1">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <PageTitle title="Vendor Memo" />
      </div>
      {data && (
        <>
          {" "}
          <Card>
            <CardHeader>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-lg ${data.paid ? "text-green-500" : "text-gray-500"}`}
              >
                {data.paid ? "Paid" : "Pending"}
              </span>
              <CardTitle className="text-lg font-semibold">
                {data?.code}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <span>Total Value:</span>
                  <span className="font-semibold">{data?.totalValue}</span>
                </div>
                <div>
                  <span>Vendor:</span>
                  <span className="font-semibold">N/A</span>
                </div>
                <div>
                  <span>Category:</span>
                  <span className="font-semibold">
                    {data?.paid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Purchase Requisitions Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ListsTable data={data?.items || []} columns={columns} />
            </CardContent>
            <CardFooter>
              <div className="flex justify-between">
                <span className="font-semibold">Total Value:</span>
                <span>{data?.totalValue || 0}</span>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </ScrollablePageWrapper>
  );
}
