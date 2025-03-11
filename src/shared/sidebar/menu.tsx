import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  useSidebar,
} from "@/components/ui";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui";
import { cn } from "@/lib";

import { Route } from "./navigation";

interface NavMainProps {
  group: Route;
}
export function NavMain({ group }: NavMainProps) {
  const { isMobile, state } = useSidebar();
  const currentPath = usePathname();

  const isActiveRoute = (path: string) => currentPath === path;

  return (
    <SidebarGroup className={cn("-ml-2")}>
      <SidebarGroupLabel>
        <span className="text-md uppercase text-primary-hover">
          {group.title}
        </span>
      </SidebarGroupLabel>

      <SidebarMenu>
        {group.menu.map((item) => {
          const isActive = currentPath === item.url;
          if (item?.items && item?.items.length > 0) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem className="flex flex-col items-center">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="w-full rounded-2xl py-5"
                    >
                      <Icon
                        name={item.icon}
                        className={cn({
                          "text-primary-default": isMobile || isActive,
                          "text-neutral-default":
                            (!isMobile && !isActive && state === "expanded") ||
                            (!isMobile && !isActive && state === "collapsed"),
                        })}
                      />
                      <div
                        className={cn("text-sm font-normal", {
                          "font-bold": isActive,
                        })}
                      >
                        {item.title}
                      </div>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubtActive = isActiveRoute(
                          subItem.url as string,
                        );
                        if (subItem.children) {
                          return (
                            <DropdownMenu key={subItem.title}>
                              <SidebarMenuItem>
                                <DropdownMenuTrigger asChild>
                                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    {subItem.title}{" "}
                                    <MoreHorizontal className="ml-auto" />
                                  </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                {subItem.children &&
                                subItem.children?.length ? (
                                  <DropdownMenuContent
                                    side="right"
                                    align="start"
                                    className="min-w-56 rounded-lg"
                                  >
                                    {subItem.children.map((child, idx) => (
                                      <DropdownMenuItem asChild key={idx}>
                                        <Link href={child.url as string}>
                                          {child.title}
                                        </Link>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                ) : null}
                              </SidebarMenuItem>
                            </DropdownMenu>
                          );
                        } else {
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                className={cn(`rounded-2xl`, {
                                  "hover:bg-white hover:text-black":
                                    isSubtActive,
                                })}
                                isActive={isSubtActive}
                                asChild
                              >
                                <Link
                                  href={subItem.url as string}
                                  className="py-5"
                                >
                                  {subItem.icon && (
                                    <Icon name={subItem.icon} className="" />
                                  )}
                                  <span
                                    className={cn(
                                      "text-left text-sm font-normal",
                                      {
                                        "font-medium": isSubtActive,
                                      },
                                    )}
                                  >
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        }
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem
                key={item.title}
                className="flex w-full items-center"
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    `w-full rounded-2xl ${isActive ? "hover:bg-white hover:text-black" : null}`,
                  )}
                >
                  <Link href={item.url as string} className="py-5">
                    <Icon
                      name={item.icon}
                      className={cn({
                        "text-black": isMobile || isActive,
                        "text-neutral-dark":
                          (!isMobile && !isActive && state === "expanded") ||
                          (!isMobile && !isActive && state === "collapsed"),
                      })}
                    />
                    <div
                      className={cn("text-sm font-normal", {
                        "font-medium": isActive,
                      })}
                    >
                      {item.title}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
