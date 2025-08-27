import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
// import Edit from "./edit";
import { PackingStyleRequestDto } from "./types";

interface Props {
  lists: PackingStyleRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<PackingStyleRequestDto[]>>;
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
