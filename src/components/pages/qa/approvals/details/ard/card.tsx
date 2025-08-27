// components/MaterialReportCard.tsx

import { format } from "date-fns";
import React from "react";

interface Props {
  sampledOn: string;
  issueDate: string;
  issuedBy: string;
  arNumber: string;
  materialName: string;
  materialCode: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  stpNumber: string;
  specNumber: string;
}

export const MaterialReportCard: React.FC<Props> = ({
  sampledOn,
  issueDate,
  issuedBy,
  arNumber,
  materialName,
  materialCode,
  batchNumber,
  mfgDate,
  expDate,
  stpNumber,
  specNumber,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm text-sm text-neutral-700 space-y-4 ">
      <div className="flex flex-wrap justify-between text-xs text-neutral-500 font-medium">
        <span>
          Sampled on:{" "}
          <span className="text-black font-semibold">
            {sampledOn ? format(sampledOn, "MMM dd, yyyy") : "-"}
          </span>
        </span>
        <span>
          Issue Date:{" "}
          <span className="text-black font-semibold">
            {issueDate ? format(issueDate, "MMM dd, yyyy") : "-"}
          </span>
        </span>
        <span>
          Issued By:{" "}
          <span className="text-black font-semibold">{issuedBy}</span>
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-neutral-400 text-xs font-medium">
          AR Number: {arNumber}
        </div>
        <h2 className="text-lg font-semibold text-black">
          {materialName} ({materialCode})
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <div className="text-neutral-500">Batch Number:</div>
          <div className="font-semibold">{batchNumber}</div>
        </div>
        <div>
          <div className="text-neutral-500">Manufacturing Date:</div>
          <div className="font-semibold">
            {" "}
            {mfgDate ? format(mfgDate, "MMM dd, yyyy") : "-"}
          </div>
        </div>
        <div>
          <div className="text-neutral-500">Expiry Date:</div>
          <div className="font-semibold">
            {expDate ? format(expDate, "MMM dd, yyyy") : "-"}
          </div>
        </div>
        <div>
          <div className="text-neutral-500">STP Number:</div>
          <div className="font-semibold">{stpNumber}</div>
        </div>
        <div>
          <div className="text-neutral-500">Spec Number:</div>
          <div className="font-semibold">{specNumber}</div>
        </div>
      </div>
    </div>
  );
};
