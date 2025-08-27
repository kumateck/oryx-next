"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Package, Shield, Factory } from "lucide-react";
import InfoCard from "./new/info-card";
import InfoRow from "./new/info-row";
import { useParams, useRouter } from "next/navigation";
import { useGetApiV1ProductByProductIdQuery } from "@/lib/redux/api/openapi.generated";
import { routes } from "@/lib";
import {
  ActiveBOMTab,
  OutdatedBOMsTab,
  PackingTab,
  ProcedureTab,
} from "./new/tabs";
import Link from "next/link";
import { Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import ProductDetailSkeleton from "./new/skeleton";
import PageWrapper from "@/components/layout/wrapper";

const ProductDetailPage: React.FC = () => {
  const router = useRouter();

  const { id } = useParams();
  const productId = id as string;
  const { data: productData, isLoading } = useGetApiV1ProductByProductIdQuery({
    productId,
  });
  const [activeTab, setActiveTab] = useState<string>("Active BOM");

  const tabs = [
    "Active BOM",
    "Outdated BOM",
    "Packaging",
    "Packing Style",
    "Procedure",
  ];
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  return (
    <ScrollableWrapper className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <PageWrapper>
          <div className="flex items-center justify-between">
            <button
              className="group flex items-center gap-1 hover:cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <Icon name="ArrowLeft" className="h-5 w-5" />
              <div className="group-hover:underline">
                <PageTitle title={"Products"} />
              </div>
            </button>
            <Link href={routes.editPlanning(productId)}>
              <div className="flex items-center gap-1 rounded-2xl border border-neutral-input bg-white px-3 py-1.5 text-neutral-secondary hover:bg-neutral-hover">
                <Icon name="Pencil" className="size-4" />
                <span className="text-sm">Edit Product</span>
              </div>
            </Link>
          </div>
        </PageWrapper>
      </header>

      <PageWrapper>
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="text-lg font-semibold text-blue-600">
                  {productData?.code}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-sm text-gray-600">
                  Created{" "}
                  {productData?.createdAt
                    ? format(productData?.createdAt, "MMM dd, yyyy 'at' h:mma")
                    : "-"}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-sm text-gray-600">
                  by {productData?.createdBy?.name}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {productData?.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {productData?.category?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <InfoCard icon={Package} title="Product Information">
              <div className="space-y-1">
                <InfoRow
                  label="Generic Name"
                  value={productData?.genericName}
                />
                <InfoRow
                  label="Filled Volume"
                  value={productData?.filledWeight}
                />
                <InfoRow
                  label="Package Style"
                  value={productData?.packageStyle}
                />
                <InfoRow
                  label="Department"
                  value={productData?.department?.name}
                />
              </div>
            </InfoCard>
            <InfoCard icon={Shield} title="Storage & Safety">
              <div className="space-y-1">
                <InfoRow
                  label="Storage Condition"
                  value={productData?.storageCondition}
                />
                <InfoRow label="Shelf Life" value={productData?.shelfLife} />
                <InfoRow label="Action & Use" value={productData?.actionUse} />
              </div>
            </InfoCard>
            <InfoCard icon={Factory} title="Production Details">
              <div className="space-y-1">
                <InfoRow
                  label="Equipment"
                  value={productData?.equipment?.name}
                />
                <InfoRow
                  label="Machine ID"
                  value={productData?.equipment?.machineId}
                />
                <InfoRow
                  label="BOM Status"
                  value={
                    productData?.currentBillOfMaterial?.isActive
                      ? "Active"
                      : "Inactive"
                  }
                  status={
                    productData?.currentBillOfMaterial?.isActive
                      ? "active"
                      : "inactive"
                  }
                />
              </div>
            </InfoCard>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === "Active BOM" && (
              <ActiveBOMTab bom={productData?.currentBillOfMaterial} />
            )}
            {activeTab === "Outdated BOM" && (
              <OutdatedBOMsTab boms={productData?.outdatedBillOfMaterials} />
            )}
            {activeTab === "Packing" && (
              <PackingTab packages={productData?.packages} />
            )}
            {activeTab === "Packing Style" && (
              <PackingTab packages={productData?.packages} />
            )}
            {activeTab === "Procedure" && (
              <ProcedureTab routes={productData?.routes} />
            )}
          </div>
        </div>
      </PageWrapper>
    </ScrollableWrapper>
  );
};

export default ProductDetailPage;
