import { ColumnDef } from "@tanstack/react-table";

import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
import { ChecklistDetailsDto } from "./types";

interface Props {
  lists: ChecklistDetailsDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<ChecklistDetailsDto[]>>;
  defaultColumns?: ColumnDef<ChecklistDetailsDto>[];
}
const TableForData = ({ lists, defaultColumns }: Props) => {
  const columns = getColumns();

  return (
    <div className="w-full">
      <ListsTable data={lists} columns={defaultColumns || columns} />
    </div>
  );
};

export default TableForData;
