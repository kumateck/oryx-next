import Image from "next/image";
import React from "react";

import logo from "@/assets/oryx_logo_dark.png";
const HrPrintReportHeader = () => {
  return (
    <div>
      <div className="flex justify-between gap-4">
        {/* Company / HR Info */}
        <div className="flex flex-col gap-0.5 text-sm">
          <Image src={logo} alt="logo" width={100} height={100} />
          <span className="font-semibold">
            Entrance Pharmaceuticals & Research Centre
          </span>
          <span>Human Resource Department</span>
          <span>+233 55 958 5203</span>
          <span>hr@entrance.com</span>
          <span>www.entrancepharmaceuticals.com</span>
        </div>

        {/* Report Metadata */}
        <div className="flex flex-col gap-0.5 text-sm text-right">
          <span className="text-lg font-semibold capitalize">
            HR Management Resources Report
          </span>
          <span>Date: {new Date().toLocaleDateString()}</span>
          <span>Prepared By: HR Analytics Unit</span>
          <span>Report ID: HRR-2025-001</span>
        </div>
      </div>
    </div>
  );
};

export default HrPrintReportHeader;
