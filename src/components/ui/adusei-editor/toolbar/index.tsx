import { Editor } from "@tiptap/react";

import { LucideIconProps } from "../../icon";
import { Separator } from "../../separator";
import AlignButton from "./align";
import ToolbarButton from "./btn";
import FontSizeButton from "./font-size";
import HeadingLevelButton from "./headings";
import HighlightColorButton from "./highlight";
import LinkButton from "./link";
import ListButton from "./list";
import TextColorButton from "./text";

interface ToolbarProps {
  editor?: Editor | null;
}

interface ToolbarSectionProps {
  label: string;
  icon: LucideIconProps;
  onClick: () => void;
  isActive?: boolean;
}
const Toolbar = ({ editor }: ToolbarProps) => {
  const sections: ToolbarSectionProps[][] = [
    [
      {
        icon: "Undo2",
        label: "Undo",
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        icon: "Redo2",
        label: "Redo",
        onClick: () => editor?.chain().focus().redo().run(),
      },
    ],
    [
      {
        label: "Bold",
        icon: "Bold",
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: "Italic",
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: "Underline",
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Strikethrough",
        icon: "Strikethrough",
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
      },
    ],
  ];
  return (
    <div className="flex min-h-10 w-full items-center gap-x-0.5 overflow-x-auto rounded-3xl px-2.5 py-0.5">
      {sections[0].map((section, index) => (
        <ToolbarButton
          key={index}
          icon={section.icon}
          onClick={section.onClick}
          isActive={section.isActive}
        />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton editor={editor} />
      <FontSizeButton editor={editor} />
      <AlignButton editor={editor} />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((section, index) => (
        <ToolbarButton
          key={index}
          icon={section.icon}
          onClick={section.onClick}
          isActive={section.isActive}
        />
      ))}
      <TextColorButton editor={editor} />
      <HighlightColorButton editor={editor} />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton editor={editor} />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <ListButton editor={editor} />
      {sections[2].map((section, index) => (
        <ToolbarButton
          key={index}
          icon={section.icon}
          onClick={section.onClick}
          isActive={section.isActive}
        />
      ))}
    </div>
  );
};

export default Toolbar;
