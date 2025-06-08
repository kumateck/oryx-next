"use client";
import { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";

import { toast } from "sonner";

import { InputTypes, PermissionType, RoleType, splitWords } from "@/lib";

import {
  Section,
  // findRecordWithAccess,
  hasOptions,
  permissionOptions,
  removeDuplicateTypes,
} from "@/lib";

import FirstPermissionLoad from "../../permissions/first";
import LoadingSkeleton from "../../skeleton";
import { CreateRoleValidator, RoleRequestDto } from "./type";
import { useParams, useRouter } from "next/navigation";
import {
  DepartmentType,
  useLazyGetApiV1PermissionRoleByRoleIdQuery,
  useLazyGetApiV1RoleByIdQuery,
  usePutApiV1RoleByIdMutation,
} from "@/lib/redux/api/openapi.generated";
// import { useSelector } from "@/lib/redux/store";
import ThrowErrorMessage from "@/lib/throw-error";
// import NoAccess from "@/shared/no-access";
import { Button, Icon } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";
import { FormWizard } from "@/components/form-inputs";
import PageWrapper from "@/components/layout/wrapper";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const roleId = id as string;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RoleRequestDto>({
    resolver: CreateRoleValidator,
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const [saveRole, { isLoading }] = usePutApiV1RoleByIdMutation();
  const [loadRole, { isLoading: isLoadingRole }] =
    useLazyGetApiV1RoleByIdQuery();
  const [loadRolePermissions, { isLoading: isLoadingRolePermissions }] =
    useLazyGetApiV1PermissionRoleByRoleIdQuery();

  const [permissions, setPermissions] = useState<Section[]>([]);

  const triggerLoadingPermissions = async () => {
    try {
      const role = await loadRole({
        id: roleId,
      }).unwrap();

      setValue("name", role.name as string);
      setValue("type", {
        value: role.type?.toString() ?? "",
        label: RoleType[role.type as RoleType],
      });
      const rolePermissionsData = await loadRolePermissions({
        roleId,
      }).unwrap();
      const rolePermissions = (rolePermissionsData ?? []) as Section[];
      setPermissions(rolePermissions);
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  };

  useEffect(() => {
    triggerLoadingPermissions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const roleTypeOptions = Object.entries(RoleType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: splitWords(key),
      value: String(value),
    }));

  const onSubmit = async (data: RoleRequestDto) => {
    const payload = {
      name: data.name,
      type: data.type.value,
      permissions: removeDuplicateTypes(permissions),
      displayName: data.name,
    };
    try {
      await saveRole({
        updateRoleRequest: {
          ...payload,
          type: parseInt(data.type.value) as DepartmentType,
        },
        id: roleId,
      }).unwrap();
      toast.success("Role updated successfully");
      router.back();
    } catch (error) {
      console.error("Error saving role:", error);
      // toast.error(isErrorResponse(error as ErrorResponse)?.description);
      ThrowErrorMessage(error);
    }

    // if (
    //   !findRecordWithAccess(
    //     editPermissions,
    //     PermissionKeys.resourceManagement.rolesAndPermissions.editAndUpdate,
    //   )
    // ) {
    //   return <NoAccess />;
    // }
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon
              onClick={() => router.back()}
              name="ArrowLeft"
              className="h-5 w-5 hover:cursor-pointer"
            />
            <h1 className="font-Medium text-2xl text-primary-500">Edit Role</h1>
          </div>

          <Button className="gap-2">
            {isLoading ? (
              <Icon
                name="LoaderCircle"
                className="h-4 w-4 animate-spin text-white"
              />
            ) : (
              <Icon name="Plus" className="h-4 w-4 text-secondary-500" />
            )}
            <span>Apply Changes</span>
          </Button>
        </div>
        <p className="text-sm font-normal text-neutral-500">
          Allows you to define the role name and permissions across sections
          before saving
        </p>
      </PageWrapper>
      <ScrollablePageWrapper className="space-y-5">
        <StepWrapper>
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <FormWizard
                config={[
                  {
                    register: register("name"),
                    label: "Name",
                    placeholder: "Enter name of role",
                    type: InputTypes.TEXT,
                    errors,
                  },
                ]}
              />
            </div>
            <div>
              <FormWizard
                config={[
                  {
                    name: `type`,
                    label: "Role Type",
                    type: InputTypes.SELECT,
                    placeholder: "Select role type",
                    control: control as unknown as Control,
                    required: true,
                    options: roleTypeOptions,
                    errors,
                  },
                ]}
              />
            </div>
          </div>
        </StepWrapper>
        <div className="pb-20">
          {isLoadingRole || isLoadingRolePermissions ? (
            <LoadingSkeleton />
          ) : (
            <div>
              {permissions && (
                <FirstPermissionLoad
                  setPermissions={setPermissions}
                  permissions={permissions}
                  handleSectionToggle={handleSectionToggle}
                  handleTogglePermission={handleTogglePermission}
                  firstPermission={permissions[0]}
                />
              )}
            </div>
          )}
        </div>
      </ScrollablePageWrapper>
    </form>
  );
};

export default Page;
