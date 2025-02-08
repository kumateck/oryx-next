import { type Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Icon } from "../../icon";

interface Props {
  editor?: Editor | null;
}

const HeadingLevelButton = ({ editor }: Props) => {
  const headings = [
    { label: "Normal Text", value: 0, fontSize: "14px" },
    { label: "Heading 1", value: 1, fontSize: "48px" },
    { label: "Heading 2", value: 2, fontSize: "36px" },
    { label: "Heading 3", value: 3, fontSize: "28px" },
    { label: "Heading 4", value: 4, fontSize: "24px" },
    { label: "Heading 5", value: 5, fontSize: "20px" },
    { label: "Heading 6", value: 6, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
      return "Normal Text";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80"
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <Icon name="ChevronDown" className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {headings.map((heading) => (
          <button
            type="button"
            style={{ fontSize: heading.fontSize }}
            key={heading.value}
            onClick={() => {
              if (heading.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex w-full items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80":
                  (heading.value === 0 && !editor?.isActive("heading")) ||
                  editor?.isActive("heading", { level: heading.value }),
              },
            )}
          >
            <span className="truncate">{heading.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingLevelButton;
