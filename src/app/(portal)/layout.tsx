import Header from "@/components/layout/header";
import HeaderEnd from "@/components/layout/nav-header/end";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared/sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
  const HeaderActionsStart = () => {
    return (
      <div className="flex w-full items-center gap-4">
        <SidebarTrigger className="-ml-1" />
      </div>
    );
  };

  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <SidebarInset className="flex flex-1 bg-neutral-bg">
        <Header
          headerStart={<HeaderActionsStart />}
          headerEnd={<HeaderEnd />}
        />
        <div className="flex flex-1 flex-col overflow-hidden bg-neutral-bg p-0">
          {children}
        </div>
        <div className="h-2 w-full px-5" />
      </SidebarInset>
    </SidebarProvider>
  );
}
