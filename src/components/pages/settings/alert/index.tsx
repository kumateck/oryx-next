"use client";
import PageTitle from "@/shared/title";
import { AlertItem } from "./alertItem";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { useEffect } from "react";
import { CreateAlert } from "./create";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1AlertQuery } from "@/lib/redux/api/openapi.generated";
import { LoadingSkeleton } from "./loadingSkeleton";
import { AuditModules } from "@/lib";

function Page() {
  const [loadAlerts, { data, isLoading, isFetching }] =
    useLazyGetApiV1AlertQuery();
  console.log(data?.data, isFetching);

  useEffect(() => {
    loadAlerts({
      page: 1,
      pageSize: 100,
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.alerts,
    });
  }, [loadAlerts]);
  return (
    <PageWrapper className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <PageTitle title="Alerts & Notifications " />
          <span className="text-sm">
            Create, edit and delete alerts & notifications
          </span>
        </div>
        <CreateAlert />
      </div>
      <ScrollablePageWrapper className="space-y-2 mt-6">
        {isFetching || isLoading ? (
          <LoadingSkeleton />
        ) : (
          alerts.map((alert) => (
            <AlertItem key={alert.createdAt} alert={alert} />
          ))
        )}
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}
export type AlertDto = {
  createdAt: string;
  id: string;
  title: string;
  modelType: string;
  alertType: "info" | "warning" | "error" | "critical";
  timeFrame:
    | "instant"
    | "real-time"
    | "immediate"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly";
  isDisabled: boolean;
  createdBy: {
    firstName: string;
    lastName: string;
  };
};
const alerts: AlertDto[] = [
  {
    createdAt: "2025-06-03T10:00:00.000Z",
    id: "alert_001",
    title: "Low Stock Alert",
    modelType: "Inventory",
    alertType: "warning",
    timeFrame: "daily",
    isDisabled: false,
    createdBy: {
      firstName: "Admin",
      lastName: "001",
    },
  },
  {
    createdAt: "2025-06-03T11:15:20.000Z",
    title: "Login Attempt",
    id: "alert_002",
    modelType: "Auth",
    alertType: "info",
    timeFrame: "real-time",
    isDisabled: false,
    createdBy: {
      firstName: "System",
      lastName: "",
    },
  },
  {
    createdAt: "2025-06-03T12:30:45.000Z",
    title: "Payment Failed",
    modelType: "Billing",
    alertType: "error",
    id: "alert_003",
    timeFrame: "instant",
    isDisabled: false,
    createdBy: {
      firstName: "Billing",
      lastName: "Bot",
    },
  },
  {
    createdAt: "2025-06-03T13:05:30.000Z",
    title: "New Signup",
    modelType: "User",
    alertType: "info",
    timeFrame: "hourly",
    isDisabled: false,
    id: "alert_004",
    createdBy: {
      firstName: "Signup",
      lastName: "Service",
    },
  },
  {
    createdAt: "2025-06-03T14:20:00.000Z",
    title: "Service Down",
    modelType: "System",
    alertType: "critical",
    timeFrame: "immediate",
    isDisabled: false,
    id: "alert_005",
    createdBy: {
      firstName: "Monitor",
      lastName: "Bot",
    },
  },
  {
    createdAt: "2025-06-03T15:40:00.000Z",
    title: "Profile Update",
    modelType: "User",
    alertType: "info",
    timeFrame: "daily",
    id: "alert_006",
    isDisabled: true,
    createdBy: {
      firstName: "Profile",
      lastName: "Manager",
    },
  },
  {
    createdAt: "2025-06-03T16:55:00.000Z",
    title: "Quota Exceeded",
    modelType: "Subscription",
    alertType: "warning",
    id: "alert_007",
    timeFrame: "weekly",
    isDisabled: false,
    createdBy: {
      firstName: "alert",
      lastName: "lastName",
    },
  },
  {
    createdAt: "2025-06-03T17:10:10.000Z",
    title: "Suspicious Activity",
    modelType: "Security",
    alertType: "error",
    timeFrame: "instant",
    isDisabled: false,
    id: "alert_0039",
    createdBy: {
      firstName: "security",
      lastName: "ai",
    },
  },
  {
    createdAt: "2025-06-03T18:25:30.000Z",
    title: "Plan Expiry",
    id: "alert_034",
    modelType: "Subscription",
    alertType: "warning",
    timeFrame: "daily",
    isDisabled: false,
    createdBy: {
      firstName: "First name",
      lastName: "name",
    },
  },
  {
    createdAt: "2025-06-03T19:45:00.000Z",
    title: "File Upload Failed",
    modelType: "Storage",
    id: "alert_23",
    alertType: "error",
    timeFrame: "real-time",
    isDisabled: true,
    createdBy: {
      firstName: "Storage",
      lastName: "Service",
    },
  },
];

export default Page;
