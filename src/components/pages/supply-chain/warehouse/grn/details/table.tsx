import { ColumnDef } from "@tanstack/react-table";

import {
  MaterialBatch,
  MaterialBatchDto,
} from "@/lib/redux/api/openapi.generated";
// import { useEffect } from "react";
import { ListsTable } from "@/shared/datatable";

// import { COLLECTION_TYPES, Option } from "@/lib";
// import {
//   PostApiV1CollectionApiArg,
//   usePostApiV1CollectionMutation,
// } from "@/lib/redux/api/openapi.generated";
import { getColumns } from "./columns";

interface Props {
  lists: MaterialBatchDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<MaterialBatchDto[]>>;
  defaultColumns?: ColumnDef<MaterialBatch>[];
  isLoading?: boolean;
}
const TableForData = ({ lists, defaultColumns, isLoading }: Props) => {
  const columns = getColumns();

  return (
    <div className="w-full">
      <ListsTable
        isLoading={isLoading}
        data={lists as MaterialBatch[]}
        columns={defaultColumns || columns}
      />
    </div>
  );
};

export default TableForData;
