import { LucideIconProps } from "@/components/ui";

export type HrReportItem = {
  name: string;
  path: string;
  icon: LucideIconProps;
};

export type HrReportCategory = {
  title: string;
  items: HrReportItem[];
};

export const hrCategoryReportItems: HrReportCategory[] = [
  {
    title: "Shift Schedule Management",
    items: [
      {
        name: "Attendance Report",
        path: "",
        icon: "CalendarCheck",
      },
    ],
  },
  {
    title: "Employee Management",
    items: [
      {
        name: "Permanent Staff Grade Count",
        path: "/hr/human-resources-report/parmanent-staff-grade-count-report",
        icon: "CalendarRange",
      },
      {
        name: "New Hires and Exit Count",
        path: "",
        icon: "CalendarRange",
      },
      {
        name: "Staff Total Report",
        path: "",
        icon: "CalendarRange",
      },
      {
        name: "Staff Turnover Report",
        path: "",
        icon: "CalendarRange",
      },
      {
        name: "Staff Gender Report",
        path: "",
        icon: "CalendarRange",
      },
    ],
  },
];
