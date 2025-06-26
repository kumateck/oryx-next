import { Icon } from "@/components/ui";
import { useSortable } from "@dnd-kit/sortable";

// export const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
//   const { attributes, listeners } = useSortable({
//     id: rowId,
//   });
//   return (
//     // Alternatively, you could set these attributes on the rows themselves
//     <button {...attributes} {...listeners}>
//       <Icon name="GripHorizontal" className="size-5" />
//     </button>
//   );
// };

export const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: rowId,
  });
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button
      type="button" // Add type="button" for accessibility and to prevent form submissions
      ref={setNodeRef} // setNodeRef should be on the draggable element itself
      {...attributes}
      {...listeners}
      className="cursor-grab p-1 rounded hover:bg-gray-200 active:cursor-grabbing flex justify-center items-center w-full"
    >
      <Icon name="GripVertical" className="h-5 w-5 text-gray-500" />
    </button>
  );
};
