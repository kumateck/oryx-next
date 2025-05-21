"use client";
import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";
import { FillUpload } from "./FileUpload";

const Page = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <PageTitle title="Attendance Report Upload" />
        <span className="text-gray-600">
          Upload the daily attendance report to generate a departmental
          attendance Excel sheet
        </span>
      </div>
      <div className=" mt-6">
        <FillUpload />
      </div>
    </PageWrapper>
  );
};

export default Page;
