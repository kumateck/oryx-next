"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useLazyGetApiV1EmployeeQuery } from "@/lib/redux/api/openapi.generated";
import DropdownBtns from "@/shared/btns/drop-btn";
import { ServerDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import Create from "./create";
import { useSelector } from "@/lib/redux/store";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
import NoAccess from "@/shared/no-access";

const EmployeeManagement = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1EmployeeQuery();

  useEffect(() => {
    loadData({
      page,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = result?.data || [];
  const router = useRouter();
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
    PermissionKeys.humanResources.viewEmployee,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <ScrollablePageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Employee Management" />
        <div className="flex items-center justify-end gap-2">
          {/* <Button variant="default" size={"sm"} onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" />{" "}
            <span>Register Employee</span>
          </Button> */}
          {findRecordWithAccess(
            permissions,
            PermissionKeys.humanResources.registerEmployee,
          ) && (
            <DropdownBtns
              title="Register Employee"
              icon="Plus"
              menus={[
                {
                  name: "Casual Onboarding Form",
                  onClick: () =>
                    router.push("/hr/employee-management/create/0"),
                },
                {
                  name: "Permanent Onboarding Form",
                  onClick: () =>
                    router.push("/hr/employee-management/create/1"),
                },
                {
                  name: "Send Form by Email",
                  onClick: () => setIsOpen(true),
                },
              ]}
            />
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
    </ScrollablePageWrapper>
  );
};

export default EmployeeManagement;
