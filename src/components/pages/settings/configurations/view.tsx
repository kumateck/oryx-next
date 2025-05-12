"use client";
import React from "react";

import { TabProps } from ".";
import Page from "./component";
import { useSelector } from "@/lib/redux/store";
import {
  COLLECTION_TYPES,
  findRecordWithFullAccess,
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
  const canViewProductCategory = findRecordWithFullAccess(
    permissions,
    PermissionKeys.categories.productCategory.view,
  );
  const canViewRawCategory = findRecordWithFullAccess(
    permissions,
    PermissionKeys.categories.rawCategory.view,
  );
  const canViewPackageCategory = findRecordWithFullAccess(
    permissions,
    PermissionKeys.categories.packageCategory.view,
  );
  return (
    <div className="space-y-5">
      {tab?.views?.map((view, index) => {
        console.log(view?.modelType);

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
        }
      })}
    </div>
  );
};

export default FormView;
