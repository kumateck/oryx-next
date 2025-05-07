import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
// import Edit from "./edit";
import { RevisionRequestDto } from "./type";

interface Props {
  lists: RevisionRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<RevisionRequestDto[]>>;
}
const TableForData = ({ lists, setItemLists }: Props) => {
  const columns = getColumns(setItemLists, lists);
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

export default TableForData;
