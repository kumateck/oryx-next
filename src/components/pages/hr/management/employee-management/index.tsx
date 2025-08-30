"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import {
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1EmployeeQuery,
} from "@/lib/redux/api/openapi.generated";
import DropdownBtns from "@/shared/btns/drop-btn";
import { ServerDatatable } from "@/shared/datatable";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import Create from "./create";
import { EmployeeStatusType, Option, PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import { useUserPermissions } from "@/hooks/use-permission";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import AccessTabs from "@/shared/access";
import { useDebounce } from "@uidotdev/usehooks";
import { SpecialSelect } from "@/components/ui/special-select";
import ExportToExcel from "./export-excell";

const EmployeeManagement = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.common.searchInput);
  const debousecedValue = useDebounce(searchValue, 500);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const searchParams = useSearchParams();
  const status = searchParams.get("status") as unknown as EmployeeStatusType;

  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleTabClick = (tabType: EmployeeStatusType) => {
    router.push(
      pathname + "?" + createQueryString("status", tabType.toString()),
    );
  };

  const [loadData, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1EmployeeQuery();
  const { data: departmentData } = useGetApiV1DepartmentQuery({
    page: 1,
    pageSize: 1000,
  });

  useEffect(() => {
    loadData({
      searchQuery: debousecedValue,
      page,
      department: selectedDepartment ?? "",
      pageSize,
      status: status || EmployeeStatusType.Active,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    pageSize,
    debousecedValue,
    status,
    triggerReload,
    selectedDepartment,
  ]);

  const data = result?.data || [];
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.humanResources.viewEmployee,
  );

  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item.id as string,
    label: item.name as string,
  })) as Option[];

  const handleSelect = (option: Option) => {
    if (isLoading) return;
    setSelectedDepartment(option.label);
  };

  return (
    <ScrollablePageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Employee Management" />

        <div className="flex items-center w-fit gap-2">
          <AccessTabs
            handleTabClick={handleTabClick}
            type={status}
            tabs={[
              {
                label: EmployeeStatusType[EmployeeStatusType.Active],
                value: EmployeeStatusType.Active.toString(),
              },
              {
                label: EmployeeStatusType[EmployeeStatusType.Inactive],
                value: EmployeeStatusType.Inactive.toString(),
              },
              {
                label: EmployeeStatusType[EmployeeStatusType.New],
                value: EmployeeStatusType.New.toString(),
              },
            ]}
          />
          <div className="flex items-center gap-2">
            <SpecialSelect
              onChange={handleSelect}
              placeholder="Filter by department"
              options={departmentOptions}
            />
            {selectedDepartment && <ExportToExcel employeeData={data} />}
          </div>
          {hasPermissionAccess(
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
