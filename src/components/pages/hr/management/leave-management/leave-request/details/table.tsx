import { ListsTable } from "@/shared/datatable";

import { columns } from "./columns";
import { LeaveRequestDto } from "@/lib/redux/api/openapi.generated";

interface Props {
  lists: LeaveRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<LeaveRequestDto[]>>;
}
const TableForData = ({ lists }: Props) => {
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

export default TableForData;
