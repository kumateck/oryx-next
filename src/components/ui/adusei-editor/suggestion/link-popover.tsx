// LinkPopover.jsx
import { Editor } from "@tiptap/react";
import { useCallback, useState } from "react";

import {
  Button,
  Icon,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

const LinkPopover = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [displayText, setDisplayText] = useState("");

  const setLink = useCallback(() => {
    setIsOpen(true);

    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [editor]);

  const applyLink = () => {
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        ?.chain()
        .focus()
        .setLink({ href: url })
        .insertContent(displayText)
        .run();
    }
    setIsOpen(false);
    setDisplayText("");
    setUrl("");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger onClick={setLink} className="h-4">
        <Icon
          name="Link2"
          className={cn("text-text hover:cursor-pointer", {
            "text-primary": editor?.isActive("link"),
          })}
          size={16}
          strokeWidth={2}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ padding: "16px" }}>
          <div>
            <Label>Display Text:</Label>
            <Input
              className="mb-2 w-full"
              type="text"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
            />
          </div>
          <div>
            <Label>URL:</Label>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mb-2 w-full"
            />
          </div>
          <Button
            onClick={applyLink}
            className="mt-2"
            disabled={!url || !displayText}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LinkPopover;
