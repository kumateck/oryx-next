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
    <ScrollableWrapper className="space-y-4">
      <div
        className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="size-4" />
        <span>Approved Product</span>
      </div>
      <Card>
        <CardHeader>
          <span
            className={`px-2 rounded-xl text-center py-1 ${data?.approved ? "bg-green-100 text-green-800" : "bg-gray-400 text-white"}`}
          >
            {data?.approved ? "Approved" : "Pending"}
          </span>
          <CardTitle className="text-lg font-semibold">
            {data?.productionOrder?.code}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-col md:flex-row">
            <div className="flex items-center gap-2">
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
          <div className="flex items-center justify-between gap-3 flex-col md:flex-row">
            <div className="flex items-center gap-2">
              <span>Customer Name:</span>
              <span className="font-semibold whitespace-nowrap">
                {data?.productionOrder?.customer?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Created By:</span>
              <span className="font-semibold whitespace-nowrap">{`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}</span>
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
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <ListsTable
            data={data?.products ?? []}
            columns={column}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </ScrollableWrapper>
  );
}

export default Page;
