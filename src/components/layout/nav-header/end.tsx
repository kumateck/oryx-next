"use client";

import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  IconProps,
} from "@/components/ui";
import SearchWithAnimation from "@/components/ui/search";
import { ORYX_ERP_COOKIE_ID, routes } from "@/lib";

const HeaderEnd = () => {
  const cookies = useCookies();
  const router = useRouter();
  const handleLogout = () => {
    cookies.remove(ORYX_ERP_COOKIE_ID);
    router.push(routes.signin());
  };
  return (
    <div className="flex items-center gap-3 rounded-full p-1 px-4">
      <SearchWithAnimation />
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none ring-0 active:outline-none active:ring-0">
          <div className="flex size-10 items-center justify-center rounded-full hover:bg-white">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="rounded-xl bg-neutral-50"
          side="bottom"
          align="end"
        >
          <DropdownMenuLabel>
            <div className="space-y-0.5">
              <span className="block text-nowrap text-sm font-normal text-black">
                Desmond Kofi Adusei
              </span>
              <span className="text-center font-bold uppercase text-[xs] text-neutral-600">
                CEO
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userProfile?.map((child, idx) => (
            <DropdownMenuItem key={idx} className="flex items-center gap-1">
              <Icon name={child.icon} />
              <span>{child.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={handleLogout}
          >
            <Icon name={"LogOut"} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderEnd;

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
