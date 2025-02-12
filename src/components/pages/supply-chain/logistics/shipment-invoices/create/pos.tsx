import React from "react";

import TableForData from "./table";
import { MaterialRequestDto } from "./type";

interface Props {
  lists: MaterialRequestDto[];
}
const PurchaseOrders = ({ lists }: Props) => {
  const [materialLists, setMaterialLists] =
    React.useState<MaterialRequestDto[]>(lists);
  console.log(materialLists, "materialLists");
  return (
    <div className="">
      <TableForData lists={materialLists} setItemLists={setMaterialLists} />
    </div>
  );
};

export default PurchaseOrders;
