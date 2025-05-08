import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { format } from "date-fns";
import { ApprovalStatus } from "@/lib"; // Import your enum
import { ApprovalLog } from "@/lib/redux/api/openapi.generated";

interface ActivityLogProps {
  approvalLogs?: ApprovalLog[] | null | undefined;
}

export default function ActivityLog({ approvalLogs = [] }: ActivityLogProps) {
  return (
    <Card>
      <CardHeader>
        <span className="text-xl">Approval Log</span>
      </CardHeader>
      <CardContent>
        <div className="p-6">
          <h2 className="text-lg text-gray-500 font-semibold mb-4">
            Activity Log
          </h2>

          <div className="space-y-6">
            {approvalLogs?.map((log, index) => {
              const approvedDate = new Date(log.approvedAt as string);
              const dateStr = format(approvedDate, "MMM dd, yyyy");
              const timeStr = format(approvedDate, "h:mm a");
              const statusText = ApprovalStatus[log.status as ApprovalStatus];

              return (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                  <div className="absolute left-0 top-1 -ml-1.5 w-3 h-3 rounded-full bg-gray-300"></div>

                  <div className="mb-1 text-sm text-gray-500">
                    {dateStr} @ {timeStr}
                  </div>

                  <div className="flex items-center">
                    <span
                      className={`font-medium mr-1 ${
                        log.status === ApprovalStatus.Approved
                          ? "text-green-500"
                          : log.status === ApprovalStatus.Rejected
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                    >
                      {statusText}
                    </span>
                  </div>

                  <div className="flex items-center mt-1">
                    {log.status === ApprovalStatus.Approved ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : log.status === ApprovalStatus.Rejected ? (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    <span className="text-sm text-gray-600">
                      {log.user?.name}
                    </span>
                  </div>

                  <div className="mt-1 text-sm text-gray-600">
                    Comments: {log.comments ?? "-"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
