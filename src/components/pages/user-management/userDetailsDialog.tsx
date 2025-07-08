import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@/components/ui";
import { fullname, getInitials } from "@/lib";
import { UserWithRoleDto } from "@/lib/redux/api/openapi.generated";
import { DialogDescription } from "@radix-ui/react-dialog";
import React from "react";

interface Props {
  open: boolean;
  setOpen: () => void;
  user: UserWithRoleDto;
}
export const UserDetailsDialog = ({ open, setOpen, user }: Props) => {
  //TODO: Replace with actual loading state
  const isLoading = false;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isLoading ? (
        <DialogContent>
          <DialogHeader>
            <div className="flex items-start gap-6">
              <Skeleton className="size-36 rounded-full" />
              <div className="mt-3 space-y-2 w-full">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-52 mt-4" />
              </div>
            </div>
          </DialogHeader>

          <Skeleton className="h-6 w-40 mt-2 mb-4" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <div className="flex items-start justify-start gap-6">
              <Avatar className="h-32 w-32 rounded-lg">
                <AvatarImage
                  src={user?.avatar as string}
                  alt={user?.email as string}
                />
                <AvatarFallback className="rounded-full">
                  {getInitials(
                    fullname(
                      user?.firstName as string,
                      user?.lastName as string,
                    ),
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="mt-3">
                <DialogTitle>{`${user.firstName} ${user.lastName}`}</DialogTitle>
                <DialogDescription>
                  {user.roles?.map((role) => role.name).join(", ")}
                </DialogDescription>
                <div className="text-sm text-muted-foreground text-start mt-4">
                  {user.email}
                </div>
              </div>
            </div>
          </DialogHeader>
          <h1 className="font-semibold text-xl">User Information</h1>
          <div className="mt-4 space-y-2">
            <p>
              Employee mail:
              <strong className="ml-1 text-gray-600">
                {user.email ? user.email : "Not provided"}
              </strong>
            </p>
            <p>
              Department:{" "}
              <strong className="ml-1">
                {user.department ? user.department.name : "Not provided"}
              </strong>
            </p>
            <p>
              Email:
              <strong className="ml-1">
                {user.email ? user.email : "Not provided"}
              </strong>
            </p>

            <p>
              Roles:{" "}
              <strong className="ml-1">
                {user.roles?.map((role) => role.name).join(", ")}
              </strong>
            </p>
            <p>
              Contact:
              <strong className="ml-1">
                {user.lastName ? user.lastName : "Not provided"}
              </strong>
            </p>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
