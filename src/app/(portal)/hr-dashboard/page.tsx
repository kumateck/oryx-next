import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "hr dashboard";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "HR Dashboard Page",
};
export { default } from "@/components/pages/hr-dashboard/";
//
