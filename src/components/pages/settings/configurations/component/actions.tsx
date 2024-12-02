import { Icon } from "@/components/ui";
import { cn } from "@/lib/utils";

import ActionToolTip from "./action-tooltip";

interface Props {
  isLoading: boolean;
  isBeingDeleted: boolean;
  editMode: boolean;
  allowEdit?: boolean;
  isInputError?: boolean;
  createMode: boolean;
  name: string;
  editedName: string;
  saveOption: (name: string) => void;
  cancelEdit: () => void;
  createOption: (name: string) => void;
  cancelCreating?: () => void;
  deleteOption: () => void;
}
export const FormOptionActions = ({
  editMode,
  createMode,
  name,
  editedName,
  saveOption,
  cancelEdit,
  createOption,
  cancelCreating,
  deleteOption,
  allowEdit,
  isLoading,
  isBeingDeleted,
  isInputError,
}: Props) => {
  return (
    <div className="flex items-center justify-center gap-0.5 [&>svg]:cursor-pointer">
      {editMode ? (
        <>
          <ActionToolTip title="Update">
            <Icon
              name={isLoading ? "LoaderCircle" : "Check"}
              onClick={(event) => {
                if (!isInputError) {
                  event.preventDefault();
                  event.stopPropagation();
                  saveOption(editedName || name);
                }
              }}
              className={cn("text-success-500", {
                "animate-spin text-primary-500": isLoading,
              })}
              size={20}
            />
          </ActionToolTip>
          <ActionToolTip title="Cancel">
            <Icon
              name="X"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                cancelEdit();
              }}
              className="text-neutral-400"
              size={20}
            />
          </ActionToolTip>
          <ActionToolTip title="Delete">
            <Icon
              name={isBeingDeleted ? "LoaderCircle" : "Trash2"}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                deleteOption();
              }}
              className={cn("text-danger-400", {
                "animate-spin text-primary-500": isBeingDeleted,
              })}
              size={20}
            />
          </ActionToolTip>
        </>
      ) : createMode ? (
        <>
          <ActionToolTip title="Save">
            <Icon
              name={isLoading ? "LoaderCircle" : "Check"}
              onClick={() => {
                if (!isInputError) {
                  createOption(editedName);
                }
              }}
              className={cn("text-success-500", {
                "animate-spin text-primary-500": isLoading,
              })}
              size={20}
            />
          </ActionToolTip>

          <ActionToolTip title="Cancel">
            <Icon
              name="X"
              onClick={cancelCreating}
              className="text-neutral-400"
              size={20}
            />
          </ActionToolTip>
        </>
      ) : (
        <>
          {allowEdit && (
            <ActionToolTip title="Delete">
              <Icon
                name={isBeingDeleted ? "LoaderCircle" : "Trash2"}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  deleteOption();
                }}
                className={cn("text-danger-400", {
                  "animate-spin text-primary-500": isBeingDeleted,
                })}
                size={20}
              />
            </ActionToolTip>
          )}
        </>
      )}
    </div>
  );
};
