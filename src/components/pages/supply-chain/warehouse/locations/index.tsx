"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1WarehouseLocationQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

// import { useDispatch } from "@/redux/store";
import { columns } from "./columns";
import Create from "./create";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";

const Page = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadLocations, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1WarehouseLocationQuery();

  useEffect(() => {
    loadLocations({
      page,
      pageSize,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);
  const data = result?.data || [];
  const [isOpen, setIsOpen] = useState(false);
  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  const hasAccess = hasPermissionAccess(PermissionKeys.warehouse.viewLocations);

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title=" Warehouse Locations" />
        <div className="flex items-center justify-end gap-2">
          {hasPermissionAccess(PermissionKeys.warehouse.addNewLocation) && (
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Add Location</span>
            </Button>
          )}
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
