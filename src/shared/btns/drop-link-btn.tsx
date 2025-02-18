import Link from "next/link";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconProps,
} from "@/components/ui";
import { cn } from "@/lib";

interface Props {
  title: string;
  icon: IconProps["name"];
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  menus?: {
    name: string;
    link: string;
  }[];
}
const DropdownLinkBtns = ({ title, icon, menus, variant }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="default"
          className="flex h-9 items-center gap-2"
        >
          <Icon
            name={icon}
            className={cn(`h-4 w-4`, {
              "text-secondary-500": variant === "default",
              "text-primary-500": variant === "secondary",
            })}
          />
          <span>{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {menus?.map((item, index) => (
          <Link key={index} href={item?.link} className="">
            <DropdownMenuItem className="group cursor-pointer">
              {item?.name}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownLinkBtns;
