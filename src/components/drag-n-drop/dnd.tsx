import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// import ListCard from "./container";

const ReactListDND = () => {
  return (
    <div className="w-full">
      <DndProvider backend={HTML5Backend}>{/* <ListCard /> */}</DndProvider>
    </div>
  );
};

export default ReactListDND;
