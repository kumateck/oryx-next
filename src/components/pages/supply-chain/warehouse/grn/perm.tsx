"use client";
import { findRecordWithFullAccess, PermissionKeys, Section } from "@/lib";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";
import GRNPage from ".";

const GRNPermission = () => {
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access

  const hasAccessToPacking = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.viewQuarantineRawMaterialsRecords,
  );

  const hasAccessToRaw = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.viewQuarantinePackagingMaterialsRecords,
  );

  console.log(hasAccessToPacking, hasAccessToRaw);

  if (!(hasAccessToRaw || hasAccessToPacking)) {
    //redirect to no access
    return <NoAccess />;
  }

  return <GRNPage />;
};

export default GRNPermission;
