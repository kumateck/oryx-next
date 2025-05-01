import { Section } from "@/lib";
import Permissions from "./permission";

interface Props {
  permissions: Section[];
  firstPermission: Section;
  handleTogglePermission: (
    sectionIndex: number,
    childKey: string,
    type: string,
  ) => void;
  handleSectionToggle: (sectionIndex: number) => void;

  setPermissions: React.Dispatch<React.SetStateAction<Section[]>>;
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
          firstSection={firstPermission?.section}
        />
      )}
    </>
  );
};

export default FirstPermissionLoad;
