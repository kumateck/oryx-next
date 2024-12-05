import { ColumnDef } from "@tanstack/react-table";

// import { useEffect } from "react";
import { ListsTable } from "@/app/shared/datatable";

// import { COLLECTION_TYPES, Option } from "@/lib";
// import {
//   PostApiV1CollectionApiArg,
//   usePostApiV1CollectionMutation,
// } from "@/lib/redux/api/openapi.generated";
import { getColumns } from "./columns";
import { MaterialRequestDto } from "./type";

interface Props {
  lists: MaterialRequestDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
  defaultColumns?: ColumnDef<MaterialRequestDto>[];
}
const TableForData = ({ lists, defaultColumns }: Props) => {
  // const [loadCollection, { data: collectionResponse }] =
  //   usePostApiV1CollectionMutation({});

  // useEffect(() => {
  //   loadCollection({
  //     body: [COLLECTION_TYPES.UnitOfMeasure],
  //   } as PostApiV1CollectionApiArg).unwrap();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // const unitOfMeasureOptions = collectionResponse?.[
  //   COLLECTION_TYPES.UnitOfMeasure
  // ]?.map((uom) => ({
  //   label: uom.name,
  //   value: uom.id,
  // })) as Option[];

  // console.log(unitOfMeasureOptions, "unitOfMeasureOptions");
  const columns = getColumns();

  return (
    <div className="w-full">
      <ListsTable data={lists} columns={defaultColumns || columns} />
    </div>
  );
};

export default TableForData;
