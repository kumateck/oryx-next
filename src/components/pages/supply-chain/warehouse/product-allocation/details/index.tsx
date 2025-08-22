"use client";
import {
  Icon,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui";
import { useGetApiV1ProductionScheduleAllocateProductsByAllocatedProductIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
// import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import { column } from "./columns";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { format } from "date-fns";
import PageWrapper from "@/components/layout/wrapper";

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const productid = id as string;

  const { data, isLoading } =
    useGetApiV1ProductionScheduleAllocateProductsByAllocatedProductIdQuery({
      allocatedProductId: productid,
    });

  console.log(data);

  return (
    <PageWrapper>
      <ScrollableWrapper className="space-y-4">
        <div
          className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
          onClick={() => router.back()}
        >
          <Icon name="ArrowLeft" className="size-4" />
          <span>Approved Product</span>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <span
              className={`px-2 rounded-xl w-fit text-center py-1 ${data?.approved ? "bg-green-100 text-green-800" : "bg-gray-400 text-white"}`}
            >
              {data?.approved ? "Approved" : "Pending"}
            </span>
            <CardTitle className="text-lg font-semibold">
              {data?.productionOrder?.code}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full md:grid-cols-3 gap-3 grid-cols-1">
              <div className=" w-full flex items-center gap-2">
                <span>Created On:</span>
                <span className="font-semibold whitespace-nowrap">
                  {data?.createdAt &&
                    format(new Date(data.createdAt), "MMMM dd, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Delivered On:</span>
                <span className="font-semibold whitespace-nowrap">
                  {data?.deliveredAt &&
                    format(new Date(data.deliveredAt), "MMMM dd, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Total Products:</span>
                <span className="font-semibold whitespace-nowrap">
                  {data?.products?.length ?? 0}
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
              <div className="flex items-center gap-2">
                <span>Customer Name:</span>
                <span className="font-semibold whitespace-nowrap">
                  {data?.productionOrder?.customer?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Created By:</span>
                <span className="font-semibold whitespace-nowrap">
                  {data?.createdBy
                    ? `${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`
                    : "Not Available"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Total Value:</span>
                <span className="font-semibold whitespace-nowrap">
                  {data?.productionOrder?.totalValue}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <ListsTable
              data={data?.productionOrder?.products ?? []}
              columns={column}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </ScrollableWrapper>
    </PageWrapper>
  );
}

export default Page;
