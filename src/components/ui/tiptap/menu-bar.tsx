import { Editor } from "@tiptap/react";
import { CompactPicker } from "react-color";

import { cn } from "@/lib/utils";

import { Button } from "../button";
import { Icon } from "../icon";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import LinkPopover from "./link-popover";
import MenuButton from "./menu-btn";
import ToolTipMenuItem from "./tool-menu";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <ToolTipMenuItem message="Bold">
        <Icon
          name="Bold"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("bold"),
          })}
          size={16}
          strokeWidth={3}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Italic">
        <Icon
          name="Italic"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("italic"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Underline">
        <Icon
          name="Underline"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("underline"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Strikethrough">
        <Icon
          name="Strikethrough"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("strike"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Highlighter">
        <Icon
          name="Highlighter"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("highlight"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Text Color">
        <Popover>
          <PopoverTrigger>
            <Button
              size={"icon"}
              className={cn("text-text h-4 w-4 hover:cursor-pointer", {
                "text-primary": editor.isActive("textStyle", "color"),
              })}
              variant={"ghost"}
              style={{
                color: editor.getAttributes("textStyle").color,
              }}
            >
              <Icon
                name="Palette"
                className={cn("text-text hover:cursor-pointer")}
                size={16}
                strokeWidth={2}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <CompactPicker
              className=""
              color={editor.getAttributes("textStyle").color}
              onChange={(color) => {
                editor.chain().focus().setColor(color.hex).run();
              }}
            />
          </PopoverContent>
        </Popover>
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Clear Marks">
        <Icon
          name="Eraser"
          className={cn("text-red-500 hover:cursor-pointer")}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        />{" "}
      </ToolTipMenuItem>

      <Select
        defaultValue="paragraph"
        onValueChange={(val) => {
          switch (val) {
            case "h1":
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              break;
            case "h2":
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              break;
            case "h3":
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              break;
            case "paragraph":
              editor.chain().focus().setParagraph().run();
              break;
            case "code":
              editor.chain().focus().toggleCode().run();
              break;

            default:
              break;
          }
        }}
      >
        <SelectTrigger className="h-4 w-[100px] rounded-none border-0 bg-white ring-transparent focus:border-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent">
          <SelectValue placeholder="Heading" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value={"h1"}>Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="code">Code</SelectItem>
        </SelectContent>
      </Select>

      <ToolTipMenuItem message="Align Left">
        <Icon
          name="AlignLeft"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive({ textAlign: "left" }),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Align Center">
        <Icon
          name="AlignCenter"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive({ textAlign: "center" }),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Align Right">
        <Icon
          name="AlignRight"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive({ textAlign: "right" }),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Align Justify">
        <Icon
          name="AlignJustify"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive({ textAlign: "justify" }),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        />
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Bullet List">
        <Icon
          name="List"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("bulletList"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Ordered List">
        <Icon
          name="ListOrdered"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("orderedList"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Blockquote">
        <Icon
          name="TextQuote"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("blockquote"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Link">
        {!editor.isActive("link") ? (
          <LinkPopover editor={editor} />
        ) : (
          <Icon
            name="Link2Off"
            className={cn("text-text hover:cursor-pointer", {
              "text-primary": editor.isActive("link"),
            })}
            size={16}
            strokeWidth={2}
            onClick={() => editor.chain().focus().unsetLink().run()}
          />
        )}{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Code">
        <Icon
          name="Code"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor.isActive("code"),
          })}
          size={16}
          strokeWidth={2}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Horizontal Rule">
        <Button
          size={"icon"}
          className="h-4 w-4"
          variant={"ghost"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Icon
            name="TableRowsSplit"
            className={cn("text-text hover:cursor-pointer")}
            size={16}
            strokeWidth={2}
          />
        </Button>{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Table">
        <Popover>
          <PopoverTrigger className="h-4 w-4">
            <Icon
              name="Grid3x3"
              className={cn("text-text hover:cursor-pointer")}
              size={16}
              strokeWidth={2}
            />
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0">
            <ul className="max-h-40 overflow-auto">
              <li>
                <MenuButton
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                  title="Insert Table"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().mergeCells().run()}
                  title="Merge Cells"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().splitCell().run()}
                  title=" Split Cell"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() =>
                    editor.chain().focus().toggleHeaderColumn().run()
                  }
                  title="Toggle Header Column"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                  title="Toggle Header Row"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() =>
                    editor.chain().focus().toggleHeaderCell().run()
                  }
                  title="Toggle Header Cell"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().mergeOrSplit().run()}
                  title="Merge Or Split"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() =>
                    editor.chain().focus().setCellAttribute("colspan", 2).run()
                  }
                  title="Set Cell Attribute"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().fixTables().run()}
                  title=" Fix Tables"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().goToNextCell().run()}
                  title=" GoTo Next Cell"
                />
              </li>{" "}
              <li>
                <MenuButton
                  onClick={() =>
                    editor.chain().focus().goToPreviousCell().run()
                  }
                  title="GoTo Previous Cell"
                />
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Add Rows and Columns">
        <Popover>
          <PopoverTrigger className="h-4 w-4">
            <Icon
              name="Grid2x2Check"
              className={cn("text-text hover:cursor-pointer")}
              size={16}
              strokeWidth={2}
            />
          </PopoverTrigger>
          <PopoverContent className="w-44 p-0">
            <ul className="">
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                  title="Add Column Before"
                />
              </li>
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                  title="Add Column After"
                />
              </li>
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                  title=" Add Row Before"
                />
              </li>
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                  title=" Add Row After"
                />
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Delete Rows and Columns">
        <Popover>
          <PopoverTrigger className="h-4 w-4">
            <Icon
              name="Grid2x2X"
              className={cn("text-text hover:cursor-pointer")}
              size={16}
              strokeWidth={2}
            />
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0">
            <ul className="">
              <li>
                {" "}
                <MenuButton
                  title="Delete Table"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                />
              </li>
              <li>
                <MenuButton
                  title="Delete Column"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                />{" "}
              </li>
              <li>
                <MenuButton
                  title="Delete Row"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                />{" "}
              </li>
              <li>
                <MenuButton
                  onClick={() => editor.chain().focus().deleteTable().run()}
                  title="Delete Table"
                />{" "}
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Undo">
        <Button
          size={"icon"}
          className="h-4 w-4"
          variant={"ghost"}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Icon
            name="Undo"
            className={cn("text-text hover:cursor-pointer")}
            size={16}
            strokeWidth={3}
          />
        </Button>{" "}
      </ToolTipMenuItem>
      <ToolTipMenuItem message="Redo">
        <Button
          size={"icon"}
          className="h-4 w-4"
          variant={"ghost"}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Icon
            name="Redo"
            className={cn("text-text hover:cursor-pointer")}
            size={16}
            strokeWidth={3}
          />
        </Button>{" "}
      </ToolTipMenuItem>

      {/* <Button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          // editor.commands.toggleHeading({ level: 1 });
        }}
        // className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        className=""
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
      >
        h1
      </Button> */}
      {/* <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          // className={editor.isActive("paragraph") ? "is-active" : ""}
          className=""
          variant={editor.isActive("paragraph") ? "default" : "ghost"}
        >
          paragraph
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          // className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          className=""
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
        >
          h1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
        >
          h2
        </Button> */}
      {/* <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        >
          h3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        >
          h4
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        >
          h5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        >
          h6
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          blockquote
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </Button>
        <Button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
          }
        >
          purple
        </Button> */}
    </div>
  );
};

export default MenuBar;
