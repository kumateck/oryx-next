import React, { useEffect } from "react";

import TableForData from "./table";
import { MaterialRequestDto } from "./type";

interface Props {
  poId: string;
  lists: MaterialRequestDto[];
  updateParentState?: (poId: string, updatedItem: MaterialRequestDto[]) => void;
}
const PurchaseOrders = ({ poId, lists, updateParentState }: Props) => {
  const [materialLists, setMaterialLists] =
    React.useState<MaterialRequestDto[]>(lists);
  // console.log(materialLists, "materialLists newwewe");
  // Handle item update in local state and also update parent state
  useEffect(() => {
    if (materialLists) {
      if (updateParentState) updateParentState(poId, materialLists);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialLists]);

  return (
    <div className="">
      <TableForData lists={materialLists} setItemLists={setMaterialLists} />
    </div>
  );
};

export default PurchaseOrders;
