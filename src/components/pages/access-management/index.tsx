"use client";
import React, { useMemo, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useDispatch } from "react-redux";

import { toast } from "sonner";
// import { EmptyIcon } from "@/assets/icons";
import { Button, Icon } from "@/components/ui";

import {
  Option,
  // Permission,
  PermissionType,
  Section,
  hasOptions,
  permissionOptions,
  removeDuplicateTypes,
  routes,
} from "@/lib";

import PermissionLoad from "./permissions";
import LoadingSkeleton from "./skeleton";
import { EmptyIcon } from "@/assets";
import {
  useGetApiV1RoleQuery,
  useLazyGetApiV1PermissionModulesQuery,
  useLazyGetApiV1PermissionRoleByRoleIdQuery,
  useLazyGetApiV1PermissionUserByUserIdQuery,
  usePutApiV1PermissionRoleByRoleIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { SpecialSelect } from "@/components/ui/special-select";
import Link from "next/link";
import { authActions } from "@/lib/redux/slices/auth";

const Access: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading: isLoadingRole } = useGetApiV1RoleQuery();

  // const [loadAllPermissions] = restApi.useLazyGetPermissionsQuery();

  const [applyChanges, { isLoading: isLoadingApplyChanges }] =
    usePutApiV1PermissionRoleByRoleIdMutation();
  // const [loadPermissions, { isLoading: isLoadingPermissions }] =
  //   restApi.useLazyGetPermissionsByRoleIdQuery();

  const rolesOptions = useMemo(
    () =>
      (data?.map((role) => ({
        label: role.displayName,
        value: role.id,
      })) as Option[]) || [],
    [data],
  );

  const handleTogglePermission = (
    sectionIndex: number,
    childKey: string,
    type: string,
  ) => {
    setPermissions((prev) =>
      prev.map((section, idx) => {
        if (idx !== sectionIndex) return section;

        const updatedChildren = section.children.map((child) => {
          if (child.key !== childKey) return child;

          let updatedTypes: string[] = [];
          if (type === PermissionType.Access && child.types.includes(type)) {
            // If "Full Access" is toggled off, clear the types array
            updatedTypes = [];
          } else {
            // Toggle the type in the types array
            updatedTypes = child.types.includes(type)
              ? child.types.filter((t) => t !== type) // Remove the type
              : [...child.types, type]; // Add the type
          }

          return { ...child, types: updatedTypes };
        });

        // Check if any child has a non-empty `types` array
        const isActive = updatedChildren.some(
          (child) => child.types.length > 0,
        );

        return { ...section, children: updatedChildren, isActive };
      }),
    );
  };
  const handleSectionToggle = (sectionIndex: number) => {
    setPermissions((prev) =>
      prev.map((section, idx) => {
        if (idx !== sectionIndex) return section;

        const isActive = !section.isActive;

        // Update the children based on isActive state
        const updatedChildren = section.children.map((child) => {
          if (!isActive) {
            // If setting isActive to false, clear all types
            return { ...child, types: [] };
          }

          // If isActive is true, update types based on hasOptions
          const types = child.hasOptions ? permissionOptions : hasOptions;
          return { ...child, types };
        });

        return { ...section, isActive, children: updatedChildren };
      }),
    );
  };

  const [loadRolePermissions, { isLoading: isLoadingRolePermissions }] =
    useLazyGetApiV1PermissionRoleByRoleIdQuery();
  const [loadAllPermissions, { isLoading: isLoadingAllPermissions }] =
    useLazyGetApiV1PermissionModulesQuery();

  const [permissions, setPermissions] = useState<Section[]>([]);

  const triggerLoadingPermissions = async (roleId: string) => {
    try {
      const rolePermissionsData = await loadRolePermissions({
        roleId,
      }).unwrap();
      const rolePermissions = (rolePermissionsData ?? []) as Section[];
      const allPermissions = await loadAllPermissions().unwrap();
      const allPermissionsData = (allPermissions ?? []) as Section[];
      const permissions =
        rolePermissions.length > 0 ? rolePermissions : allPermissionsData;
      setPermissions(permissions);
    } catch (error) {
      console.error("Error loading permissions:", error);
      // handleError(error);
    }
  };
  const [selectedDropdown, setSelectedDropdown] = useState<Option>();
  // useEffect(() => {
  //   setSelectedDropdown(rolesOptions[0]);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rolesOptions[0]]);
  const [loadUserPermissions] = useLazyGetApiV1PermissionUserByUserIdQuery();
  // const [loadUserSidebarPermissions] = uselazygetpermissionsid();
  const onSubmit = async () => {
    try {
      await applyChanges({
        roleId: selectedDropdown?.value as string,
        body: removeDuplicateTypes(permissions),
      }).unwrap();

      const response = await loadUserPermissions({ userId: "" }).unwrap();

      // await loadUserSidebarPermissions({}).unwrap();

      const userPermissions = (response ?? []) as Section[];
      dispatch(authActions.setUserPermissions(userPermissions));

      toast.success("Changes applied successfully");
    } catch (error) {
      console.error("Error applying changes:", error);
      // handleError(error);
    }
  };

  return (
    <div className="flex h-screen flex-col space-y-5 p-5">
      {/* Head */}
      <div className="sticky top-0 z-10 flex justify-between gap-4">
        <div>
          <span className="block text-2xl font-medium">
            Roles & Permissions
          </span>
          <span className="block text-sm font-normal text-neutral-500">
            Allows you to assign and manage access levels for different users
            within the system
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SpecialSelect
            options={rolesOptions}
            value={selectedDropdown}
            className="w-60 rounded-2xl border border-neutral-300 bg-white"
            onChange={(option) => {
              // const option = opt as Option;
              triggerLoadingPermissions(option.value);
              setSelectedDropdown(option);
            }}
          />
          <Link href={routes.manageRoles()} className="">
            <Button className="flex items-center gap-2" type="button">
              <HiOutlineUserGroup className="text-secondary-500" />
              <span>Manage Roles</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Scrollable Content */}
      {selectedDropdown?.value ? (
        <div className="flex-1 overflow-y-auto">
          {isLoadingRole ? (
            <LoadingSkeleton />
          ) : (
            <div className="pb-12">
              {/* main content */}
              <div className="space-y-5">
                {selectedDropdown?.value && (
                  <PermissionLoad
                    isLoading={
                      isLoadingAllPermissions || isLoadingRolePermissions
                    }
                    triggerLoadingPermissions={triggerLoadingPermissions}
                    permissions={permissions}
                    setPermissions={setPermissions}
                    firstRoleId={selectedDropdown?.value}
                    handleSectionToggle={handleSectionToggle}
                    handleTogglePermission={handleTogglePermission}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-[590px] items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <div className="flex flex-col items-center gap-4">
            <span>
              <EmptyIcon />
            </span>
            <div className="text-center">
              <p className="font-Medium text-sm text-neutral-600">
                No role selected.
              </p>
              <p className="font-Medium text-sm text-neutral-400">
                Please choose a role to manage its permissions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {selectedDropdown?.value && (
        <div className="sticky bottom-0 z-10 flex justify-end gap-4 py-2 pt-20">
          <Button variant={"outline"} type="button">
            Reset Changes
          </Button>
          <Button variant={"secondary"} type="button">
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {isLoadingApplyChanges && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )}
            <span>Apply Changes</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Access;
