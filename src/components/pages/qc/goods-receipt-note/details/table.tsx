import { ColumnDef } from "@tanstack/react-table";

import { MaterialBatchDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";
import { getColumns } from "./columns";

interface Props {
  lists: MaterialBatchDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<MaterialBatchDto[]>>;
  defaultColumns?: ColumnDef<MaterialBatchDto>[];
  isLoading?: boolean;
}
const TableForData = ({ lists, defaultColumns, isLoading }: Props) => {
  const columns = getColumns();

  return (
    <div className="w-full">
      <ListsTable
        isLoading={isLoading}
        data={lists}
        columns={defaultColumns || columns}
      />
    </div>
  );
};

export default TableForData;
