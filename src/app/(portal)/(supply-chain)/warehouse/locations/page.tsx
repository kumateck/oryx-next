import { Metadata } from "next";

import { getPageTitle } from "@/lib/utils";

const PAGE_NAME = "Warehouse Locations";

export const metadata: Metadata = {
  title: getPageTitle(PAGE_NAME),
  description: "Warehouse Locations Page",
};

export { default } from "@/components/pages/supply-chain/warehouse/locations";
