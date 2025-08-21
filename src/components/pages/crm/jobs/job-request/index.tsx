"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1JobRequestsQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useEffect, useState } from "react";
import Create from "./create";

function Page() {
  const [loadJobRequests, { data: result, isLoading }] =
    useLazyGetApiV1JobRequestsQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadJobRequests({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = result || [];
  return (
    <PageWrapper>
      {isOpen && <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <div className="flex items-center justify-between gap-2 w-full">
        <PageTitle title="Job Request" />
        <Button className="whitespace-nowrap flex gap-2">
          <Icon name="Plus" />
          <span>Create</span>
        </Button>
      </div>
      <ClientDatatable data={data} columns={[]} isLoading={isLoading} />
    </PageWrapper>
  );
}

export default Page;
