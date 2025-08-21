import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1JobRequestsQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useEffect } from "react";

function Page() {
  const [loadJobRequests, { data: result, isLoading }] =
    useLazyGetApiV1JobRequestsQuery();

  useEffect(() => {
    loadJobRequests({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = result || [];
  return (
    <PageWrapper>
      <div className="flex items-center justify-between gap-2 w-full">
        <PageTitle title="Job Request" />
        <Button variant="outline" className="whitespace-nowrap flex gap-2">
          <Icon name="Plus" />
          <span>Create</span>
        </Button>
      </div>
      <ClientDatatable data={data} columns={[]} isLoading={isLoading} />
    </PageWrapper>
  );
}

export default Page;
