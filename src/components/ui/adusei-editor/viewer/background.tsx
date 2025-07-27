// extensions/BackgroundColor.ts
import { Mark, mergeAttributes } from "@tiptap/core";

const BackgroundColor = Mark.create({
  name: "backgroundColor",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[style*='background-color']",
        getAttrs: (el) => {
          const style = (el as HTMLElement).getAttribute("style");
          return style?.includes("background-color") ? { style } : null;
        },
      },
      {
        tag: "mark",
        getAttrs: (el) => {
          const style = (el as HTMLElement).getAttribute("style");
          return style?.includes("background-color") ? { style } : null;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("style") || null,
        renderHTML: (attributes: any) => {
          return attributes.style ? { style: attributes.style } : {};
        },
      },
    };
  },
});

export default BackgroundColor;
