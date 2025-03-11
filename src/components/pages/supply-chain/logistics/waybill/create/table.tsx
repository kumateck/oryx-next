import { ColumnDef } from "@tanstack/react-table";

import { ShipmentInvoiceItemDtoRead } from "@/lib/redux/api/openapi.generated";
// import { useEffect } from "react";
import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";

// import { COLLECTION_TYPES, Option } from "@/lib";
// import {
//   PostApiV1CollectionApiArg,
//   usePostApiV1CollectionMutation,
// } from "@/lib/redux/api/openapi.generated";

interface Props {
  lists: ShipmentInvoiceItemDtoRead[];
  setItemLists?: React.Dispatch<
    React.SetStateAction<ShipmentInvoiceItemDtoRead[]>
  >;
  defaultColumns?: ColumnDef<ShipmentInvoiceItemDtoRead>[];
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
