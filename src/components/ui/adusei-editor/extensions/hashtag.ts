import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    hashtag: {
      setHashtag: (hashtag: string) => ReturnType;
      unsetHashtag: () => ReturnType;
    };
  }
}

export const HashtagExtension = Extension.create({
  name: "hashtag",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          hashtag: {
            default: null,
            parseHTML: (element) => {
              const style = element.getAttribute("style");
              return style?.includes("font-weight: bold")
                ? element.textContent
                : null;
            },
            renderHTML: (attributes) => {
              if (!attributes.hashtag) {
                return {};
              }
              return {
                style: "color: blue; font-weight: bold;",
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setHashtag:
        (hashtag) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { hashtag }).run();
        },
      unsetHashtag:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { hashtag: null }).run();
        },
    };
  },
});
