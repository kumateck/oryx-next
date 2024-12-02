import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Product Lists";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Product Lists Page",
};

export { default } from "@/components/pages/production/planning";
