import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Planning Product";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Create Product Page",
};

export { default } from "@/components/pages/production/planning/create";
