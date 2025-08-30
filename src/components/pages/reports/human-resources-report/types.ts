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
    title: "Attendance Reports",
    items: [
      {
        name: "Attendance Report",
        path: "",
        icon: "CalendarCheck",
      },
      {
        name: "Department Attendance Summary",
        path: "/reports/human-resources-report/departmental-attendance-report-summary",
        icon: "CalendarCheck",
      },
      {
        name: "Daily Attendance Overview",
        path: "/reports/human-resources-report/daily-attendance-overview",
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
    title: "Leave/Shift Schedule Management",
    items: [
      {
        name: "Leave Overview Report",
        path: "/reports/human-resources-report/leave-overview-report",
        icon: "CalendarCheck",
      },
    ],
  },
  {
    title: "Employee Management",
    items: [
      {
        name: "Permanent Staff Grade Count",
        path: "/reports/human-resources-report/parmanent-staff-grade-count-report",
        icon: "CalendarRange",
      },
      {
        name: "New Hires and Exit Count",
        path: "/reports/human-resources-report/new-hires-and-exit-count",
        icon: "CalendarRange",
      },
      {
        name: "Staff Total Report",
        path: "/reports/human-resources-report/total-staff-report",
        icon: "CalendarRange",
      },
      {
        name: "Staff Turnover Report",
        path: "/reports/human-resources-report/staff-turn-over-over-report",
        icon: "CalendarRange",
      },
      {
        name: "Staff Gender Report",
        path: "/reports/human-resources-report/staff-gender-ratio-report",
        icon: "CalendarRange",
      },
    ],
  },
];
