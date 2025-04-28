import { ListsTable } from "@/shared/datatable";

import { MaterialRequestDto } from "./types";
import { getColumns } from "./columns";
import ScrollableWrapper from "@/shared/scroll-wrapper";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
  isLoading?: boolean;
}
const TableForData = ({ lists, setItemLists, isLoading }: Props) => {
  return (
    <ScrollableWrapper className="w-full">
      <ListsTable
        isLoading={isLoading}
        data={lists}
        columns={getColumns(setItemLists)}
      />
    </ScrollableWrapper>
  );
};

export default TableForData;
