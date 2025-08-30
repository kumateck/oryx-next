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
    title: "Leave, Attendance, And Shift Schedule Management",
    items: [
      {
        name: "Attendance Report",
        path: "",
        icon: "CalendarCheck",
      },
      {
        name: "Department Attendance Summary",
        path: "",
        icon: "CalendarCheck",
      },
      {
        name: "Daily Attendance Overview",
        path: "",
        icon: "CalendarCheck",
      },
      {
        name: "Top 5 Frequent Absentees",
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
        path: "/hr/human-resources-report/new-hires-and-exit-count",
        icon: "CalendarRange",
      },
      {
        name: "Staff Total Report",
        path: "/hr/human-resources-report/total-staff-report",
        icon: "CalendarRange",
      },
      {
        name: "Staff Turnover Report",
        path: "",
        icon: "CalendarRange",
      },
      {
        name: "Staff Gender Report",
        path: "/hr/human-resources-report/staff-gender-ratio-report",
        icon: "CalendarRange",
      },
    ],
  },
];
