import { ListsTable } from "@/app/shared/datatable";

import { getColumns } from "./columns";
import { FinishedRequestDto } from "./types";

interface Props {
  lists: FinishedRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<FinishedRequestDto[]>>;
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
