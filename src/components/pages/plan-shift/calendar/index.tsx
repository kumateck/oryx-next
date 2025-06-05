"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useGetApiV1ShiftSchedulesByIdQuery } from "@/lib/redux/api/openapi.generated";
import WeeklyFullCalendar from "@/shared/calendar/weekly";

import PageTitle from "@/shared/title";
import { useParams } from "next/navigation";
import React from "react";

const ScheduleCalendarView = () => {
  const { id } = useParams();
  const scheduleId = id as string;

  const { data } = useGetApiV1ShiftSchedulesByIdQuery({
    id: scheduleId,
  });

  return (
    <PageWrapper>
      <PageTitle title="Calendar" />
      <div>
        <WeeklyFullCalendar scheduleId={scheduleId} schedule={data} />
      </div>
    </PageWrapper>
  );
};

export default ScheduleCalendarView;
