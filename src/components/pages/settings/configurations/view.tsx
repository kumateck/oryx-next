"use client";
import React from "react";

import { TabProps } from ".";
import Page from "./component";
import { useSelector } from "@/lib/redux/store";
import {
  COLLECTION_TYPES,
  findRecordWithAccess,
  PermissionKeys,
  Section,
} from "@/lib";

interface Props {
  tab: TabProps;
}
const FormView = ({ tab }: Props) => {
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const canViewProductCategory = findRecordWithAccess(
    permissions,
    PermissionKeys.categories.productCategory.view,
  );
  const canViewRawCategory = findRecordWithAccess(
    permissions,
    PermissionKeys.categories.rawCategory.view,
  );
  const canViewPackageCategory = findRecordWithAccess(
    permissions,
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
