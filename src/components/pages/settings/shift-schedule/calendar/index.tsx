"use client";
import PageWrapper from "@/components/layout/wrapper";
import WeeklyFullCalendar from "@/shared/calendar/weekly";
import PageTitle from "@/shared/title";
import React from "react";

const ScheduleCalendarView = () => {
  return (
    <PageWrapper>
      <PageTitle title="Calendar" />
      <div>
        <WeeklyFullCalendar />
      </div>
    </PageWrapper>
  );
};

export default ScheduleCalendarView;
