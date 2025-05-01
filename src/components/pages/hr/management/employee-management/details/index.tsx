"use client";
import { Card, CardContent, CardHeader, Icon } from "@/components/ui";

import { useGetApiV1EmployeeByIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

import { useParams, useRouter } from "next/navigation";

import React from "react";
import LeftCard from "./left-card";
import { LifeStatus } from "@/lib";
import { format } from "date-fns";

function EmployeeDetails() {
  const { id } = useParams();
  const employeeId = id as string;
  const { data } = useGetApiV1EmployeeByIdQuery({
    id: employeeId,
  });
  const router = useRouter();

  return (
    <ScrollablePageWrapper>
      <div>
        <div
          className="inline-flex items-center gap-2 mb-4 hover:cursor-pointer"
          onClick={() => router.back()}
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          <h1 className="font-Medium text-base text-primary-500">
            Employee List
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <PageTitle title="Employee Details" />
        <div
          className="flex items-center gap-2 mb-4 hover:cursor-pointer"
          onClick={() =>
            router.push(
              `/hr/employee-management/${employeeId}/edit/${data?.type}`,
            )
          }
        >
          <Icon name="Pencil" className="h-5 w-5 " />
          <span>Edit</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-6">
        <div className="col-span-1">
          <LeftCard data={data} />
        </div>
        <div className="col-span-3 flex flex-col gap-6">
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
                      {data?.father?.fullName}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.father?.occupation}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.father?.phoneNumber}
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
                      {data?.mother?.fullName}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.mother?.occupation}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.mother?.phoneNumber}
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
                      {data?.spouse?.fullName}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Occupation:
                    </span>
                    <span className="font-semibold">
                      {data?.spouse?.occupation}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.spouse?.phoneNumber}
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
              {/* Child */}
              {data?.children && data.children.length > 0 && (
                <>
                  <div>
                    {data.children.map((child, index) => (
                      <div key={index}>
                        {data?.children && data?.children?.length > 1 ? (
                          <h4 className="mb-2 font-medium text-gray-400">
                            Child {index + 1}
                          </h4>
                        ) : (
                          <h4 className="mb-2 font-medium text-gray-400">
                            Child
                          </h4>
                        )}

                        <div className="flex flex-col">
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              Full Name:
                            </span>
                            <span className="font-semibold">
                              {child.fullName}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              Date of Birth:
                            </span>
                            <span className="font-semibold">
                              {child?.dateOfBirth
                                ? format(
                                    new Date(child?.dateOfBirth),
                                    "MMM d, yyyy",
                                  )
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              Gender:
                            </span>
                            <span className="font-semibold">
                              {child.gender !== undefined
                                ? child.gender === 0
                                  ? "Male"
                                  : "Female"
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Emergency Contact */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">
                  Emergency Contact
                </h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.fullName}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.contactNumber}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Relationship to you:
                    </span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.relationship}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Residential Address:
                    </span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.residentialAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next of Kin */}
              <div>
                <h4 className="mb-2 font-medium text-gray-400">Next of Kin</h4>
                <div className="flex flex-col">
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">Full Name:</span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.fullName}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Contact Number:
                    </span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.contactNumber}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Relationship to you:
                    </span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.relationship}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-light text-gray-500">
                      Residential Address:
                    </span>
                    <span className="font-semibold">
                      {data?.emergencyContact?.residentialAddress}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education History */}
          <Card>
            <CardHeader>Educational & Training Background</CardHeader>
            <CardContent className="grid grid-cols-3">
              {/* Education */}
              {data?.educationBackground &&
                data.educationBackground.length > 0 && (
                  <>
                    <div>
                      {data.educationBackground.map((education, index) => (
                        <div key={index}>
                          {data?.educationBackground &&
                          data?.educationBackground?.length > 1 ? (
                            <h4 className="mb-2 font-medium text-gray-400">
                              Education {index + 1}
                            </h4>
                          ) : (
                            <h4 className="mb-2 font-medium text-gray-400">
                              Education
                            </h4>
                          )}

                          <div className="flex flex-col">
                            <div className="flex gap-2 text-sm">
                              <span className="font-light text-gray-500">
                                School Name:
                              </span>
                              <span className="font-semibold">
                                {education.schoolName}
                              </span>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <span className="font-light text-gray-500">
                                Start Date:
                              </span>
                              <span className="font-semibold">
                                {education.startDate
                                  ? format(
                                      new Date(education.startDate),
                                      "MMM d, yyyy",
                                    )
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <span className="font-light text-gray-500">
                                End Date:
                              </span>
                              <span className="font-semibold">
                                {education.endDate
                                  ? format(
                                      new Date(education.endDate),
                                      "MMM d, yyyy",
                                    )
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <span className="font-light text-gray-500">
                                Major:
                              </span>
                              <span className="font-semibold">
                                {education.major ?? "N/A"}
                              </span>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <span className="font-light text-gray-500">
                                Qualification Earned:
                              </span>
                              <span className="font-semibold">
                                {education.qualificationEarned ?? "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
            </CardContent>
          </Card>

          {/* Employment History */}
          <Card>
            <CardHeader>Employment History</CardHeader>
            <CardContent className="grid grid-cols-3">
              {/* Education */}
              {data?.employmentHistory && data.employmentHistory.length > 0 && (
                <>
                  <div>
                    {data.employmentHistory.map((employer, index) => (
                      <div key={index}>
                        {data?.employmentHistory &&
                        data?.employmentHistory?.length > 1 ? (
                          <h4 className="mb-2 font-medium text-gray-400">
                            Employer {index + 1}
                          </h4>
                        ) : (
                          <h4 className="mb-2 font-medium text-gray-400">
                            Employer
                          </h4>
                        )}

                        <div className="flex flex-col">
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              Company Name:
                            </span>
                            <span className="font-semibold">
                              {employer.companyName}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              Start Date:
                            </span>
                            <span className="font-semibold">
                              {employer.startDate
                                ? format(
                                    new Date(employer.startDate),
                                    "MMM d, yyyy",
                                  )
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              End Date:
                            </span>
                            <span className="font-semibold">
                              {employer.endDate
                                ? format(
                                    new Date(employer.endDate),
                                    "MMM d, yyyy",
                                  )
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <span className="font-light text-gray-500">
                              Position:
                            </span>
                            <span className="font-semibold">
                              {employer.position}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>Payment Information</CardHeader>
            <CardContent className="grid grid-cols-3">
              <div className="flex gap-2 text-sm">
                <span className="font-light text-gray-500">
                  Abii National Account Number:
                </span>
                <span className="font-semibold">{data?.bankAccountNumber}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="font-light text-gray-500">SSNIT Number:</span>
                <span className="font-semibold">
                  {data?.ssnitNumber ?? "N/A"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="font-light text-gray-500">
                  Ghana Card Number:
                </span>
                <span className="font-semibold">
                  {data?.ghanaCardNumber ?? "N/A"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollablePageWrapper>
  );
}

export default EmployeeDetails;
