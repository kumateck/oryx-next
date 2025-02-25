"use client";

import React from "react";

// import { Skeleton } from "@/components/ui";
import {
  Sidebar,
  SidebarContent, // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// import { NavSecondary } from "./bottom";
import SideLogo from "./logo";
import { NavMain } from "./menu";
import { ROUTES } from "./navigation";

interface MenuItem {
  name: string;
  module: string;
  requiredPermissionKey: string[];
  requiredPermissionTypes: string[];
  children: MenuItem[];
  icon: string | null;
  route: string | null;
  order: number;
  isVisible: boolean;
}

export interface ModuleGroup {
  heading: string;
  menus: MenuItem[];
}

// type GroupedByModule = ModuleGroup[];

// function groupByModule(items: MenuItem[]): GroupedByModule {
//   const moduleMap: { [module: string]: ModuleGroup } = {};

//   items.forEach((item) => {
//     if (!moduleMap[item.module]) {
//       moduleMap[item.module] = {
//         heading: item.module,
//         menus: [],
//       };
//     }
//     moduleMap[item.module].menus.push(item);
//   });

//   return Object.values(moduleMap);
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // console.log(first)
  return (
    <Sidebar collapsible="icon" {...props} className="z-20">
      <SidebarHeader>
        <SideLogo />
      </SidebarHeader>
      <SidebarContent className="-mt-8 overflow-y-auto pb-24">
        {ROUTES?.map((group, idx) => <NavMain group={group} key={idx} />)}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
