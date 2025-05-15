"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1DepartmentQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

// import { useDispatch } from "@/redux/store";
import { columns } from "./columns";
import Create from "./create";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
// import NoAccess from "@/shared/no-access";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1DepartmentQuery({
    page,
    pageSize,
  });
  const [loadDepartment, { isFetching }] = useLazyGetApiV1DepartmentQuery();

  useEffect(() => {
    loadDepartment({
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccess = findRecordWithAccess(
    permissions,
    PermissionKeys.warehouse.viewDepartments,
  );

  if (isClient && !hasAccess) {
    router.replace("/no-access");
    return;
    //redirect to no access
    // return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}

      <div className="flex items-center justify-between py-2">
        <PageTitle title="Departments" />
        <div className="flex items-center justify-end gap-2">
          {findRecordWithAccess(
            permissions,
            PermissionKeys.warehouse.createNewDepartment,
          ) && (
            <Button
              variant="default"
              size={"sm"}
              onClick={() => setIsOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" />{" "}
              <span>Add Department</span>
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
