"use client";

import ScrollablePageWrapper from "@/app/shared/page-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { COLLECTION_TYPES } from "@/lib/constants";
import { splitWords } from "@/lib/utils";

import Page, { ViewProps } from "./component";

const Configurations = () => {
  return (
    <div className="w-full">
      <div className="mb-5">
        <span className="text-xl">Configurations</span>
      </div>

      <Tabs defaultValue={COLLECTION_TYPES.ProductCategory}>
        <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
          {FormOptionTabs.map((tab, idx) => (
            <TabsTrigger
              key={idx}
              value={tab.modelType}
              className="data-[state=active]:font-Bold h-10 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-b-primary-500 data-[state=active]:bg-transparent data-[state=active]:text-primary-500 data-[state=active]:shadow-none"
            >
              {splitWords(tab.modelType)}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollablePageWrapper className="pb-60">
          {FormOptionTabs.map((tab, idx) => (
            <TabsContent key={idx} value={tab.modelType}>
              <Page view={tab} />
            </TabsContent>
          ))}
        </ScrollablePageWrapper>
      </Tabs>
    </div>
  );
};

const FormOptionTabs: ViewProps[] = [
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.ProductCategory,
    title: "Categories",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.Resource,
    title: "Resource",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.Operation,
    title: "Operation",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.MaterialType,
    title: "MaterialType",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.MaterialCategory,
    title: "MaterialCategory",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.PackageType,
    title: "PackageType",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.UnitOfMeasure,
    title: "UnitOfMeasure",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.WorkCenter,
    title: "WorkCenter",
  },
  {
    icon: "Tag",
    modelType: COLLECTION_TYPES.Country,
    title: "Country",
  },
];

export default Configurations;
