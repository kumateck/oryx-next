import { ColumnDef } from "@tanstack/react-table";

import { GrnDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";

interface Props {
  lists: GrnDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<GrnDto[]>>;
  defaultColumns?: ColumnDef<GrnDto>[];
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
