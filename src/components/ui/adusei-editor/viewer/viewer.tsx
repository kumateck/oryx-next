import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

import BackgroundColor from "./background";

interface ViewerProps {
  content?: string;
}

const EditorViewer: React.FC<ViewerProps> = ({ content }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose lg:prose-lg max-w-none break-words whitespace-pre-wrap",
        ),
      },
    },
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      BackgroundColor,
    ],
    content, // Initial content
    editable: false,
  });

  // Update the content when `content` changes
  useEffect(() => {
    if (editor && typeof content === "string") {
      // Only update if the incoming content differs from current editor content
      if (content !== editor.getHTML()) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <div className="w-full">
      {content && (
        <div>
          {editor ? (
            <EditorContent editor={editor} />
          ) : (
            <p>Loading content...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EditorViewer;
