import { ListsTable } from "@/shared/datatable";

import { columns } from "./columns";
import { MaterialRequestDto } from "./types";
import { useUserPermissions } from "@/hooks/use-permission";
import { PermissionKeys } from "@/lib";
import NoAccess from "@/shared/no-access";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
}

const TableForData = ({ lists }: Props) => {
  //Premissions checks
  const { hasPermissionAccess } = useUserPermissions();
  if (!hasPermissionAccess(PermissionKeys.logistics.viewWaybill)) {
    return <NoAccess />;
  }
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

export default TableForData;
