import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { QaDashboardDto } from "@/lib/redux/api/openapi.generated";
interface Props {
  data: QaDashboardDto;
}
export const DashboardCard = ({ data }: Props) => {
  return (
    <>
      <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-4">
        {/* BMR Requests */}
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>BMR Requests</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfBmrRequests ?? ""}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col items-start gap-1">
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfPendingBmrRequests}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">
                    {data?.numberOfApprovedBmrRequests}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfRejectBmrRequests}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Analytical Test Requests */}
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Analytical Test Requests</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfAnalyticalTestRequests}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col items-start gap-1">
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">{"0"}</span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">{"0"}</span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Expired</span>
                  <span className="font-semibold">
                    {data?.numberOfExpiredAnalyticalTestRequests}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Approved Manufactures */}
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Approved Manufacturers</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfApprovals ?? ""}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col items-start gap-1">
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfPendingApprovals ?? ""}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">
                    {data?.numberOfApprovals ?? ""}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfRejectedApprovals ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Approvals */}
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Approvals</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfApprovals}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col items-start gap-1">
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfPendingApprovals}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">
                    {data?.numberOfApprovals ?? ""}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfRejectedApprovals ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Total Products</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfProducts}
            </h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Total Raw Materials</CardTitle>
              <Icon name="UserRoundSearch" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl mt-a4to font-bold text-gray-900">
              {data?.numberOfRawMaterials}
            </h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Total Packing Materials</CardTitle>
              <Icon name="UserRoundSearch" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl mt-a4to font-bold text-gray-900">
              {data?.numberOfPackingMaterials}
            </h1>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
