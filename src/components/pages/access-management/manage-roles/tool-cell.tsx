import { ConfirmDeleteDialog } from "@/components/ui";
import { PermissionKeys, routes } from "@/lib";
import { useDeleteApiV1RoleByIdMutation } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
// import { useSelector } from "@/lib/redux/store";
import ThrowErrorMessage from "@/lib/throw-error";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Link from "next/link";
import { useUserPermissions } from "@/hooks/use-permission";

interface Props {
  roleId: string;
}
export default function ToolCell({ roleId }: Props) {
  const dispatch = useDispatch();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteMutation] = useDeleteApiV1RoleByIdMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation({ id: roleId }).unwrap();
      toast.success("Deleted successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  const { hasPermissionAccess } = useUserPermissions();
  return (
    <div className="">
      <ul className="flex gap-2  items-center justify-end">
        {/* {findRecordWithAccess(
          permissions,
          PermissionKeys.resourceManagement.rolesAndPermissions.editAndUpdate,
        ) && (
         import Link from "next/link";

        )} */}
        {hasPermissionAccess(
          PermissionKeys.humanResources.editRoleWithItsPermissions,
        ) && (
          <li>
            <Link href={routes.editRole(roleId)}>
              <span className="cursor-pointer text-primary-500 hover:cursor-pointer">
                <Pencil className="h-5 w-5" />
              </span>
            </Link>
          </li>
        )}
        {hasPermissionAccess(PermissionKeys.humanResources.deleteRole) && (
          <li
            onClick={() => {
              setIsDeleteOpen(true);
            }}
          >
            <span className="cursor-pointer text-danger-500">
              <Trash2 className="h-5 w-5" />
            </span>
          </li>
        )}
      </ul>
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
