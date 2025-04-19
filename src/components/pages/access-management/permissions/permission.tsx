import React, { useEffect } from "react";

import {
  Icon,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Permission, cn, groupByModule, permissionOptions } from "@/lib/utils";
import StepWrapper from "@/shared/wrapper";

interface Props {
  permissions: Permission[];
  handleTogglePermission: (
    sectionIndex: number,
    childKey: string,
    type: string,
  ) => void;
  handleSectionToggle: (sectionIndex: number) => void;
  firstSection?: string;
  setPermissions: React.Dispatch<React.SetStateAction<Permission[]>>;
}
const Permissions = ({
  firstSection,
  permissions,
  handleTogglePermission,
  handleSectionToggle,
  setPermissions,
}: Props) => {
  useEffect(() => {
    setPermissions(permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepWrapper>
      <Tabs defaultValue={firstSection}>
        <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
          {permissions?.map((tab, idx) => (
            <TabsTrigger
              key={idx}
              value={tab.module}
              className="h-9 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:font-Bold data-[state=active]:text-primary-default data-[state=active]:shadow-none"
            >
              {tab.module}
            </TabsTrigger>
          ))}
        </TabsList>
        {permissions?.map((tab, pidx) => (
          <TabsContent value={tab.module} key={pidx} className="h-full">
            <div className="flex items-center gap-2 pb-8">
              <Icon
                name={tab.isActive ? "LockKeyholeOpen" : "LockKeyhole"}
                className="h-4 w-4"
              />
              <span>{tab.isActive ? "Access" : "No Access"}</span>
              <Switch
                checked={tab.isActive}
                onCheckedChange={() => handleSectionToggle(pidx)}
              />
            </div>
            {/* inner tabs */}
            <Tabs
              defaultValue={Object.entries(groupByModule(tab.children))[0][0]}
              orientation="vertical"
              className={cn("w-full", {
                "pointer-events-none opacity-50": !tab.isActive,
              })}
            >
              <div className="white grid h-full grid-cols-6 overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-50 min-h-[450px]">
                {/* Sidebar for Grouped Modules */}
                <div className="col-span-1 space-y-4 rounded-s-2xl border-r border-r-neutral-300 p-2">
                  <span>Modules</span>
                  <div className="overflow-y-auto h-full pb-12">
                    <TabsList className="w-full flex-col items-start space-y-2 bg-transparent pb-5  h-10">
                      {Object.entries(groupByModule(tab.children)).map(
                        ([module], midx) => (
                          <TabsTrigger
                            key={midx}
                            value={module}
                            className="w-full justify-start text-primary-default data-[state=active]:w-full data-[state=active]:rounded-2xl data-[state=active]:bg-primary-default data-[state=active]:text-white"
                          >
                            {module}
                          </TabsTrigger>
                        ),
                      )}
                    </TabsList>
                  </div>
                </div>
                {/* Content for Items */}
                <div className="col-span-5 rounded-r-2xl rounded-t-2xl bg-white">
                  <div className="grid grid-cols-3 overflow-hidden border-b border-b-neutral-300 ">
                    <div className="col-span-2 border-r border-r-neutral-300 bg-neutral-50 px-6 py-2">
                      <span className="font-Bold text-sm text-neutral-500">
                        Items
                      </span>
                      {/* <span className="text-xs text-neutral-500"></span> */}
                    </div>
                    <div className="mx-auto flex w-full flex-col items-start justify-start rounded-t-2xl bg-neutral-50 px-6 py-2">
                      <span className="font-Bold text-sm text-neutral-500">
                        Access
                      </span>
                      <span className="text-xs text-neutral-500">
                        Toggle the switch to enable or disable access
                      </span>
                    </div>
                  </div>
                  {/* Grouped Items by Module */}
                  <div className="bg-white h-full">
                    {Object.entries(groupByModule(tab.children)).map(
                      ([module, childrenInModule], mpidx) => (
                        <TabsContent
                          value={module}
                          key={mpidx}
                          className="mt-0 grid grid-cols-3 bg-white"
                        >
                          {childrenInModule.map((child, mcidx) => (
                            <React.Fragment key={mcidx}>
                              <div
                                className={cn(
                                  "col-span-2 border-b  border-b-neutral-300 border-r-neutral-300 bg-transparent px-6 py-3",
                                  {
                                    "border-b-0":
                                      mcidx === childrenInModule.length - 1,
                                  },
                                )}
                              >
                                <span className="block font-Bold text-sm text-black">
                                  {child.name}
                                </span>
                                <p className="text-sm font-normal text-neutral-400">
                                  {child.description}
                                </p>
                              </div>
                              {!child.hasOptions
                                ? permissionOptions?.map((type, tidx) => (
                                    <div
                                      className={cn(
                                        "mx-auto flex w-full items-start justify-start border-b  border-b-neutral-300  bg-transparent px-6 py-3",
                                        {
                                          "bg-white": tidx === 0,
                                          "border-b-0":
                                            mcidx ===
                                            childrenInModule.length - 1,
                                          "border-r-0":
                                            tidx ===
                                            permissionOptions.length - 1,
                                        },
                                      )}
                                      key={tidx}
                                    >
                                      {tidx === 0 && (
                                        <Switch
                                          checked={child.types.includes(type)}
                                          onCheckedChange={() =>
                                            handleTogglePermission(
                                              pidx,
                                              child.key,
                                              type,
                                            )
                                          }
                                          key={tidx}
                                          className="h-4 w-7"
                                        />
                                      )}
                                    </div>
                                  ))
                                : permissionOptions?.map((type, tidx) => (
                                    <div
                                      className={cn(
                                        "bg-tranparent mx-auto flex w-full items-start justify-start border-b border-b-neutral-300 px-6 py-3",
                                        {
                                          "bg-neutral-50": tidx === 0,
                                        },
                                        {
                                          "border-r border-r-neutral-300":
                                            tidx !==
                                            permissionOptions?.length - 1,
                                        },
                                      )}
                                      key={tidx}
                                    >
                                      <Switch
                                        checked={child.types.includes(type)}
                                        onCheckedChange={() =>
                                          handleTogglePermission(
                                            pidx,
                                            child.key,
                                            type,
                                          )
                                        }
                                        key={tidx}
                                        className="h-4 w-7"
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
  );
};

export default Permissions;
