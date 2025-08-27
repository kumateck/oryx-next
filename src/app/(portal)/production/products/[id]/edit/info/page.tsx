import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Edit Product";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Product Edit Page",
};

export { default } from "@/components/pages/production/planning/edit/info";
