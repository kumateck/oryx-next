import { useEffect, useRef, useState } from "react";

import {
  MaterialKind,
  useDeleteApiV1CollectionByItemTypeAndItemIdMutation,
  usePostApiV1CollectionByItemTypeMutation,
  usePutApiV1CollectionByItemTypeAndItemIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { FormOption, cn } from "@/lib/utils";

import { FormOptionActions } from "./actions";

interface Props {
  allowEdit?: boolean;
  editMode: boolean;
  createMode: boolean;
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  cancelCreating?: () => void;
  onCancelEditing?: () => void;
  modelType: string;
  dropDownType: string;
  kind?: number;
}

// export const FormOptionNode = ({
//   id,
//   name,
//   onDelete,
//   cancelCreating,
//   editMode,
//   onUpdate,
//   createMode,
//   onCreate,
//   onCancelEditing,
//   dropDownType,
//   allowEdit,
// }: FormOption & Props) => {
//   const [isInputError, setIsInputError] = useState(false);

//   const [deleteMutation, { isLoading: isBeingDeleted }] =
//     useDeleteApiV1CollectionByItemTypeAndItemIdMutation();
//   const [updateMutation, { isLoading: isBeingUpdated }] =
//     usePutApiV1CollectionByItemTypeAndItemIdMutation();
//   const [createMutation, { isLoading: isBeingCreated }] =
//     usePostApiV1CollectionByItemTypeMutation();

//   const [editedName, setEditedName] = useState(name);
//   const editDivRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (name && editDivRef.current) {
//       editDivRef.current.textContent = name;
//     }
//   }, [name]);

//   const saveOption = async (updatedName: string) => {
//     // if (!editMode || isInputError) return;
//     if (!name.trim()) {
//       setIsInputError(true);
//       return;
//     }
//     await updateMutation({
//       createItemRequest: {
//         name: updatedName,
//       },
//       itemId: id,
//       itemType: dropDownType,
//     }).unwrap();

//     onUpdate?.();
//     setIsInputError(false);
//   };

//   const deleteOption = async () => {
//     await deleteMutation({
//       itemId: id,
//       itemType: dropDownType,
//     }).unwrap();
//     onDelete?.();
//   };

//   const cancelEdit = async () => {
//     setEditedName(name);
//     onCancelEditing?.();
//     setIsInputError(false);
//   };

//   const createOption = async (name: string) => {
//     if (!name.trim()) {
//       setIsInputError(true);
//       return;
//     }

//     await createMutation({
//       createItemRequest: {
//         name,
//       },
//       itemType: dropDownType,
//     } satisfies PostApiV1CollectionByItemTypeApiArg).unwrap();

//     onCreate?.();
//     setIsInputError(false);
//   };

//   useEffect(() => {
//     if ((editMode || createMode) && editDivRef.current) {
//       // focus and set cursor to the end
//       const range = document.createRange();
//       const selection = window.getSelection();
//       range.selectNodeContents(editDivRef.current);
//       range.collapse(false);
//       selection?.removeAllRanges();
//       selection?.addRange(range);
//       editDivRef.current.focus();
//     }
//   }, [editDivRef, editMode, createMode]);

//   const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       event.currentTarget.textContent?.trim() !== "" &&
//         event.currentTarget.blur();
//       editMode && saveOption(editedName);
//       createMode && createOption(editedName);
//     }
//     if (event.key === "Escape") {
//       event.preventDefault();
//       event.currentTarget.blur();
//       editMode && cancelEdit();
//       createMode && cancelCreating?.();
//     }
//   };
//   const onInput = (event: React.ChangeEvent<HTMLDivElement>) => {
//     if (!editDivRef.current) return;
//     editDivRef.current.textContent = event.target.textContent;
//     setEditedName(event.target.textContent || "");

//     if (event.target.textContent?.trim().length === 0) {
//       setIsInputError(true);
//     } else {
//       setIsInputError(false);
//     }
//   };
//   return (
//     <div
//       className={cn(
//         "shadow-xsmall flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-white px-3 py-2",
//         !isInputError &&
//           (editMode || createMode) &&
//           "border-2 border-secondary-500",
//         isInputError && "border-danger-500 border-2",
//       )}
//     >
//       {editMode || createMode ? (
//         <div
//           ref={editDivRef}
//           suppressContentEditableWarning={true}
//           contentEditable={
//             isBeingUpdated || isBeingCreated ? "false" : "plaintext-only"
//           }
//           className="w-full text-sm underline focus-visible:outline-none"
//           onInput={onInput}
//           onKeyDown={onKeyDown}
//           dir="ltr"
//         >
//           {name}
//         </div>
//       ) : (
//         <span className="max-w-[8ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
//           {name}
//         </span>
//       )}
//       <FormOptionActions
//         isLoading={isBeingUpdated || isBeingCreated}
//         isBeingDeleted={isBeingDeleted}
//         editMode={editMode}
//         allowEdit={allowEdit}
//         createMode={createMode}
//         name={name}
//         editedName={editedName}
//         saveOption={saveOption}
//         cancelEdit={cancelEdit}
//         createOption={createOption}
//         cancelCreating={cancelCreating}
//         deleteOption={deleteOption}
//         isInputError={isInputError}
//       />
//     </div>
//   );
// };

export const FormOptionNode = ({
  id,
  name,
  onDelete,
  cancelCreating,
  editMode,
  onUpdate,
  createMode,
  onCreate,
  onCancelEditing,
  dropDownType,
  allowEdit,
  kind,
}: FormOption & Props) => {
  const [isInputError, setIsInputError] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const [deleteMutation, { isLoading: isBeingDeleted }] =
    useDeleteApiV1CollectionByItemTypeAndItemIdMutation();
  const [updateMutation, { isLoading: isBeingUpdated }] =
    usePutApiV1CollectionByItemTypeAndItemIdMutation();
  const [createMutation, { isLoading: isBeingCreated }] =
    usePostApiV1CollectionByItemTypeMutation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((editMode || createMode) && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [editMode, createMode]);
  const deleteOption = async () => {
    await deleteMutation({
      itemId: id,
      itemType: dropDownType,
    }).unwrap();
    onDelete?.();
  };
  const saveOption = async () => {
    if (!editedName.trim()) {
      setIsInputError(true);
      return;
    }

    await updateMutation({
      createItemRequest: {
        name: editedName,
        materialKind: kind as MaterialKind,
      },
      itemId: id,
      itemType: dropDownType,
    }).unwrap();

    onUpdate?.();
    setIsInputError(false);
  };

  const createOption = async () => {
    if (!editedName.trim()) {
      setIsInputError(true);
      return;
    }

    await createMutation({
      createItemRequest: {
        name: editedName,
        materialKind: kind as MaterialKind,
      },
      itemType: dropDownType,
    }).unwrap();

    onCreate?.();
    setIsInputError(false);
  };

  const cancelEdit = () => {
    setEditedName(name);
    onCancelEditing?.();
    setIsInputError(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      return editMode ? saveOption() : createMode && createOption();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      return editMode ? cancelEdit() : createMode && cancelCreating?.();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);

    if (!event.target.value.trim()) {
      setIsInputError(true);
    } else {
      setIsInputError(false);
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-center gap-2 rounded-2xl border border-neutral-input bg-white px-3 py-2",
        !isInputError &&
          (editMode || createMode) &&
          "focus-within:border-b-primary-defaultt border border-neutral-input focus-within:border-b",
        isInputError && "border-danger-500 border",
        "focus-within:border-b focus-within:border-b-primary-default",
      )}
    >
      {editMode || createMode ? (
        <input
          ref={inputRef}
          type="text"
          value={editedName}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className="w-full text-sm underline focus-visible:outline-none"
          style={{
            width: `${Math.max(editedName.length + 1, 5)}ch`, // Dynamically grow the input width
            transition: "width 0.2s ease-in-out", // Smooth width transition
          }}
        />
      ) : (
        <span className="max-w-[8ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {name}
        </span>
      )}
      <FormOptionActions
        isLoading={isBeingUpdated || isBeingCreated}
        isBeingDeleted={isBeingDeleted}
        editMode={editMode}
        allowEdit={allowEdit}
        createMode={createMode}
        name={name}
        editedName={editedName}
        saveOption={saveOption}
        cancelEdit={cancelEdit}
        createOption={createOption}
        cancelCreating={cancelCreating}
        deleteOption={deleteOption}
        isInputError={isInputError}
      />
    </div>
  );
};
