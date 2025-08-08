import { Card, CardContent, CardHeader, Separator } from "@/components/ui";
import {
  EmployeeActiveStatus,
  EmployeeInactiveStatus,
  EmployeeStatusType,
  EmployeeType,
  Gender,
  MaritalStatus,
  Religions,
  splitWords,
} from "@/lib";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import React from "react";

interface Props {
  data: EmployeeDto | undefined;
}

function LeftCard({ data }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex flex-col xl:flex-row items-center gap-4 rounded p-2">
            <div className="flex items-center justify-center">
              {data?.attachments ? (
                <div className="h-24 w-24 rounded-full border overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.attachments?.[0]?.link as string}
                    alt={`Image of ${data?.firstName || "user"}`}
                    className="object-contain w-full transition-shadow"
                    width={300}
                    height={300}
                    onError={(e) => {
                      // Handle image load error by setting a fallback or hiding the image
                      e.currentTarget.style.display = "none";
                      // Alternatively, set a fallback image:
                      // e.currentTarget.src = '/path/to/fallback-avatar.png';
                    }}
                  />
                </div>
              ) : (
                // Fallback when no avatar is available
                <div className="h-24 w-24 flex items-center justify-center rounded-full border bg-gray-200 text-gray-500">
                  {data?.firstName && data?.lastName
                    ? data.firstName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left">
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-3xl">
                {/* {EmployeeStatusType[data?.status as EmployeeStatus]} */}
                {data?.status === EmployeeStatusType.Active
                  ? data?.activeStatus !== null
                    ? splitWords(
                        EmployeeActiveStatus[
                          data?.activeStatus as EmployeeActiveStatus
                        ],
                      )
                    : EmployeeStatusType[data?.status as EmployeeStatusType]
                  : ""}
                {data?.status === EmployeeStatusType.Inactive
                  ? data?.inactiveStatus !== null
                    ? splitWords(
                        EmployeeInactiveStatus[
                          data?.inactiveStatus as EmployeeInactiveStatus
                        ],
                      )
                    : EmployeeStatusType[data?.status as EmployeeStatusType]
                  : ""}
              </span>
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
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold">Employee Information</h3>
        <div className="space-y-2 mt-2">
          <InfoItem
            label="Job Title"
            value={data?.designation?.name ?? "N/A"}
          />
          <InfoItem
            label="Department"
            value={data?.department?.name ?? "N/A"}
          />
          <InfoItem label="Staff Number" value={data?.staffNumber ?? "N/A"} />
          <InfoItem
            label="Employee Type"
            value={EmployeeType[data?.type as EmployeeType]}
          />
        </div>

        <Separator className="my-6" />

        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
          <InfoItem
            label="Date of Birth"
            value={
              data?.dateOfBirth
                ? format(new Date(data.dateOfBirth), "MMM d, yyyy")
                : "N/A"
            }
          />
          <InfoItem label="Email" value={data?.email ?? "N/A"} fullWidth />
          <InfoItem label="Contact" value={data?.phoneNumber ?? "N/A"} />
          <InfoItem
            label="Gender"
            value={Gender[data?.gender as Gender] ?? "N/A"}
          />
          <InfoItem
            label="Residential Address"
            value={data?.residentialAddress ?? "N/A"}
            fullWidth
          />
          <InfoItem label="Nationality" value={data?.nationality ?? "N/A"} />
          <InfoItem
            label="Marital Status"
            value={MaritalStatus[data?.maritalStatus as MaritalStatus] ?? "N/A"}
          />
          <InfoItem
            label="Religion"
            value={Religions[data?.religion as Religions] ?? "N/A"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Reusable component for info items
interface InfoItemProps {
  label: string;
  value: string;
  fullWidth?: boolean;
}

const InfoItem = ({ label, value, fullWidth = false }: InfoItemProps) => (
  <div
    className={`flex flex-col xs:flex-row gap-1 text-sm ${fullWidth ? "xl:col-span-2" : ""}`}
  >
    <span className="font-light text-gray-500 whitespace-nowrap">{label}:</span>
    <span className="font-semibold break-words">{value}</span>
  </div>
);

export default LeftCard;
