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

interface AlignProps {
  label: string;
  value: string;
  icon: LucideIconProps;
}

const AlignButton = ({ editor }: Props) => {
  const alignments: AlignProps[] = [
    { label: "Left", value: "left", icon: "AlignLeft" },
    { label: "Center", value: "center", icon: "AlignCenter" },
    { label: "Right", value: "right", icon: "AlignRight" },
    { label: "Justify", value: "justify", icon: "AlignJustify" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80"
        >
          <Icon name="AlignLeft" className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {alignments.map((alignment) => (
          <button
            type="button"
            key={alignment.value}
            onClick={() => {
              editor?.chain().focus().setTextAlign(alignment.value).run();
            }}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": editor?.isActive("textAlign", {
                  textAlign: alignment.value,
                }),
              },
            )}
          >
            <Icon name={alignment.icon} className="size-4" />
            <span className="text-sm">{alignment.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlignButton;
