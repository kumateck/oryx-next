import { Editor } from "@tiptap/react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Icon, LucideIconProps } from "../../icon";

interface Props {
  editor?: Editor | null;
}

interface ListProps {
  label: string;
  icon: LucideIconProps;
  onClick: () => void;
  isActive: () => boolean | undefined;
}

const ListButton = ({ editor }: Props) => {
  const lists: ListProps[] = [
    {
      label: "Bullet List",
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      icon: "List",
    },
    {
      label: "Ordered List",
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: "ListOrdered",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80"
        >
          <Icon name="List" className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {lists.map((list) => (
          <button
            type="button"
            key={list.label}
            onClick={list.onClick}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": list.isActive(),
              },
            )}
          >
            <Icon name={list.icon} className="size-4" />
            <span className="text-sm">{list.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListButton;
