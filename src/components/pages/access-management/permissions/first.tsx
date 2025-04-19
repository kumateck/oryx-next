import { Permission } from "@/lib/utils";

import Permissions from "./permission";

interface Props {
  permissions: Permission[];
  firstPermission: Permission;
  handleTogglePermission: (
    sectionIndex: number,
    childKey: string,
    type: string,
  ) => void;
  handleSectionToggle: (sectionIndex: number) => void;

  setPermissions: React.Dispatch<React.SetStateAction<Permission[]>>;
}
const FirstPermissionLoad = ({
  permissions,
  handleSectionToggle,
  handleTogglePermission,
  setPermissions,
  firstPermission,
}: Props) => {
  return (
    <>
      {firstPermission && (
        <Permissions
          setPermissions={setPermissions}
          permissions={permissions}
          handleSectionToggle={handleSectionToggle}
          handleTogglePermission={handleTogglePermission}
          firstSection={firstPermission?.module}
        />
      )}
    </>
  );
};

export default FirstPermissionLoad;
