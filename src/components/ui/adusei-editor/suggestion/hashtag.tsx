import { Node, mergeAttributes } from "@tiptap/core";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

export type HashtagOptions = {
  HTMLAttributes: Record<string, any>;
  renderLabel: (props: {
    options: HashtagOptions;
    node: ProseMirrorNode;
  }) => string;
  suggestion: Omit<SuggestionOptions, "editor">;
};

export const HashtagPluginKey = new PluginKey("hashtag");

export const Hashtag = Node.create<HashtagOptions>({
  name: "hashtag",

  addStorage() {
    return {
      list: [],
    };
  },

  onUpdate() {
    const els = this.editor.options.element.querySelectorAll("a");

    const list: { id: string; label: string }[] = [];
    els.forEach((el) => {
      if (el.getAttribute("data-type") !== "hashtag") return;

      const obj = {
        id: el.getAttribute("data-id")!,
        label: el.getAttribute("data-label")!,
      };

      const listId = list.map((v: any) => v.id);
      if (!listId.includes(obj.id)) list.push(obj);
    });
    this.storage.list = list;
  },

  addOptions() {
    return {
      HTMLAttributes: {},
      renderLabel({ options, node }) {
        return `#${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
      },
      suggestion: {
        char: "#",
        pluginKey: HashtagPluginKey,
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(" ");

          if (overrideSpace) {
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();

          window.getSelection()?.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            "data-id": attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    let href = `/search?q=${HTMLAttributes["data-id"]}`;

    if (this.options.HTMLAttributes.class.includes("highlight-hashtag")) {
      href += "&type=highlight";
    }

    return [
      "a",
      mergeAttributes(
        { "data-type": this.name },
        { href: href },
        { target: "_blank" },
        { rel: "noopener noreferrer" },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isHashtag = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isHashtag = true;
              tr.insertText(
                this.options.suggestion.char || "",
                pos,
                pos + node.nodeSize,
              );

              return false;
            }
          });

          return isHashtag;
        }),
      Space: () =>
        this.editor.commands.command(({ tr, state }) => {
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node) => {
            if (node.type.name === this.name) {
              tr.insertText(" ");
              return true;
            }
          });

          return false;
        }),
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
