"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { InputTypes, PermissionType } from "@/lib";

import {
  ErrorResponse,
  Permission,
  // findRecordWithFullAccess,
  // findRecordWithFullAccess,
  hasOptions,
  isErrorResponse,
  permissionOptions,
  // removeDuplicateTypes,
} from "@/lib/utils";

import FirstPermissionLoad from "../../permissions/first";
import LoadingSkeleton from "../../skeleton";
import { CreateRoleValidator, RoleRequestDto } from "./type";
import { useRouter } from "next/navigation";
import {
  useLazyGetApiV1PermissionModulesQuery,
  usePostApiV1RoleMutation,
} from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
// import NoAccess from "@/shared/no-access";
import { Button, Icon } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";
import { FormWizard } from "@/components/form-inputs";
import PageWrapper from "@/components/layout/wrapper";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleRequestDto>({
    resolver: CreateRoleValidator,
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const [saveRole, { isLoading }] = usePostApiV1RoleMutation();
  const [loadAllPermissions, { isLoading: isLoadingAllPermissions }] =
    useLazyGetApiV1PermissionModulesQuery();
  const accessPermissions = useSelector(
    (state) => state.persistedReducer.auth?.permissions,
  );

  console.log(accessPermissions, "accessPermissions");

  const [permissions, setPermissions] = useState<Permission[]>([]);

  const triggerLoadingPermissions = async () => {
    try {
      const allPermissions = await loadAllPermissions().unwrap();
      const permissions = (allPermissions ?? []) as Permission[];
      setPermissions(permissions);
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  };

  useEffect(() => {
    triggerLoadingPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleTogglePermission = (
  //   sectionIndex: number,
  //   childKey: string,
  //   type: string,
  // ) => {
  //   setPermissions((prev) =>
  //     prev.map((section, idx) => {
  //       if (idx !== sectionIndex) return section;

  //       const updatedChildren = section.children.map((child) => {
  //         if (child.key !== childKey) return child;

  //         const updatedTypes = child.types.includes(type)
  //           ? child.types.filter((t) => t !== type) // Remove the type if it's already selected
  //           : [...child.types, type]; // Add the type if it's not already selected

  //         return { ...child, types: updatedTypes };
  //       });

  //       // Check if all children's types are empty
  //       const isActive = updatedChildren.some(
  //         (child) => child.types.length > 0,
  //       );

  //       return { ...section, children: updatedChildren, isActive };
  //     }),
  //   );
  // };

  // const handleSectionToggle = (sectionIndex: number) => {
  //   setPermissions((prev) =>
  //     prev.map((section, idx) => {
  //       if (idx !== sectionIndex) return section;

  //       const isActive = !section.isActive;

  //       // If setting isActive to false, clear all types under this section
  //       const updatedChildren = isActive
  //         ? section.children
  //         : section.children.map((child) => ({
  //             ...child,
  //             types: [], // Clear all types
  //           }));

  //       return { ...section, isActive, children: updatedChildren };
  //     }),
  //   );
  // };
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
  const onSubmit = async (data: RoleRequestDto) => {
    const payload = {
      name: data.name,
      // permissions: removeDuplicateTypes(permissions),
    };
    try {
      await saveRole({
        createRoleRequest: payload,
      }).unwrap();
      toast.success("Role saved successfully");
      router.back();
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  // if (
  //   !findRecordWithFullAccess(
  //     accessPermissions,
  //     PermissionKeys.resourceManagement.rolesAndPermissions.createAndAssign,
  //   )
  // ) {
  //   return <NoAccess />;
  // }
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
            <h1 className="font-Medium text-2xl text-primary-500">
              Create Role
            </h1>
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
            <span>Save Role</span>
          </Button>
        </div>
        <p className="text-sm font-normal text-neutral-500">
          Allows you to define the role name and permissions across sections
          before saving
        </p>
      </PageWrapper>
      <ScrollablePageWrapper className="space-y-5">
        <StepWrapper>
          <div className="max-w-2xl">
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
        </StepWrapper>

        <div className="pb-20">
          {isLoadingAllPermissions ? (
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
