import { LucideIconProps } from "@/components/ui";

export type QCandQAReportItem = {
  name: string;
  path: string;
  icon: LucideIconProps;
};

export type QCandQAReportCategory = {
  title: string;
  items: QCandQAReportItem[];
};

export const QCandQACategoryReportItems: QCandQAReportCategory[] = [
  {
    title: "Material Management",
    items: [
      {
        name: "Material List Report",
        path: "/reports/qc-qa-reports/material-list-report",
        icon: "CalendarCheck",
      },
    ],
  },
];
