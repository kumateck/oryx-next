import { InventoryRequisitionSource, Option, splitWords } from "@/lib";
import { useLazyGetApiV1VendorsQuery } from "@/lib/redux/api/openapi.generated";
import { ListsTable, TableUpdateData } from "@/shared/datatable";

import { getColumns } from "./columns";
import { InventoryRequestDto } from "./type";

interface Props {
  lists: InventoryRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<InventoryRequestDto[]>>;
}
const TableForData = ({ lists, setItemLists }: Props) => {
  const [loadSuppliers] = useLazyGetApiV1VendorsQuery();

  const handleLoadVendors = async (rowIndex: number, value: unknown) => {
    if (Number(value) === 1) {
      TableUpdateData({
        rowIndex,
        columnId: "options",
        value: [],
        setTableData: setItemLists,
      });
    } else {
      const vendorLists = await loadSuppliers({
        page: 1,
        pageSize: 1000,
      }).unwrap();

      const vendorOptions = vendorLists?.data?.map((vendor) => ({
        label: vendor.name,
        value: vendor.id,
      })) as Option[];

      TableUpdateData({
        rowIndex,
        columnId: "options",
        value: vendorOptions,
        setTableData: setItemLists,
      });
    }
  };

  const columns = getColumns(setItemLists, sourceOptions, handleLoadVendors);

  return (
    <div className="w-full">
      <ListsTable data={lists} columns={columns} />
    </div>
  );
};

const sourceOptions = Object.values(InventoryRequisitionSource)
  .filter((enumValue) => typeof enumValue === "number")
  .map((enumValue) => {
    const enumKey =
      InventoryRequisitionSource[enumValue as InventoryRequisitionSource];
    return {
      label: splitWords(enumKey),
      value: String(enumValue),
    };
  }) as Option[];

export default TableForData;
