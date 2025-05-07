import { useEffect } from "react";

import LoadingSkeleton from "../skeleton";
import FirstPermissionLoad from "./first";
import { Section } from "@/lib";

interface Props {
  triggerLoadingPermissions: (roleId: string) => void;
  permissions: Section[];
  handleTogglePermission: (
    sectionIndex: number,
    childKey: string,
    type: string,
  ) => void;
  handleSectionToggle: (sectionIndex: number) => void;
  firstRoleId: string;
  setPermissions: React.Dispatch<React.SetStateAction<Section[]>>;
  isLoading?: boolean;
}
const PermissionLoad = ({
  triggerLoadingPermissions,
  permissions,
  handleSectionToggle,
  handleTogglePermission,
  firstRoleId,
  setPermissions,
  isLoading,
}: Props) => {
  useEffect(() => {
    triggerLoadingPermissions(firstRoleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstRoleId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          {permissions && (
            <FirstPermissionLoad
              setPermissions={setPermissions}
              permissions={permissions}
              handleSectionToggle={handleSectionToggle}
              handleTogglePermission={handleTogglePermission}
              firstPermission={permissions[0]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PermissionLoad;
