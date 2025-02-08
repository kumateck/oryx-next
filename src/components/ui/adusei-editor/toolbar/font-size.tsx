import { Editor } from "@tiptap/react";
import { useState } from "react";

import { Icon } from "../../icon";
import { Input } from "../../input";

interface Props {
  editor?: Editor | null;
}

const FontSizeButton = ({ editor }: Props) => {
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(currentFontSize);

  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        type="button"
        onClick={decrement}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80"
      >
        <Icon name="Minus" className="text-primary-600 size-4" />
      </button>
      {isEditing ? (
        <Input
          value={inputValue}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          className="flex h-7 w-10 rounded-sm border border-neutral-400 bg-transparent text-center text-sm"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 cursor-text rounded-sm border border-neutral-400 bg-transparent text-center text-sm"
        >
          <span className="text-xs">{currentFontSize}</span>
        </button>
      )}
      <button
        type="button"
        onClick={increment}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80"
      >
        <Icon name="Plus" className="text-primary-600 size-4" />
      </button>
    </div>
  );
};

export default FontSizeButton;
