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
            Edit Info
          </Link>
          <Link
            href={routes.editPlanningBom()}
            className="hover:text-primary-500 underline"
          >
            Edit BOM
          </Link>
          <Link
            href={routes.editPlanningProcedure()}
            className="hover:text-primary-500 underline"
          >
            Edit Procedure
          </Link>
          <Link
            href={routes.editPlanningPackaging()}
            className="underline hover:text-primary-hover"
          >
            Edit Packaging
          </Link>
        </div>
      </div>
      <Create />
    </div>
  );
};

export default Page;
