import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  Button,
  Icon,
  // SelectDropDown,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Option, Section, cn, groupByModule } from "@/lib";
import {
  useGetApiV1RoleQuery,
  useLazyGetApiV1PermissionRoleByRoleIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { SpecialSelect } from "@/components/ui/special-select";
import StepWrapper from "@/shared/wrapper";

const Access: React.FC = () => {
  const { data, isLoading: isLoadingRole } = useGetApiV1RoleQuery({});

  const [loadPermissions, { isLoading: isLoadingPermissions }] =
    useLazyGetApiV1PermissionRoleByRoleIdQuery();

  const rolesOptions = useMemo(
    () =>
      (data?.map((role) => ({
        label: role.displayName,
        value: role.id,
      })) as Option[]) || [],
    [data],
  );

  const [permissions, setPermissions] = useState<Section[]>([]);

  const handleLoadPermissions = useCallback(
    async (roleId: string) => {
      try {
        const response = await loadPermissions({
          roleId,
        }).unwrap();
        setPermissions(response as Section[]);
      } catch (error) {
        console.error("Error loading permissions:", error);
      }
    },
    [loadPermissions],
  );

  const handleLoadDefaultPermissions = useCallback(() => {
    if (rolesOptions.length > 0) {
      handleLoadPermissions(rolesOptions[0].value);
    }
  }, [rolesOptions, handleLoadPermissions]);

  useEffect(() => {
    handleLoadDefaultPermissions();
  }, [handleLoadDefaultPermissions]);

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

          const updatedTypes = child.types.includes(type)
            ? child.types.filter((t) => t !== type)
            : [...child.types, type];

          return { ...child, types: updatedTypes };
        });

        return { ...section, children: updatedChildren };
      }),
    );
  };

  const handleSectionToggle = (sectionIndex: number) => {
    setPermissions((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, isActive: !section.isActive }
          : section,
      ),
    );
  };

  return (
    <div className="space-y-5 p-5">
      <div className="flex justify-between gap-4">
        <div>
          <span className="block font-Medium text-2xl">
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
            value={rolesOptions[0]}
            className="w-60 rounded-2xl border border-neutral-300 bg-white"
            onChange={(opt) => {
              const option = opt as Option;
              handleLoadPermissions(option.value);
            }}
          />
          <Button className="flex items-center gap-2">
            <HiOutlineUserGroup className="text-secondary-500" />
            <span>Manage Roles</span>
          </Button>
        </div>
      </div>
      {isLoadingRole || isLoadingPermissions ? (
        <div className="flex items-center justify-center">
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          {permissions && (
            <div className="space-y-5">
              <StepWrapper>
                <Tabs value={permissions[0]?.module}>
                  <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
                    {permissions?.map((tab, idx) => (
                      <TabsTrigger
                        key={idx}
                        value={tab.module}
                        className="h-10 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-b-primary-500 data-[state=active]:bg-transparent data-[state=active]:font-Bold data-[state=active]:text-primary-500 data-[state=active]:shadow-none"
                      >
                        {tab.module}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {permissions?.map((tab, pidx) => (
                    <TabsContent
                      value={tab.module}
                      key={pidx}
                      className="h-full"
                    >
                      <div className="flex items-center gap-2 pb-8">
                        <Icon
                          name={
                            tab.isActive ? "LockKeyholeOpen" : "LockKeyhole"
                          }
                          className="h-4 w-4"
                        />
                        <span>{tab.isActive ? "Access" : "No Access"}</span>
                        <Switch
                          checked={tab.isActive}
                          onCheckedChange={() => handleSectionToggle(pidx)}
                          className="h-4 w-7"
                          // thumbClassName="h-3 w-3 data-[state=checked]:translate-x-3"
                        />
                      </div>
                      {/* inner tabs */}
                      <Tabs
                        defaultValue={
                          Object.entries(groupByModule(tab.children))[0][0]
                        }
                        orientation="vertical"
                        className={cn("w-full", {
                          "pointer-events-none opacity-50": !tab.isActive,
                        })}
                      >
                        <div className="white grid h-full min-h-96 grid-cols-6 rounded-2xl border border-neutral-300 bg-neutral-50">
                          {/* Sidebar for Grouped Modules */}
                          <div className="col-span-1 space-y-4 rounded-s-2xl border-r border-r-neutral-300 p-2">
                            <span>Sections</span>
                            <div className="">
                              <TabsList className="w-full flex-col items-start space-y-2 bg-transparent">
                                {Object.entries(
                                  groupByModule(tab.children),
                                ).map(([module], midx) => (
                                  <TabsTrigger
                                    key={midx}
                                    value={module}
                                    className="w-full justify-start text-primary-500 data-[state=active]:w-full data-[state=active]:rounded-2xl data-[state=active]:bg-primary-500 data-[state=active]:text-white"
                                  >
                                    {module}
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                            </div>
                          </div>
                          {/* Content for Items */}
                          <div className="col-span-5 rounded-r-2xl rounded-t-2xl bg-white">
                            <div className="grid grid-cols-6 overflow-hidden border-b border-b-neutral-300">
                              <div className="col-span-2 bg-neutral-50 p-2">
                                <span>Items</span>
                              </div>
                              <div className="mx-auto flex w-full items-center justify-center bg-neutral-50 p-2">
                                <span>Self Access</span>
                              </div>
                              <div className="mx-auto flex w-full items-center justify-center bg-neutral-50 p-2">
                                <span>Direct Report</span>
                              </div>
                              <div className="mx-auto flex w-full items-center justify-center bg-neutral-50 p-2">
                                <span>Indirect Report</span>
                              </div>
                              <div className="mx-auto flex w-full items-center justify-center rounded-t-2xl bg-neutral-50 p-2">
                                <span>Everyone</span>
                              </div>
                            </div>
                            {/* Grouped Items by Module */}
                            <div className="bg-white">
                              {Object.entries(groupByModule(tab.children)).map(
                                ([module, childrenInModule], mpidx) => (
                                  <TabsContent
                                    value={module}
                                    key={mpidx}
                                    className="mt-0 grid grid-cols-6 bg-white"
                                  >
                                    {childrenInModule.map((child, mcidx) => (
                                      <React.Fragment key={mcidx}>
                                        <div className="col-span-2 border-b border-r border-b-neutral-300 border-r-neutral-300 bg-white px-3 py-2">
                                          <span className="block font-Bold text-sm text-black">
                                            {child.name}
                                          </span>
                                          <p className="text-sm font-normal text-neutral-400">
                                            {child.description}
                                          </p>
                                        </div>
                                        {["Access"].map((type, tidx) => (
                                          <div
                                            className="mx-auto flex w-full items-center justify-center border-b border-b-neutral-300 bg-white"
                                            key={tidx}
                                          >
                                            <Switch
                                              checked={child.types.includes(
                                                type,
                                              )}
                                              onCheckedChange={() =>
                                                handleTogglePermission(
                                                  pidx,
                                                  child.key,
                                                  type,
                                                )
                                              }
                                              key={tidx}
                                              className="h-4 w-7"
                                              // thumbClassName="h-3 w-3 data-[state=checked]:translate-x-3"
                                            />
                                          </div>
                                        ))}
                                      </React.Fragment>
                                    ))}
                                  </TabsContent>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </Tabs>
                    </TabsContent>
                  ))}
                </Tabs>
              </StepWrapper>
              <div className="flex justify-end gap-4">
                <Button variant={"outline"} type="button">
                  Reset Changes
                </Button>
                <Button variant={"secondary"} type="button">
                  Cancel
                </Button>
                <Button>Apply Changes</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Access;

// const types = ["Self", "Direct", "Indirect", "Everyone"];

// interface PermissionChild {
//   key: string;
//   name: string;
//   description: string;
//   module: string;
//   types: string[];
// }

// interface Permission {
//   section: string;
//   isActive: boolean;
//   children: PermissionChild[];
// }

// const groupByModule = (children: PermissionChild[]) => {
//   return children.reduce(
//     (acc, child) => {
//       acc[child.module] = acc[child.module] || [];
//       acc[child.module].push(child);
//       return acc;
//     },
//     {} as Record<string, PermissionChild[]>,
//   );
// };
