import { ActivityStepStatus } from "@/lib";

export interface TimelineItemProps {
  id?: string;
  title: string;
  status?: ActivityStepStatus;
  time?: string;
  description?: string;
  imagesLabel?: string;
  extra?: React.ReactNode;
  images?: {
    url?: string;
    color?: string;
    name: string;
  }[];
}
