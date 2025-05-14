"use client";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";
import GRNPage from ".";

const GRNPermission = () => {
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  const handlePermissions = (permissions: Section[]) => {
    const hasAccessToPacking = findRecordWithAccess(
      permissions,
      PermissionKeys.warehouse.viewQuarantineRawMaterialsRecords,
    );

    const hasAccessToRaw = findRecordWithAccess(
      permissions,
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
    <div>{handlePermissions(permissions) ? <NoAccess /> : <GRNPage />}</div>
  );
};

export default GRNPermission;
