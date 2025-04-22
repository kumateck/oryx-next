"use client";

import { useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import DropdownBtns from "@/shared/btns/drop-btn";
import AbsenceRequest from "./absence-request";
import LeaveRequest from "./leave-request";
import ExitPassRequest from "./exit-pass-request";

const Page = () => {
  const [isAbsenceOpen, setIsAbsenceOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isAbsenceOpen && (
        <AbsenceRequest
          onClose={() => setIsAbsenceOpen(false)}
          isOpen={isAbsenceOpen}
        />
      )}
      {isLeaveOpen && (
        <LeaveRequest
          onClose={() => setIsLeaveOpen(false)}
          isOpen={isLeaveOpen}
        />
      )}

      {isExitOpen && (
        <ExitPassRequest
          onClose={() => setIsExitOpen(false)}
          isOpen={isExitOpen}
        />
      )}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Leave Management" />
        <div className="flex items-center justify-end gap-2">
          <DropdownBtns
            title="Request"
            icon="Plus"
            menus={[
              {
                name: "Leave Request",
                onClick: () => setIsLeaveOpen(true),
              },
              {
                name: "Absence Request",
                onClick: () => setIsAbsenceOpen(true),
              },
              {
                name: "Exit Request",
                onClick: () => setIsExitOpen(true),
              },
            ]}
          />
        </div>
      </div>
    </PageWrapper>
  );
};
export default Page;
