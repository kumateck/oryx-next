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
  // const { data: vendorLists } = useGetApiV1ProcurementSupplierQuery({
  //   page: 1,
  //   pageSize: 10000000,
  // });
  const [loadSuppliers] =
    useLazyGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery();

  const handleLoadingSupplier = async (rowIndex: number, value: unknown) => {
    const vendorLists = await loadSuppliers({
      materialId: lists[rowIndex].materialId,
      type: value as SupplierType,
    }).unwrap();

    const vendorOptions = vendorLists?.map((vendor) => ({
      label: vendor.name,
      value: vendor.id,
    })) as Option[];

    TableUpdateData({
      rowIndex,
      columnId: "options",
      value: vendorOptions,
      setTableData: setItemLists,
    });

    // console.log(vendorOptions, "vendorOptions", rowIndex, columnId, value);
  };

  // console.log(vendorOptions, "vendorOptions");
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
    label: "Foreign Procurement",
    value: "0",
  },
  {
    label: "Local Procurement",
    value: "1",
  },
  {
    label: "Other Warehouses",
    value: "2",
  },
];
export default TableForData;
