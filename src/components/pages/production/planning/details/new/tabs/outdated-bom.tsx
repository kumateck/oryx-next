import { sanitizeNumber } from "@/lib";
import { ProductBillOfMaterialDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { AlertTriangle, FileText } from "lucide-react";

export const OutdatedBOMsTab: React.FC<{
  boms?: ProductBillOfMaterialDto[] | null;
}> = ({ boms }) =>
  sanitizeNumber(boms?.length) === 0 ? (
    <div className="text-center py-12 text-gray-500">
      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>No outdated Bill of Materials data available.</p>
    </div>
  ) : (
    <div className="space-y-6">
      {boms?.map((bom) => (
        <div
          key={bom.version}
          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Bill of Material
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">
                Version: {bom.version}
              </span>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <span className="text-sm text-gray-600">
                Effective:{" "}
                {bom.effectiveDate
                  ? format(bom?.effectiveDate, "MMM dd, yyyy")
                  : "-"}
              </span>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 ml-2">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Inactive
              </div>
            </div>
          </div>
          {/* You can add table rendering for each outdated BOM here if needed */}
        </div>
      ))}
    </div>
  );
