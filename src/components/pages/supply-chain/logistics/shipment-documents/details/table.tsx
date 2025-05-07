import { ListsTable } from "@/shared/datatable";

import { MaterialRequestDto } from "../create/type";
import { columns } from "./columns";

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
