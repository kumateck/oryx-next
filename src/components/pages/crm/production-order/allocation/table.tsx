import { ColumnDef } from "@tanstack/react-table";

// import { useEffect } from "react";
import { ListsTable } from "@/shared/datatable";

import { ExtendedOrderedProduct } from "./type";

interface Props {
  lists: ExtendedOrderedProduct[];
  setItemLists?: React.Dispatch<React.SetStateAction<ExtendedOrderedProduct[]>>;
  defaultColumns: ColumnDef<ExtendedOrderedProduct>[];
  notEdittable?: boolean;
}
const TableForData = ({ lists, defaultColumns }: Props) => {
  return (
    <div className="w-full">
      <ListsTable data={lists} columns={defaultColumns} />
    </div>
  );
};

export default TableForData;
