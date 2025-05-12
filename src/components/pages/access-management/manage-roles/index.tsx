"use client";
import { RowSelectionState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { columns } from "./column";
import { useSelector } from "@/lib/redux/store";
import { useLazyGetApiV1RoleQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { Button, Icon } from "@/components/ui";
import {
  findRecordWithFullAccess,
  PermissionKeys,
  routes,
  Section,
} from "@/lib";
import Link from "next/link";
import { ClientDatatable } from "@/shared/datatable";
import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import NoAccess from "@/shared/no-access";

const ManageRoles = () => {
  const dispatch = useDispatch();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const triggerReload = useSelector((state) => state.common.triggerReload);
  // const permissions = useSelector(
  //   (state) => state.persistedReducer.auth?.permissions,
  // );
  const [loadRoles, { data, isLoading, isFetching }] =
    useLazyGetApiV1RoleQuery();

  useEffect(() => {
    loadRoles();

    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReload]);
  const roles = data ?? [];

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
  const hasAccess = findRecordWithFullAccess(
    permissions,
    PermissionKeys.humanResources.viewRoles,
  );

  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }

  return (
    <PageWrapper className="w-full space-y-2">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Link href={routes.access()}>
            <Icon name="ArrowLeft" className="h-5 w-5 hover:cursor-pointer" />
          </Link>
          <PageTitle title="Manage Roles" />
        </div>
        {/* {findRecordWithFullAccess(
            permissions,
            PermissionKeys.resourceManagement.rolesAndPermissions
              .createAndAssign,
          ) && (
          )} */}
        {findRecordWithFullAccess(
          permissions,
          PermissionKeys.humanResources.createRoleAndAssignPermissions,
        ) && (
          <Link href={routes.newRole()}>
            <Button type="button" className="gap-2">
              <Icon name="Plus" className="h-4 w-4 text-secondary-500" />
              <span>Create New Role</span>
            </Button>
          </Link>
        )}
      </div>

      <div>
        <ClientDatatable
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          data={roles}
          columns={columns}
          isLoading={isLoading || isFetching}
        />
      </div>
    </PageWrapper>
  );
};

export default ManageRoles;
