import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface InfoRowProps {
  label: string;
  value?: string | number | null;
  status?: "active" | "inactive" | null;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, status = null }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-600 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-900 text-right">{value || "N/A"}</span>
      {status && (
        <div
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status === "active" ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <AlertTriangle className="w-3 h-3 mr-1" />
          )}
          {status === "active" ? "Active" : "Inactive"}
        </div>
      )}
    </div>
  </div>
);

export default InfoRow;
