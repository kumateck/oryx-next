"use client";
import PageWrapper from "@/components/layout/wrapper";
// import WeeklyFullCalendar from "@/shared/calendar/weekly";
import PageTitle from "@/shared/title";
import { useParams } from "next/navigation";
import React from "react";

const ScheduleCalendarView = () => {
  const { id } = useParams();
  const scheduleId = id as string;
  console.log(scheduleId, "scheduleId");
  return (
    <PageWrapper>
      <PageTitle title="Calendar" />
      <div>{/* <WeeklyFullCalendar /> */}</div>
    </PageWrapper>
  );
};

export default ScheduleCalendarView;
