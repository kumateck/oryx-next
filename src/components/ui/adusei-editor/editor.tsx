/*
Extensions
*/
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { FontSizeExtension } from "./extensions/font-size";
import createSuggestion, { SuggestionProps } from "./suggestion";
import hashtagSuggestion from "./suggestion/hash-suggest";
import { Hashtag } from "./suggestion/hashtag";
import Toolbar from "./toolbar";
import ToolbarButton from "./toolbar/btn";

interface AduseiEditorProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: SuggestionProps[];
  onExpand?: () => void;
  isExpanded?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
}

const AduseiEditor = ({
  value,
  onChange,
  suggestions,
  onExpand,
  isExpanded,
  autoFocus,
  className,
  placeholder,
}: AduseiEditorProps) => {
  const [editorState, setEditorState] = useState<Editor | null>(null);
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  // useEffect(() => {
  //   if (editorState && !value) {
  //     editorState.commands.clearContent(true);
  //   }
  // }, [editorState, value]);
  // console.log("Editor content from main", value);

  // Updated useEffect to handle both clearing and setting content
  useEffect(() => {
    if (editorState) {
      const currentContent = editorState.getHTML();

      // Only update if the content is actually different
      if (currentContent !== value) {
        if (!value) {
          editorState.commands.clearContent(true);
        } else {
          editorState.commands.setContent(value, false);
        }
      }
    }
  }, [editorState, value]);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none print:border-0 bg-white  flex flex-col min-h-full w-full min-h-60 cursor-text",
          "p-3",
          "white-space-normal break-words break-all",
          { "min-h-96": isExpanded },
          // className,
        ),
      },
    },
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSizeExtension,
      Placeholder.configure({
        // Use a placeholder:
        placeholder,
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      }),
      Hashtag.configure({
        HTMLAttributes: {
          class: "hashtag highlight-hashtag",
        },
        suggestion: hashtagSuggestion(suggestions),
        renderLabel({ node }) {
          return `#${node.attrs.label}`;
        },
      }),

      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: createSuggestion("@", suggestions),
        renderHTML({ node }) {
          return [
            "a",
            {
              class:
                "font-normal hover:underline hover:underline-offset-2 text-blue-500",

              userkey: node.attrs.id,
              "data-username": node.attrs.label,
              "data-linked-resource-type": "userinfo",
              href: node.attrs.id,
            },

            `${node.attrs.label}`,
          ];
        },
      }),
    ],
    onCreate(props) {
      setEditorState(props.editor);
    },
    onDestroy() {
      setEditorState(null);
    },
    onUpdate(props) {
      setEditorState(props.editor);
      onChange(props.editor.getHTML());
    },
    content: value,
    autofocus: autoFocus ? true : false,

    onSelectionUpdate({ editor }) {
      setEditorState(editor);
    },
    onTransaction({ editor }) {
      setEditorState(editor);
    },
    // Existing editor configuration
    onFocus({ editor }) {
      setEditorState(editor);
      setIsFocused(true); // Set focus state
    },
    onBlur({ editor }) {
      setEditorState(editor);
      setIsFocused(false); // Reset focus state
    },
    onContentError({ editor }) {
      setEditorState(editor);
    },
  });
  const handleFocus = () => {
    if (editor) {
      const endPosition = editor.state.doc.content.size; // Get the end position of the content
      editor.chain().focus().setTextSelection(endPosition).run(); // Focus and move cursor
    }
  };

  return (
    <div
      className={cn(
        "size-full overflow-x-auto rounded-2xl border border-neutral-input bg-white print:overflow-visible",
        className,
      )}
    >
      <div className="relative flex items-center justify-between px-2 py-1">
        {isFocused && !isExpanded && (
          <div
            className="pointer-events-auto absolute right-0 top-0 z-10"
            style={{
              pointerEvents: "all",
            }}
          >
            <ToolbarButton
              icon="Maximize"
              onClick={() => {
                if (onExpand) {
                  onExpand();
                }
                handleFocus();
              }}
              isActive={false}
              onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
            />
          </div>
        )}
      </div>
      <div className="mx-auto flex w-full justify-center">
        <EditorContent editor={editor} className="w-full" />
      </div>
      <Toolbar editor={editorState} />
    </div>
  );
};

export default AduseiEditor;
