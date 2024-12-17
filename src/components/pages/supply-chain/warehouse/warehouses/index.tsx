"use client";

import { useEffect, useState } from "react";

import { ServerDatatable } from "@/app/shared/datatable";
import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1WarehouseQuery,
  useLazyGetApiV1WarehouseQuery,
} from "@/lib/redux/api/openapi.generated";

// import { useDispatch } from "~/redux/store";
import { columns } from "./columns";
import Create from "./create";

const Page = () => {
  // const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1WarehouseQuery({
    page,
    pageSize,
  });
  const [loadWarehouses, { isFetching }] = useLazyGetApiV1WarehouseQuery();

  useEffect(() => {
    loadWarehouses({
      page,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const data = result?.data || [];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="w-full">
        <div className="flex items-center justify-between py-2">
          <span className="text-3xl font-bold text-secondary-500">
            Warehouses
          </span>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
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
      </div>
    </div>
  );
};
export default Page;
