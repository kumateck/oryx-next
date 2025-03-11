import { Editor } from "@tiptap/react";
import { type ColorResult, SketchPicker } from "react-color";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Icon } from "../../icon";

interface Props {
  editor?: Editor | null;
}

const HighlightColorButton = ({ editor }: Props) => {
  const value = editor?.getAttributes("highlight").color || "#FFFFFF";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl px-1.5 text-sm hover:bg-neutral-200/80"
        >
          <Icon name="Highlighter" className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker onChange={onChange} color={value} className="w-full" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HighlightColorButton;
