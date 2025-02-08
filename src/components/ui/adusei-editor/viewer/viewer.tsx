import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { cn } from "@/lib/utils";

interface ViewerProps {
  content?: string;
}

const EditorViewer: React.FC<ViewerProps> = ({ content }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn("white-space-normal break-words break-all"),
      },
    },
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true, // Ensures links are clickable
      }),
    ],
    content: content ? content : undefined, // Pass the content to the editor
    editable: false, // Disable editing for viewer purposes
  });

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
