import React from "react";
import GridLayout, { Layout } from "react-grid-layout";

export interface WidgetLayout extends Layout {
  i: string; // Unique identifier (UUID)
  name: string;
}
const ListDragTable = () => {
  const [layout, setLayout] = React.useState<WidgetLayout[]>(lists);
  const onLayoutChange = (newLayout: Layout[]) => {
    // Update the layout state with the new positions

    setLayout(newLayout as WidgetLayout[]);
  };
  return (
    <div className="h-96 w-full overflow-auto">
      <GridLayout
        layout={layout}
        cols={4}
        rowHeight={15}
        width={1370}
        onLayoutChange={(newLayout) =>
          onLayoutChange(newLayout as WidgetLayout[])
        }
        preventCollision={false}
        compactType="vertical"
        isResizable={false}
        allowOverlap={false}
        // isDraggable={isEditPosition} // Enable dragging only if isEditPosition is true
        // isDroppable={isEditPosition} // Enable dropping only if isEditPosition is true
      >
        {layout?.map((widget) => (
          <div
            key={widget.i}
            className="cursor-pointer rounded-xl border bg-neutral-hover"
          >
            <div className="w-full p-2">
              <span className="text-lg text-neutral-dark">{widget.i}</span>
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default ListDragTable;

const lists = [
  {
    i: "1",
    name: "desmond",
    x: 0,
    y: 0,
    w: 4,
    h: 2,
  },
  {
    i: "2",
    name: "reagan",
    x: 0,
    y: 1,
    w: 4,
    h: 2,
  },
  {
    i: "3",
    name: "slyvester",
    x: 0,
    y: 2,
    w: 4,
    h: 2,
  },
  {
    i: "4",
    name: "baggio",
    x: 0,
    y: 3,
    w: 4,
    h: 2,
  },
  {
    i: "5",
    name: "clinton",
    x: 0,
    y: 4,
    w: 4,
    h: 2,
  },
  {
    i: "6",
    name: "herbert",
    x: 0,
    y: 5,
    w: 4,
    h: 2,
  },
  {
    i: "7",
    name: "kennedy",
    x: 0,
    y: 6,
    w: 4,
    h: 2,
  },
];
