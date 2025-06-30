"use client";

import {
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  COLLECTION_TYPES,
  CollectionTypes,
  EMaterialKind,
  PermissionKeys,
} from "@/lib";
import { splitWords } from "@/lib";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { ViewProps } from "./component";
import FormView from "./view";
import { useUserPermissions } from "@/hooks/use-permission";
import NoAccess from "@/shared/no-access";
import { useRouter } from "next/navigation";

const Configurations = () => {
  const router = useRouter();
  const { hasPermissionAccess } = useUserPermissions();
  if (!hasPermissionAccess(PermissionKeys.settings.viewSystemSettings)) {
    return <NoAccess />;
  }
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-5">
        <Icon
          name="ArrowLeft"
          className="h-5 w-5 text-black hover:cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />

        <PageTitle title={"Configurations"} />
      </div>

      <Tabs defaultValue={FormOptionTabs[0].title}>
        <TabsList className="mb-4 gap-x-6 rounded-none border-b border-b-neutral-input bg-transparent p-0 py-0">
          {FormOptionTabs.map((tab, idx) => (
            <TabsTrigger
              key={idx}
              value={tab.title}
              className="data-[state=active]:font-Bold h-9 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:text-primary-default data-[state=active]:shadow-none"
            >
              {splitWords(tab.title)}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollablePageWrapper className="pb-60">
          {FormOptionTabs.map((tab, idx) => (
            <TabsContent key={idx} value={tab.title}>
              <FormView tab={tab} />
            </TabsContent>
          ))}
        </ScrollablePageWrapper>
      </Tabs>
    </div>
  );
};

export interface TabProps {
  title: string;
  views: ViewProps[];
}
const FormOptionTabs: TabProps[] = [
  {
    title: "Categories",
    views: [
      {
        icon: "Tag",
        modelType: COLLECTION_TYPES.ProductCategory,
        title: "ProductCategory",
      },
      {
        icon: "Tag",
        modelType: COLLECTION_TYPES.MaterialCategory,
        title: "RawCategory",
        kind: EMaterialKind.Raw,
      },
      {
        icon: "Tag",
        modelType: COLLECTION_TYPES.MaterialCategory,
        title: "PackageCategory",
        kind: EMaterialKind.Packing,
      },
    ],
  },
  {
    title: "Procedures",
    views: [
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
        modelType: COLLECTION_TYPES.WorkCenter,
        title: "WorkCenter",
      },
    ],
  },
  {
    title: "Products",
    views: [
      {
        icon: "Tag",
        modelType: COLLECTION_TYPES.MaterialType,
        title: "MaterialType",
      },

      {
        icon: "Tag",
        modelType: COLLECTION_TYPES.UnitOfMeasure,
        title: "UnitOfMeasure",
      },
    ],
  },
  {
    title: "Address",
    views: [
      {
        icon: "Tag",
        modelType: COLLECTION_TYPES.Country,
        title: "Country",
      },
    ],
  },
  {
    title: "Schedules",
    views: [
      {
        icon: "Tag",
        modelType: CollectionTypes.ShiftCategory,
        title: "Shift Category",
      },
    ],
  },
];

export default Configurations;
