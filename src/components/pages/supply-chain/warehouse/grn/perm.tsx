"use client";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";
import GRNPage from ".";
import { useUserPermissions } from "@/hooks/use-permission";

const GRNPermission = () => {
  const { hasPermissionAccess } = useUserPermissions();

  const handlePermissions = (
    hasPermissionAccess: (value: string) => boolean,
  ) => {
    const hasAccessToPacking = hasPermissionAccess(
      PermissionKeys.warehouse.viewQuarantineRawMaterialsRecords,
    );

    const hasAccessToRaw = hasPermissionAccess(
      PermissionKeys.warehouse.viewQuarantinePackagingMaterialsRecords,
    );

    if (!hasAccessToRaw) {
      //redirect to no access
      return true;
    }
    if (!hasAccessToPacking) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {handlePermissions(hasPermissionAccess) ? <NoAccess /> : <GRNPage />}
    </div>
  );
};

export default GRNPermission;
