// import { ReactRenderer } from "@tiptap/react";
// import { SuggestionOptions } from "@tiptap/suggestion";
// import tippy, { GetReferenceClientRect, Instance, Props } from "tippy.js";
// import MentionList from "./mention-list";
// import "./style.css";
// export interface SuggestionProps {
//   type?: "user" | "item";
//   heading: string;
//   children: SuggestionItem[];
// }
// export interface SuggestionItem {
//   label: string;
//   email?: string;
//   url?: string;
//   role?: string;
//   description?: string;
//   reference?: string;
//   image?: string;
//   id?: string;
//   modelType?:
//     | "Incident"
//     | "Observation"
//     | "Inspection"
//     | "Audit"
//     | "Certification"
//     | "Regulation";
//   type?: "user" | "item";
// }
// const createSuggestion = (
//   trigger: string,
//   items: SuggestionProps[],
// ): Partial<SuggestionOptions> => ({
//   char: trigger,
//   items: ({ query }) => {
//     return items.filter((item) =>
//       item.children[0].label.toLowerCase().includes(query.toLowerCase()),
//     );
//   },
//   render: () => {
//     let reactRenderer: ReactRenderer;
//     let popup: Instance<Props>; // Change from Instance<Props>[] to Instance<Props>
//     return {
//       onStart: (props) => {
//         reactRenderer = new ReactRenderer(MentionList, {
//           props,
//           editor: props.editor,
//         });
//         // Create the tippy instance for the suggestion popup
//         popup = tippy(props.editor.view.dom as Element, {
//           getReferenceClientRect: props.clientRect as GetReferenceClientRect,
//           appendTo: () => document.body,
//           content: reactRenderer.element,
//           showOnCreate: true,
//           interactive: true,
//           arrow: false,
//           trigger: "manual",
//           placement: "bottom",
//           interactiveDebounce: 0,
//           onShow(instance) {
//             // Prevent event propagation on the popup
//             instance.popper.addEventListener("click", (e) => {
//               e.stopPropagation();
//               e.preventDefault();
//             });
//           },
//           popperOptions: {
//             modifiers: [
//               {
//                 name: "preventOverflow",
//                 options: {
//                   boundary: "viewport",
//                 },
//               },
//               {
//                 name: "flip",
//                 options: {
//                   fallbackPlacements: ["top", "bottom", "right", "left"],
//                 },
//               },
//             ],
//           },
//         });
//       },
//       onUpdate(props) {
//         reactRenderer.updateProps(props);
//         // Update the tippy popup position
//         popup.setProps({
//           getReferenceClientRect: props.clientRect as GetReferenceClientRect,
//         });
//       },
//       onExit() {
//         // Destroy the tippy popup and ReactRenderer when exiting
//         popup.destroy();
//         reactRenderer.destroy();
//       },
//     };
//   },
//   command: ({ editor, range, props }) => {
//     editor
//       .chain()
//       .focus()
//       .insertContentAt(range, [
//         {
//           type: "mention",
//           attrs: { id: props.id, label: props.label, href: props.id },
//         },
//         { type: "text", text: " " },
//       ])
//       .run();
//   },
//   allowSpaces: true,
// });
// export default createSuggestion;
import { ReactRenderer } from "@tiptap/react";
import { SuggestionOptions } from "@tiptap/suggestion";
import tippy, { GetReferenceClientRect, Instance, Props } from "tippy.js";

import MentionList from "./mention-list";
import "./style.css";

export interface SuggestionProps {
  type?: "user" | "item";
  heading: string;
  children: SuggestionItem[];
}

export interface SuggestionItem {
  label: string;
  email?: string;
  url?: string;
  role?: string;
  description?: string;
  reference?: string;
  image?: string;
  id?: string;

  modelType?:
    | "Incident"
    | "Observation"
    | "Inspection"
    | "Audit"
    | "Certification"
    | "Regulation";
  type?: "user" | "item";
}

const createSuggestion = (
  trigger: string,
  items: SuggestionProps[],
): Partial<SuggestionOptions> => ({
  char: trigger,
  items: ({ query }) => {
    return items.filter((item) =>
      item.children.some((child) =>
        child.label.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  },
  render: () => {
    let reactRenderer: ReactRenderer | null = null;
    let popup: Instance<Props> | null = null;

    return {
      onStart: (props) => {
        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        popup = tippy(props.editor.view.dom as Element, {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body, // Render outside modal to allow scrolling
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          arrow: false,
          trigger: "manual",
          placement: "bottom",
          interactiveDebounce: 0,
          popperOptions: {
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "viewport",
                },
              },
              {
                name: "flip",
                options: {
                  fallbackPlacements: ["top", "bottom", "right", "left"],
                },
              },
            ],
          },
        });
      },
      onUpdate: (props) => {
        if (reactRenderer) {
          reactRenderer.updateProps(props);
        }

        if (popup) {
          popup.setProps({
            getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          });
        }
      },
      onExit: () => {
        if (popup) {
          popup.destroy();
          popup = null;
        }

        if (reactRenderer) {
          reactRenderer.destroy();
          reactRenderer = null;
        }
      },
    };
  },
  command: ({ editor, range, props }) => {
    editor
      .chain()
      .focus()
      .insertContentAt(range, [
        {
          type: "mention",
          attrs: { id: props.id, label: props.label, href: props.id },
        },
        { type: "text", text: " " },
      ])
      .run();
  },
  allowSpaces: true,
});

export default createSuggestion;
