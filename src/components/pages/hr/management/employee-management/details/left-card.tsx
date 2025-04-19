import { Card, CardContent, CardHeader, Separator } from "@/components/ui";
import { EmployeeType, Gender, MaritalStatus, Religions } from "@/lib";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";
import Image from "next/image";
import React from "react";

interface Props {
  data: EmployeeDto | undefined;
}
function LeftCard({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <div className="group flex items-center justify-between rounded p-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {data?.avatar ? (
                  <Image
                    src={data.avatar as string}
                    alt={`Image of ${data?.fullName}`}
                    className="h-24 w-24 cursor-pointer rounded border object-cover transition-shadow "
                    width={300}
                    height={300}
                    priority
                  />
                ) : null}
                <div className="absolute inset-0 rounded bg-black bg-opacity-0 transition-opacity " />
              </div>
              <div>
                <h2 className="font-bold text-xl">{data?.fullName}</h2>
                <span>{data?.designationName ?? "-"}</span>
                <span className="text-sm text-gray-500">
                  {data?.staffNumber ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-bold">Employee Information</h3>
        <div className="space-y-2 mt-2">
          <div>
            <span className="text-gray-500 font-light">Job Title: </span>
            <span className="font-bold">{data?.designationName ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Department: </span>
            <span className="font-bold">{data?.departmentName ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Employee Type: </span>
            <span className="font-bold">
              {EmployeeType[data?.type as EmployeeType]}
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        <h3 className="text-lg font-bold">Personal Information</h3>
        <div className="space-y-2 mt-2">
          <div>
            <span className="text-gray-500 font-light">Date of Birth: </span>
            <span className="font-bold">{data?.dateOfBirth ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Email: </span>
            <span className="font-bold">{data?.email ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Contact: </span>
            <span className="font-bold">{data?.phoneNumber}</span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Gender: </span>
            <span className="font-bold">
              {Gender[data?.gender as Gender] ?? "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-500 font-light">
              Residential Address:{" "}
            </span>
            <span className="font-bold">
              {data?.residentialAddress ?? "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Nationality: </span>
            <span className="font-bold">{data?.nationality ?? "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Marital Status: </span>
            <span className="font-bold">
              {MaritalStatus[data?.maritalStatus as MaritalStatus] ?? "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-500 font-light">Religion: </span>
            <span className="font-bold">
              {Religions[data?.religion as Religions]}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LeftCard;
