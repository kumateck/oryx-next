"use client";

// import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Mention from "@tiptap/extension-mention";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import MenuBar from "./menu-bar";
import "./style.css";
import createSuggestion, { SuggestionItem } from "./suggestion";

const EnterHandler = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        if (editor.isActive("heading")) {
          editor.commands.splitBlock();
          editor.commands.setParagraph();
          return true;
        }
        return false;
      },
    };
  },
});
const CustomExtension = Extension.create({
  addKeyboardShortcuts() {
    return {
      " ": ({ editor }) => {
        // Check if the current selection is within a link
        if (editor.isActive("link")) {
          editor.chain().focus().setParagraph().run();
        }
        // Insert a space
        editor.chain().focus().insertContent(" ").run();
        return true;
      },
    };
  },
});
export const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      ListItem,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      EnterHandler,
      CustomExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "my-custom-is-empty-class",
        placeholder: "Write something ...",
        considerAnyAsEmpty: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        autolink: false,
        HTMLAttributes: {
          // Change rel to different value
          // Allow search engines to follow links(remove nofollow)
          rel: "noopener noreferrer",
          // Remove target entirely so links open in current tab
          target: null,
        },
        validate: (href) => /^http?:\/\//.test(href),
        protocols: [
          "ftp",
          "mailto",
          {
            scheme: "tel",
            optionalSlashes: true,
          },
        ],
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "tiptap-blockquote",
        },
      }),
      BulletList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: "tiptap-bullet-list",
        },
      }),
      OrderedList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
        HTMLAttributes: {
          class: "tiptap-ordered-list",
        },
      }),

      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "tiptap-underline",
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
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),

    editorProps: {
      attributes: {
        spellcheck: "false",
        class:
          " w-full rounded-b-md relative min-h-24  h-full max-h-123.5 overflow-auto font-source-sans text-text border-t-0 border border-input bg-white px-3 py-2 transition-colors text-sm   ring-offset-zinc-900  placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed  disabled:opacity-50 border-b shadow-md border-b-border2 focus-within:border-b-2 focus-within:border-b-compound-brand",
      },
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex min-h-96 flex-col justify-stretch">
      <div className="shadow-shadow2a relative -mb-1 flex h-8 cursor-pointer items-center rounded-t-md border border-b-0 bg-white px-2 pt-2 align-middle transition-colors">
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

const suggestions: SuggestionItem[] = [
  {
    label: "Eugene Dumoga",
    email: "edumoga@ssessa.com",
    image: "path/to/image1",
    id: "https://example.com/eugene",
  },
  {
    label: "Anthony Gyan",
    email: "agyan@ssessa.com",
    image: "path/to/image2",
    id: "https://example.com/anthony",
  },
  {
    label: "Audrey Fafa Ankah",
    email: "aankah@ssessa.com",
    image: "path/to/image3",
    id: "https://example.com/audrey",
  },
  {
    label: "Albert Prince Mensah",
    email: "amensah@ssessa.com",
    image: "path/to/image4",
    id: "https://example.com/albert",
  },
  {
    label: "Angelique Foah Cobbina",
    email: "acobbina@ssessa.com",
    image: "path/to/image5",
    id: "https://example.com/angelique",
  },
  {
    label: "Derick Addai-Darko",
    email: "daddai-darko@ayyriangroup.com",
    image: "path/to/image6",
    id: "https://example.com/derick",
  },
  {
    label: "Emmanuel Tetteh Aduteye",
    email: "eaduteye@ssessa.com",
    image: "path/to/image7",
    id: "https://example.com/emmanuel",
  },
  {
    label: "Eugenia Denne Ayisi",
    email: "eayisi@ayyriangroup.com",
    image: "path/to/image8",
    id: "https://example.com/eugenia",
  },
  {
    label: "Cyrpian Ed Cyprian",
    email: "ecyprian@ayyriangroup.com",
    image: "path/to/image9",
    id: "https://example.com/cyrpian",
  },
  {
    label: "John Doe",
    email: "jdoe@example.com",
    image: "path/to/image10",
    id: "https://example.com/john",
  },
  {
    label: "Jane Smith",
    email: "jsmith@example.com",
    image: "path/to/image11",
    id: "https://example.com/jane",
  },
  {
    label: "Michael Brown",
    email: "mbrown@example.com",
    image: "path/to/image12",
    id: "https://example.com/michael",
  },
  {
    label: "Emily Davis",
    email: "edavis@example.com",
    image: "path/to/image13",
    id: "https://example.com/emily",
  },
  {
    label: "Christopher Wilson",
    email: "cwilson@example.com",
    image: "path/to/image14",
    id: "https://example.com/christopher",
  },
  {
    label: "Olivia Taylor",
    email: "otaylor@example.com",
    image: "path/to/image15",
    id: "https://example.com/olivia",
  },
  {
    label: "Daniel Martinez",
    email: "dmartinez@example.com",
    image: "path/to/image16",
    id: "https://example.com/daniel",
  },
  {
    label: "Sophia Anderson",
    email: "sanderson@example.com",
    image: "path/to/image17",
    id: "https://example.com/sophia",
  },
  {
    label: "David Lee",
    email: "dlee@example.com",
    image: "path/to/image18",
    id: "https://example.com/david",
  },
  {
    label: "Isabella Thomas",
    email: "ithomas@example.com",
    image: "path/to/image19",
    id: "https://example.com/isabella",
  },
  {
    label: "James Clark",
    email: "jclark@example.com",
    image: "path/to/image20",
    id: "https://example.com/james",
  },
];
