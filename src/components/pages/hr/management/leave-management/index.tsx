"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import LeaveRequest from "./leave-request/create";

import { ServerDatatable } from "@/shared/datatable";
import { useLazyGetApiV1LeaveRequestQuery } from "@/lib/redux/api/openapi.generated";
import { columns } from "./columns";
// import { useRouter } from "next/navigation";
import { Button, Icon } from "@/components/ui";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useSelector } from "@/lib/redux/store";
import { AuditModules, PermissionKeys } from "@/lib";

const Page = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector(state=>state.common.searchInput)
  const [page, setPage] = useState(1);

  const [loadLeaveRequests, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1LeaveRequestQuery();

  useEffect(() => {
    loadLeaveRequests({
      page,
      pageSize,
      searchQuery: searchValue,
      module: AuditModules.management.name,
      subModule: AuditModules.management.leaveManagement,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchValue, triggerReload]);
  const data = result?.data || [];

  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.humanResources.viewLeaveRequests,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && (
        <LeaveRequest onClose={() => setIsOpen(false)} isOpen={isOpen} />
      )}

      <div className="flex items-center justify-between py-2">
        <PageTitle title="Leave Management" />
        <div className="flex items-center justify-end gap-2">
          {hasPermissionAccess(
            PermissionKeys.humanResources.createLeaveRequest,
          ) && (
            <Button onClick={() => setIsOpen(true)}>
              <Icon name="Plus" className="h-4 w-4" /> Request Leave
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
