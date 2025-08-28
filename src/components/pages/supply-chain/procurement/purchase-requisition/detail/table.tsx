import { Option } from "@/lib";
import {
  SupplierType,
  useLazyGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery,
} from "@/lib/redux/api/openapi.generated";
import { ListsTable, TableUpdateData } from "@/shared/datatable";

import { getColumns } from "./columns";
import { MaterialRequestDto } from "./type";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
}
const TableForData = ({ lists, setItemLists }: Props) => {
  const [loadSuppliers] =
    useLazyGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery();

  const handleLoadingSupplier = async (rowIndex: number, value: unknown) => {
    console.log(value, "source value");

    const supplierLists = await loadSuppliers({
      materialId: lists[rowIndex].materialId,
      type: value as SupplierType,
    }).unwrap();

    const supplierOptions = supplierLists?.map((supplier) => ({
      label: supplier.name,
      value: supplier.id,
    })) as Option[];
    TableUpdateData({
      rowIndex,
      columnId: "sourceSuppliers",
      value: [],
      setTableData: setItemLists,
    });
    TableUpdateData({
      rowIndex,
      columnId: "options",
      value: supplierOptions,
      setTableData: setItemLists,
    });
  };

  const columns = getColumns(
    setItemLists,
    sourceOptions,
    handleLoadingSupplier,
  );

  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

const sourceOptions = [
  {
    label: "Foreign",
    value: "0",
  },
  {
    label: "Local",
    value: "1",
  },
];
export default TableForData;
