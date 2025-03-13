"use client";

import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { ChangePasswordForm } from "@/components/pages/change-password/ChangePasswordForm";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogTitle,
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
import { ORYX_ERP_COOKIE_ID, fullname, getInitials, routes } from "@/lib";
import { useGetApiV1UserAuthenticatedQuery } from "@/lib/redux/api/openapi.generated";

const HeaderEnd = () => {
  const { data: user } = useGetApiV1UserAuthenticatedQuery();

  const [passwordOpen, setPasswordOpen] = useState(false);
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
              <AvatarImage
                src={user?.avatar as string}
                alt={user?.email as string}
              />
              <AvatarFallback className="rounded-lg">
                {getInitials(
                  fullname(user?.firstName as string, user?.lastName as string),
                )}
              </AvatarFallback>
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
                {fullname(user?.firstName as string, user?.lastName as string)}
              </span>
              <span className="text-center font-bold uppercase text-[xs] text-neutral-600">
                {user?.department?.name}
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
            onClick={() => setPasswordOpen(true)}
          >
            <Icon name={"LockKeyholeOpen"} />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={handleLogout}
          >
            <Icon name={"LogOut"} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent className="max-w-md rounded-xl bg-neutral-50 p-4">
          <DialogTitle className="mb-4 text-lg font-semibold">
            Change Password
          </DialogTitle>
          <ChangePasswordForm onSuccess={() => setPasswordOpen(false)} />
        </DialogContent>
      </Dialog>
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
];
