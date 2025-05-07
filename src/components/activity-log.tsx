import { CardContent } from "@/components/ui";
import { format } from "date-fns";
import { ProductionActivityLogDto } from "@/lib/redux/api/openapi.generated";

interface ActivityLogProps {
  approvalLogs?: ProductionActivityLogDto[] | null | undefined;
}

export default function ActivityLog({ approvalLogs = [] }: ActivityLogProps) {
  return (
    <CardContent>
      <div className=" py-6">
        <h2 className="text-lg -ml-3 text-start text-gray-500 font-semibold mb-4">
          Activity Log
        </h2>

        <div className="space-y-6">
          {approvalLogs?.map((log, index) => {
            const approvedDate = new Date(log.createdAt as string);
            const dateStr = format(approvedDate, "MMM dd, yyyy");
            const timeStr = format(approvedDate, "h:mm a");
            // const statusText = ApprovalStatus[log.status as ApprovalStatus];

            return (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                <div className="absolute left-0 top-1 -ml-1.5 w-3 h-3 rounded-full bg-gray-300"></div>

                {/* <div className="flex items-center">
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
                  </div> */}

                {/* <div className="flex items-center mt-1">
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
                  </div> */}

                {log.message && (
                  <div className="text-lg font-semibold">{log.message}</div>
                )}
                {log.user && (
                  <div className="font-medium mt-1">
                    {log.user.firstName} {log.user.lastName}
                  </div>
                )}
                <div className="mb-1 text-sm text-gray-500">
                  {dateStr} <br /> {timeStr}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CardContent>
  );
}
