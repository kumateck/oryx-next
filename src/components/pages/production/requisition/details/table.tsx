import { ColumnDef } from "@tanstack/react-table";

import { RequisitionItemDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

import { columns } from "./columns";

interface Props {
  lists: RequisitionItemDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<RequisitionItemDto[]>>;
  defaultColumns?: ColumnDef<RequisitionItemDto>[];
}
const TableForData = ({ lists, defaultColumns }: Props) => {
  // const columns = getColumns();

  return (
    <div className="w-full">
      <ListsTable data={lists} columns={defaultColumns || columns} />
    </div>
  );
};

export default TableForData;
