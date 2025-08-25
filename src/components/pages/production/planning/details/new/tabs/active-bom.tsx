import { ProductBillOfMaterialDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

export const ActiveBOMTab: React.FC<{ bom?: ProductBillOfMaterialDto }> = ({
  bom,
}) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Current Bill of Material
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Version: {bom?.version}</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-sm text-gray-600">
            Effective:{" "}
            {bom?.effectiveDate
              ? format(bom.effectiveDate, "MMM dd, yyyy")
              : "-"}
          </span>
          {bom?.isActive && (
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 ml-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UoM
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bom?.billOfMaterial?.items?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.order}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item?.material?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item?.material?.code}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item?.materialType?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.baseQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.baseUoM?.name} ({item?.baseUoM?.symbol})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
