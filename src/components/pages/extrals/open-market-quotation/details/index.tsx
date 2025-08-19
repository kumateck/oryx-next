import { Icon } from "@/components/ui";
// import { useGetApiV1ProcurementInventoryMarketVendorsQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  // const { id } = useParams();
  // const {data,isLoading} = useGetApiV1ProcurementInventoryMarketVendorsQuery
  return (
    <ScrollablePageWrapper>
      <div className="flex items-center gap-1">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => router.back()}
        />
        <PageTitle title="Open Market Quotation Details" />
      </div>
    </ScrollablePageWrapper>
  );
}
