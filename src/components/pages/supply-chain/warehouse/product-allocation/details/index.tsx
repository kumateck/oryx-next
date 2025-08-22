"use client";
import { Icon } from "@/components/ui";
import { useGetApiV1ProductionScheduleAllocateProductsByAllocatedProductIdQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
// import PageTitle from "@/shared/title";
import { useParams, useRouter } from "next/navigation";
import { column } from "./columns";
import ScrollableWrapper from "@/shared/scroll-wrapper";

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const productid = id as string;

  const { data: approvedProductDetails, isLoading } =
    useGetApiV1ProductionScheduleAllocateProductsByAllocatedProductIdQuery({
      allocatedProductId: productid,
    });

  console.log(approvedProductDetails);

  return (
    <ScrollableWrapper className="space-y-4">
      <div
        className="cursor-pointer text-sm hover:underline duration-300 transition-all flex items-center gap-2"
        onClick={() => router.back()}
      >
        <Icon name="ArrowLeft" className="size-4" />
        <span>Approved Product</span>
      </div>
      <ListsTable data={[]} columns={column} isLoading={isLoading} />
    </ScrollableWrapper>
  );
}

export default Page;
