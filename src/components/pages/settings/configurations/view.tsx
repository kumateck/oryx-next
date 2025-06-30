"use client";
import React from "react";

import { TabProps } from ".";
import Page from "./component";
import { COLLECTION_TYPES, PermissionKeys } from "@/lib";
import { useUserPermissions } from "@/hooks/use-permission";

interface Props {
  tab: TabProps;
}
const FormView = ({ tab }: Props) => {
  // check permissions here
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const canViewProductCategory = hasPermissionAccess(
    PermissionKeys.categories.productCategory.view,
  );
  const canViewRawCategory = hasPermissionAccess(
    PermissionKeys.categories.rawCategory.view,
  );
  const canViewPackageCategory = hasPermissionAccess(
    PermissionKeys.categories.packageCategory.view,
  );
  return (
    <div className="space-y-5">
      {tab?.views?.map((view, index) => {
        if (
          canViewPackageCategory &&
          view.modelType === COLLECTION_TYPES.PackageCategory
        ) {
          return <Page key={index} view={view} />;
        }
        if (
          canViewProductCategory &&
          view.modelType === COLLECTION_TYPES.ProductCategory
        ) {
          return <Page key={index} view={view} />;
        }
        if (
          canViewRawCategory &&
          view.modelType === COLLECTION_TYPES.MaterialCategory
        ) {
          return <Page key={index} view={view} />;
        } else {
          const notAnyCategory =
            view.modelType !== COLLECTION_TYPES.MaterialCategory ||
            view.modelType !== COLLECTION_TYPES.ProductCategory ||
            view.modelType !== COLLECTION_TYPES.PackageCategory;
          return notAnyCategory && <Page key={index} view={view} />;
        }
      })}
    </div>
  );
};

export default FormView;
