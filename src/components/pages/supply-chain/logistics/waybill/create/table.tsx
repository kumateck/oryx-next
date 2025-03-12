import { ListsTable } from "@/shared/datatable";

import { columns } from "./columns";
import { MaterialRequestDto } from "./types";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
}
const TableForData = ({ lists }: Props) => {
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

export default TableForData;
