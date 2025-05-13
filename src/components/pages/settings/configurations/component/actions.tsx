import { Icon } from "@/components/ui";
import { cn, findRecordWithFullAccess } from "@/lib/utils";

import ActionToolTip from "./action-tooltip";
import { useSelector } from "@/lib/redux/store";
import { PermissionKeys, Section } from "@/lib";

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
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const canDeleteProductCategory = findRecordWithFullAccess(
    permissions,
    PermissionKeys.categories.productCategory.delete,
  );
  const canDeleteRawCategory = findRecordWithFullAccess(
    permissions,
    PermissionKeys.categories.rawCategory.delete,
  );
  const canDeletePackageCategory = findRecordWithFullAccess(
    permissions,
    PermissionKeys.categories.packageCategory.delete,
  );
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
                "text-primary-500 animate-spin": isLoading,
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
            {(canDeletePackageCategory ||
              canDeleteProductCategory ||
              canDeleteRawCategory) && (
              <Icon
                name={isBeingDeleted ? "LoaderCircle" : "Trash2"}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  deleteOption();
                }}
                className={cn("text-danger-400", {
                  "text-primary-500 animate-spin": isBeingDeleted,
                })}
                size={20}
              />
            )}
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
                "text-primary-500 animate-spin": isLoading,
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
                  "text-primary-500 animate-spin": isBeingDeleted,
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
