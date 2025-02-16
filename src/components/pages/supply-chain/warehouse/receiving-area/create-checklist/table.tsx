import { ColumnDef } from "@tanstack/react-table";

import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
import { ChecklistBatchRequestDto } from "./types";

interface Props {
  lists: ChecklistBatchRequestDto[];
  setItemLists?: React.Dispatch<
    React.SetStateAction<ChecklistBatchRequestDto[]>
  >;
  defaultColumns?: ColumnDef<ChecklistBatchRequestDto>[];
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
