import { FormResponseDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import React from "react";

export interface TestItem {
  no: number;
  test: string;
  specification: string;
  result: string;
}

export interface CertificateOfAnalysisProps {
  batchNo: string;
  dateOfMfg: string;
  dateOfExp: string;
  qcArNo: string;
  pageNumber: number;
  sampledDate: string;
  analysedDate?: string;
  productName: string;
  composition?: { name: string; quantity: string }[];
  excipients?: string;
  packStyle?: string;
  shelfLife?: string;
  tests?: FormResponseDto[];
  comment: string;
}

const CertificateOfAnalysis: React.FC<CertificateOfAnalysisProps> = ({
  batchNo,
  dateOfMfg,
  dateOfExp,
  qcArNo,
  pageNumber,
  sampledDate,
  analysedDate,
  productName,
  composition,
  excipients,
  packStyle,
  shelfLife,
  tests,
  comment,
}) => {
  return (
    <div className="max-w-4xl mx-auto border text-sm font-sans text-gray-900 p-6 bg-white">
      <div className="text-center mb-4 space-y-1">
        <h2 className="font-bold text-base">QUALITY CONTROL DEPARTMENT</h2>
        <h3 className="font-semibold text-sm">
          CERTIFICATE OF ANALYSIS FOR MATERIAL
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 border border-gray-400 p-4 text-sm mb-4">
        <div>
          <p>
            <span className="font-semibold">Batch No.:</span>{" "}
            <span className="font-bold">{batchNo}</span>
          </p>
          <p>
            <span className="font-semibold">Date of Mfg.:</span>{" "}
            {dateOfMfg ? format(dateOfMfg, "MMM dd, yyyy") : "-"}
          </p>
          <p>
            <span className="font-semibold">Date of Exp.:</span>{" "}
            {dateOfExp ? format(dateOfExp, "MMM dd, yyyy") : "-"}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Page:</span> 1 of {pageNumber}
          </p>
          <p>
            <span className="font-semibold">Sampled Date:</span>{" "}
            {sampledDate ? format(sampledDate, "MMM dd, yyyy") : "-"}
          </p>
          <p>
            <span className="font-semibold">Analysed Date:</span>{" "}
            {analysedDate ? format(analysedDate, "MMM dd, yyyy") : "-"}
          </p>
        </div>
        <div className="col-span-2">
          <p>
            <span className="font-semibold">QC AR No.:</span> {qcArNo}
          </p>
        </div>
      </div>

      <div className="border border-gray-400 p-4 text-sm mb-4 space-y-2">
        <p className="font-semibold">{productName}</p>
        <p className="font-semibold">Composition</p>
        <p className="ml-4">Each Uncoated Tablet Contains:</p>
        <ul className="ml-6 list-disc">
          {composition?.map((item, idx) => (
            <li key={idx}>
              {item.name} .......... {item.quantity}
            </li>
          ))}
          <li>
            Excipients .......... <span className="italic">{excipients}</span>
          </li>
        </ul>
        <p>
          <span className="font-semibold">Pack Style:</span> {packStyle}
        </p>
        <p>
          <span className="font-semibold">Shelf Life:</span> {shelfLife}
        </p>
      </div>

      <table className="w-full table-auto border border-gray-400 text-sm mb-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-400 p-2 w-10">NO.</th>
            <th className="border border-gray-400 p-2">TEST</th>
            <th className="border border-gray-400 p-2">SPECIFICATION</th>
            <th className="border border-gray-400 p-2">RESULT</th>
          </tr>
        </thead>
        <tbody>
          {tests?.map((item, idx) => (
            <tr key={idx}>
              <td className="border border-gray-400 p-2">{idx + 1}</td>
              <td className="border border-gray-400 p-2 whitespace-pre-wrap">
                {item.formField?.question?.label}
              </td>
              <td className="border border-gray-400 p-2 whitespace-pre-wrap">
                {item.formField?.description}
              </td>
              <td className="border border-gray-400 p-2">{item?.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm font-semibold">
        Comment: <span className="font-normal">{comment}</span>
      </div>
    </div>
  );
};

export default CertificateOfAnalysis;
