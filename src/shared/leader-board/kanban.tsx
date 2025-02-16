import React, { useEffect, useState } from "react";

import { Column } from "./column";
import { Activity, DragItem, Task } from "./type";

// Define the structure for our columns.
interface ColumnsData {
  [key: string]: Task[];
}

interface Props {
  activities: Activity[];
}
const KanbanBoard: React.FC<Props> = ({ activities }) => {
  // const [columns, setColumns] = useState<ColumnsData>(activities);
  const [columns, setColumns] = useState(
    activities?.reduce((acc: any, activity) => {
      acc[activity.id] = activity.steps;
      return acc;
    }, {}),
  );

  // This function moves a task from one column to another.
  const handleDrop = (item: DragItem, targetColumn: string) => {
    if (item.fromColumn === targetColumn) return;

    setColumns((prev: ColumnsData) => {
      // Find the dragged task in the source column.
      const sourceTasks: Task[] = prev[item.fromColumn];
      const task: Task | undefined = sourceTasks.find(
        (t: Task) => t.id === item.id,
      );
      if (!task) return prev;

      return {
        ...prev,
        [item.fromColumn]: prev[item.fromColumn].filter(
          (t: Task) => t.id !== item.id,
        ),
        [targetColumn]: [...prev[targetColumn], task],
      };
    });
  };

  const [maxWidth, setMaxWidth] = useState("100%");

  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;

      const maxWidthCalculated = Math.max(screenWidth * 0.8, 768); // Adjust width as needed
      setMaxWidth(`${maxWidthCalculated}px`);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex flex-col justify-center" style={{ maxWidth }}>
      <div className="pr-5">
        <div className="flex flex-row gap-4 overflow-x-auto">
          {activities?.map((activity) => (
            <Column
              key={activity.id}
              columnId={activity.id}
              title={activity.name}
              steps={columns[activity.id] || []}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
