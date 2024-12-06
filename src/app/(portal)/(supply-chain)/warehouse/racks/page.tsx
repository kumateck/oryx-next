import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Warehouse Racks";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Rack of Warehouse Locations Page",
};

export { default } from "@/components/pages/supply-chain/warehouse/racks";
