import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
import { MaterialRequestDto } from "./type";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
  isLoading?: boolean;
  currency?: string;
}
const TableForData = ({ lists, setItemLists, isLoading, currency }: Props) => {
  const columns = getColumns(setItemLists, currency);
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} isLoading={isLoading} />
    </div>
  );
};

export default TableForData;
