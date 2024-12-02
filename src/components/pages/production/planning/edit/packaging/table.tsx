import { ListsTable } from "@/app/shared/datatable";

import { getColumns } from "./columns";
// import Edit from "./edit";
import { PackagingRequestDto } from "./types";

interface Props {
  lists: PackagingRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>;
}
const TableForData = ({ lists, setItemLists }: Props) => {
  const columns = getColumns(setItemLists);
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

export default TableForData;
