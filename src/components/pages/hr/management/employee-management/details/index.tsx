"use client";
import { Card, CardContent, CardHeader } from "@/components/ui";

import { useGetApiV1EmployeeByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { useParams } from "next/navigation";

import React from "react";
import LeftCard from "./left-card";
import { LifeStatus } from "@/lib";

function EmployeeDetails() {
  const { id } = useParams();
  const employeeId = id as string;
  const { data } = useGetApiV1EmployeeByIdQuery({
    id: employeeId,
  });

  return (
    <ScrollablePageWrapper>
      <PageTitle title="Employee Details" />

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <LeftCard data={data} />
        </div>
        <div className="col-span-3 flex flex-col">
          {/* Family Information (1) */}
          <Card>
            <CardHeader>Family Information (1)</CardHeader>
            <CardContent className="grid grid-cols-3">
              {/* Father */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Father</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.father?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.father?.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.father?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Life Status:
                    </span>
                    <span className="font-semibold">
                      {LifeStatus[data?.father?.lifeStatus as LifeStatus]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mother */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Mother</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.mother?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.mother?.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.mother?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Life Status:
                    </span>
                    <span className="font-semibold">
                      {LifeStatus[data?.mother?.lifeStatus as LifeStatus]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spouse */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Spouse</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.spouse?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.spouse?.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.spouse?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Life Status:
                    </span>
                    <span className="font-semibold">
                      {LifeStatus[data?.spouse?.lifeStatus as LifeStatus]}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Information 2 */}
          <Card>
            <CardHeader>Family Information (2)</CardHeader>
            <CardContent className="grid grid-cols-3">
              {/* Father */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Child</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.father?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Date of Birth:
                    </span>
                    <span className="font-semibold">
                      {data?.father?.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Residential Address:
                    </span>
                    <span className="font-semibold">
                      {data?.father?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Gender:</span>
                    <span className="font-semibold">
                      {LifeStatus[data?.father?.lifeStatus as LifeStatus]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mother */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Mother</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.mother?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.mother?.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.mother?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Life Status:
                    </span>
                    <span className="font-semibold">
                      {LifeStatus[data?.mother?.lifeStatus as LifeStatus]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spouse */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Spouse</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.spouse?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.spouse?.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.spouse?.phoneNumber || "N/A"}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Life Status:
                    </span>
                    <span className="font-semibold">
                      {LifeStatus[data?.spouse?.lifeStatus as LifeStatus]}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollablePageWrapper>
  );
}

export default EmployeeDetails;
