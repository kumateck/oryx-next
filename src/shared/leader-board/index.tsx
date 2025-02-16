import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import KanbanBoard from "./kanban";
import { Activity } from "./type";

interface Props {
  activities: Activity[];
}
const LeaderBoard = ({ activities }: Props) => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {activities.length > 0 && <KanbanBoard activities={activities} />}
      </DndProvider>
    </div>
  );
};

export default LeaderBoard;
