import { ColumnDef } from "@tanstack/react-table";

// import { useEffect } from "react";
import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
import { MaterialRequestDto } from "./type";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
  defaultColumns?: ColumnDef<MaterialRequestDto>[];
  notEdittable?: boolean;
}
const TableForData = ({ lists, defaultColumns }: Props) => {
  const columns = getColumns;

  return (
    <div className="w-full">
      <ListsTable data={lists} columns={defaultColumns ?? columns} />
    </div>
  );
};

export default TableForData;
