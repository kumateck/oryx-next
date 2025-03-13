import { ColumnDef } from "@tanstack/react-table";

import { ShipmentInvoiceItemDto } from "@/lib/redux/api/openapi.generated";
import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";

interface Props {
  lists: ShipmentInvoiceItemDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<ShipmentInvoiceItemDto[]>>;
  defaultColumns?: ColumnDef<ShipmentInvoiceItemDto>[];
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
