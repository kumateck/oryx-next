export interface DragItem {
  type: string;
  id: string;
  fromColumn: string;
}

export interface CardItemProps {
  step: Task;
  columnId: string;
}

export interface Task {
  id: string;
  activityId: string;
  productName: string;
  productCode: string;
  scheduleCode: string;
  batchNumber: string;
  createdAt?: string;
  images?: {
    url?: string;
    name: string;
  }[];
}
export interface ColumnProps {
  columnId: string;
  title: string;
  steps: Task[];
  onDrop: (item: DragItem, targetColumn: string) => void;
}

export interface Activity {
  steps: Task[];
  id: string;
  name: string;
  description: string;
}
