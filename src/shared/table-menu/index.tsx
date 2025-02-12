import React from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Icon,
} from "@/components/ui";

export const TableMenuAction = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="flex h-9 items-center gap-2"
        >
          <Icon name="EllipsisVertical" className="h-5 w-5 text-neutral-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="rounded-md">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
