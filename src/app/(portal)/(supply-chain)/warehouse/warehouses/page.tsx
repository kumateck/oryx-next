import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Warehouses";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Warehouse Lists Page",
};

export { default } from "@/components/pages/supply-chain/warehouse/warehouses";
