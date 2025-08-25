"use client";
import React from "react";
import { Package, Shield, Factory } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PageTitle from "@/shared/title";
import ScrollableWrapper from "@/shared/scroll-wrapper";

const InfoCardSkeleton: React.FC<{
  icon: React.ElementType;
  title: string;
}> = ({ icon: Icon, title }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="space-y-3">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  </div>
);

const ActiveBOMTabSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-2 flex-wrap">
          <Skeleton className="h-4 w-20" />
          <span className="text-gray-300 hidden sm:inline">|</span>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-16 rounded-full" />
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
              {[...Array(3)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-8" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
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

export const PackingTabSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thickness
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Standards
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(2)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const ProcedureTabSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 bg-white"
          >
            <div className="flex items-start gap-4">
              <Skeleton className="flex-shrink-0 w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-6 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-32 mb-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, colIndex) => (
                    <div key={colIndex}>
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[...Array(2)].map((_, tagIndex) => (
                          <Skeleton
                            key={tagIndex}
                            className="h-6 w-20 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const OutdatedBOMTabSkeleton: React.FC = () => (
  <div className="space-y-6">
    {[...Array(2)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-50 rounded-xl p-6 border border-gray-200"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-4 w-20" />
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ProductDetailSkeleton: React.FC = () => {
  const tabs = ["Active BOM", "Outdated BOM", "Packing", "Procedure"];

  return (
    <ScrollableWrapper className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Skeleton className="h-5 w-5" />
              <PageTitle title={"Products"} />
            </div>
            <div className="flex items-center gap-1 rounded-2xl border border-neutral-input bg-white px-3 py-1.5">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <Skeleton className="h-6 w-24" />
                <span className="text-gray-300 hidden sm:inline">|</span>
                <Skeleton className="h-4 w-32" />
                <span className="text-gray-300 hidden sm:inline">|</span>
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-64 mb-3" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <InfoCardSkeleton icon={Package} title="Product Information" />
            <InfoCardSkeleton icon={Shield} title="Storage & Safety" />
            <InfoCardSkeleton icon={Factory} title="Production Details" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 -mb-px">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className="py-4 px-1 text-sm font-medium border-b-2 border-blue-500 text-blue-600"
                >
                  {tab}
                </div>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <ActiveBOMTabSkeleton />
          </div>
        </div>
      </main>
    </ScrollableWrapper>
  );
};

export default ProductDetailSkeleton;
