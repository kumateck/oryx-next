"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1UserQuery,
  useLazyGetApiV1UserQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

// import { useDispatch } from "@/redux/store";
import { columns } from "./columns";
import Create from "./create";

const Page = () => {
  // const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1UserQuery({
    page,
    pageSize,
  });
  const [loadUsers, { isFetching }] = useLazyGetApiV1UserQuery();

  useEffect(() => {
    loadUsers({
      page,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const data = result?.data || [];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="User Directory" />
        <div className="flex items-center justify-end gap-2">
          <Button variant="default" size={"sm"} onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" /> <span>Create User</span>
          </Button>
        </div>
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: result?.pageIndex as number,
          pageCount: result?.pageCount as number,
          totalRecordCount: result?.totalRecordCount as number,
          numberOfPagesToShow: result?.numberOfPagesToShow as number,
          startPageIndex: result?.startPageIndex as number,
          stopPageIndex: result?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};
export default Page;
