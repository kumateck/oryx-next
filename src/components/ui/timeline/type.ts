import { ActivityStepStatus, OperationAction } from "@/lib";

export interface TimelineItemProps {
  id?: string;
  title: string;
  status?: ActivityStepStatus;

  order?: number;
  isActive?: boolean;
  time?: string;
  description?: string;
  imagesLabel?: string;
  extra?: React.ReactNode;
  actions: {
    user: {
      id: string;
      fullname: string;
    };
    action: OperationAction;
    formId: string;
  }[];
  images?: {
    url?: string;
    color?: string;
    name: string;
  }[];
}
