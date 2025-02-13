import { ColumnDef } from "@tanstack/react-table";

// import { useEffect } from "react";
import { ListsTable } from "@/shared/datatable";

import { getColumns } from "./columns";
// import { COLLECTION_TYPES, Option } from "@/lib";
// import {
//   PostApiV1CollectionApiArg,
//   usePostApiV1CollectionMutation,
// } from "@/lib/redux/api/openapi.generated";
import { GRNRequestDto } from "./types";

interface Props {
  lists: GRNRequestDto[];
  setItemLists?: React.Dispatch<React.SetStateAction<GRNRequestDto[]>>;
  defaultColumns?: ColumnDef<GRNRequestDto>[];
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
