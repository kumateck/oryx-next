import { Card, CardContent, CardHeader, Separator } from "@/components/ui";
import { EmployeeType, Gender, MaritalStatus, Religions } from "@/lib";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
// import Image from "next/image";
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.avatar}
                    alt={`Image of ${data?.firstName || "user"}`}
                    className="h-24 w-24 cursor-pointer rounded-full border object-cover transition-shadow"
                    width={300}
                    height={300}
                    onError={(e) => {
                      // Handle image load error by setting a fallback or hiding the image
                      e.currentTarget.style.display = "none";
                      // Alternatively, set a fallback image:
                      // e.currentTarget.src = '/path/to/fallback-avatar.png';
                    }}
                  />
                ) : (
                  // Fallback when no avatar is available
                  <div className="h-24 w-24 flex items-center justify-center rounded-full border bg-gray-200 text-gray-500">
                    {data?.firstName && data?.lastName
                      ? data.firstName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-xl">
                  {data?.firstName} {data?.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {data?.designation?.name ?? "-"}
                </p>
                <p className="text-sm text-gray-500">
                  {data?.staffNumber ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">Employee Information</h3>
        <div className="space-y-2 mt-2">
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Job Title:</span>
            <span className="font-semibold">
              {data?.designation?.name ?? "N/A"}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Department:</span>
            <span className="font-semibold">
              {data?.department?.name ?? "N/A"}
            </span>
          </div>

          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Employee Type: </span>
            <span className="font-semibold">
              {EmployeeType[data?.type as EmployeeType]}
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="space-y-2 mt-2">
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Date of Birth: </span>
            <span className="font-semibold">
              {data?.dateOfBirth
                ? format(new Date(data.dateOfBirth), "MMM d, yyyy")
                : "N/A"}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Email: </span>
            <span className="font-semibold">{data?.email ?? "N/A"}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Contact: </span>
            <span className="font-semibold">{data?.phoneNumber}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Gender: </span>
            <span className="font-semibold">
              {Gender[data?.gender as Gender] ?? "N/A"}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">
              Residential Address:{" "}
            </span>
            <span className="font-semibold">
              {data?.residentialAddress ?? "N/A"}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Nationality: </span>
            <span className="font-semibold">{data?.nationality ?? "N/A"}</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Marital Status: </span>
            <span className="font-semibold">
              {MaritalStatus[data?.maritalStatus as MaritalStatus] ?? "N/A"}
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="font-light text-gray-500">Religion: </span>
            <span className="font-semibold">
              {Religions[data?.religion as Religions]}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LeftCard;
