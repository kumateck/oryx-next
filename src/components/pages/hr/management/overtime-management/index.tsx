"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1WarehouseRackQuery,
  useLazyGetApiV1WarehouseRackQuery,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

// import { useDispatch } from "@/redux/store";
import { columns } from "./columns";
import Create from "./create";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";

const Page = () => {
  // const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1WarehouseRackQuery({
    page,
    pageSize,
  });
  const [loadRacks, { isFetching }] = useLazyGetApiV1WarehouseRackQuery();

  useEffect(() => {
    loadRacks({
      page,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const data = result?.data || [];
  const [isOpen, setIsOpen] = useState(false);

  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  const hasAccess = hasPermissionAccess(PermissionKeys.warehouse.viewRacks);

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Overtime Management" />
        <div className="flex items-center justify-end gap-2">
          {/* {hasPermissionAccess(PermissionKeys.humanResources.) && (
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Add Rack</span>
            </Button>
          )} */}

          <Button variant="default" size={"sm"} onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" />{" "}
            <span>Request Overtime</span>
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
