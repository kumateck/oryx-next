"use client";
import PageWrapper from "@/components/layout/wrapper";
import { cn } from "@/lib";
import { useGetApiV1ShiftSchedulesByIdQuery } from "@/lib/redux/api/openapi.generated";
import MonthlyWeeklyCalendar from "@/shared/calendar/monthly";
import WeeklyFullCalendar from "@/shared/calendar/weekly";
import YearlyCalendar from "@/shared/calendar/yearly";

import PageTitle from "@/shared/title";
import { useParams } from "next/navigation";
import React from "react";

const tabs = ["Weekly", "Monthly", "Yearly"];
const ScheduleCalendarView = () => {
  const { id } = useParams();
  const scheduleId = id as string;

  const { data } = useGetApiV1ShiftSchedulesByIdQuery({
    id: scheduleId,
  });

  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <PageWrapper>
      <PageTitle title="Calendar" />
      <div>
        {
          <div
            className={cn(
              "flex h-10 w-full items-center gap-1 space-x-1 rounded-full border border-neutral-input bg-white p-1",
            )}
          >
            {tabs?.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => handleTabClick(idx)}
                className={`w-full rounded-full px-4 py-1 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === idx
                    ? "h-full bg-primary-default text-white shadow-md"
                    : "text-neutral-default"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        }
      </div>
      <div>
        {activeTab === 0 && (
          <WeeklyFullCalendar scheduleId={scheduleId} schedule={data} />
        )}
        {activeTab === 1 && (
          <MonthlyWeeklyCalendar scheduleId={scheduleId} schedule={data} />
        )}
        {activeTab === 2 && (
          <YearlyCalendar scheduleId={scheduleId} schedule={data} />
        )}
      </div>
    </PageWrapper>
  );
};

export default ScheduleCalendarView;
