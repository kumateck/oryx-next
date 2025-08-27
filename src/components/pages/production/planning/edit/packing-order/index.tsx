"use client";

import Link from "next/link";
import React from "react";

import { routes } from "@/lib";

import Create from "./update-info";

const Page = () => {
  return (
    <div className="relative">
      <div className="absolute right-0 -mt-10">
        <div className="flex justify-end gap-4">
          <Link
            href={routes.editPlanningInfo()}
            className="hover:text-primary-500 underline"
          >
            Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            BOM
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="underline hover:text-primary-hover"
          >
            Packaging
          </Link>
          <Link
            href={routes.editPlanningPackingStyle()}
            className="hover:text-primary-500 underline"
          >
            Packing Style
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="hover:text-primary-500 underline"
          >
            Procedure
          </Link>
        </div>
      </div>
      <Create />
    </div>
  );
};

export default Page;
