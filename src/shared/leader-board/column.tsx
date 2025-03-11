import { DropTargetMonitor, useDrop } from "react-dnd";

import { cn } from "@/lib";

import ScrollableWrapper from "../scroll-wrapper";
import { CardItem } from "./item";
import { ColumnProps, DragItem } from "./type";

export const Column: React.FC<ColumnProps> = ({
  columnId,
  title,
  steps,
  onDrop,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: DragItem) => {
      onDrop(item, columnId);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Change background when an item is hovered over.
  const backgroundColor = isOver ? "bg-green-100" : "bg-gray-100";

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={cn(
        "min-h-svh w-72 shrink-0 overflow-y-auto rounded-2xl p-4",
        backgroundColor,
      )}
    >
      <div className="mb-2 flex h-12 items-center justify-between gap-2 border-b">
        <span className="font-semibold leading-tight">{title}</span>
        {steps.length > 0 && (
          <span className="text-xs font-semibold">{steps.length}</span>
        )}
      </div>
      <ScrollableWrapper>
        {steps?.map((step) => (
          <CardItem key={step.id} step={step} columnId={columnId} />
        ))}
      </ScrollableWrapper>
    </div>
  );
};
