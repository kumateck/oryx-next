import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon, IconProps } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-main">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <div className="flex items-center gap-3 rounded-full bg-neutral-200 p-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <span className="block text-base font-normal text-black">
                  Desmond Kofi Adusei
                </span>
                <span className="text-xs font-bold uppercase text-neutral-600">
                  CEO
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none ring-0 active:outline-none active:ring-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2.5">
                    <Icon name="Settings" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="rounded-xl bg-neutral-50"
                  side="bottom"
                  align="end"
                >
                  {userProfile?.map((child, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      className="flex items-center gap-1"
                    >
                      <Icon name={child.icon} />
                      <span>{child.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-white dark:bg-neutral-800/50" />
            <div className="aspect-video rounded-xl bg-white dark:bg-neutral-800/50" />
            <div className="aspect-video rounded-xl bg-white dark:bg-neutral-800/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

interface DropdownMenuProps {
  name: string;
  path?: string;
  icon: IconProps["name"];
}
const userProfile: DropdownMenuProps[] = [
  {
    name: "Profile",
    icon: "CircleUserRound",
    path: "/profile",
  },
  {
    name: "Change Password",
    icon: "LockKeyholeOpen",
    path: "/profile",
  },
];
