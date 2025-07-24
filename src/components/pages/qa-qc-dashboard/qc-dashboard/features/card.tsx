import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { EMaterialKind } from "@/lib";
import { QcDashboardDto } from "../../types";
interface Props {
  data: QcDashboardDto;
  materialKind: EMaterialKind;
  onMaterialKindChange?: (kind: EMaterialKind) => void;
}
export const DashboardCard = ({
  data,
  materialKind,
  onMaterialKindChange,
}: Props) => {
  console.log(data, "this is the data in card");
  return (
    <>
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>STP({EMaterialKind[materialKind]} Material)</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {materialKind === EMaterialKind.Raw
                ? data?.numberOfStpRawMaterials
                : data?.numberOfStpRawMaterials}
            </h1>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-center gap-1">
              <Button
                onClick={() =>
                  onMaterialKindChange?.(
                    materialKind === EMaterialKind.Packing
                      ? EMaterialKind.Raw
                      : EMaterialKind.Packing,
                  )
                }
                variant={
                  materialKind === EMaterialKind.Raw ? "default" : "outline"
                }
                className="size-3 p-0 rounded-full"
              ></Button>
              <Button
                onClick={() =>
                  onMaterialKindChange?.(
                    materialKind === EMaterialKind.Raw
                      ? EMaterialKind.Packing
                      : EMaterialKind.Raw,
                  )
                }
                variant={
                  materialKind === EMaterialKind.Packing ? "default" : "outline"
                }
                className="size-3 p-0 rounded-full"
              ></Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>STP(Product)</CardTitle>
              <Icon name="UserRoundSearch" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl mt-a4to font-bold text-gray-900">
              {data?.numberOfStpProducts}
            </h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Analytical Raw Data</CardTitle>
              <Icon name="UserRoundSearch" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl mt-a4to font-bold text-gray-900">
              {data?.numberOfAnalyticalRawData}
            </h1>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>
                Batch Test Count({EMaterialKind[materialKind]} Material)
              </CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {materialKind === EMaterialKind.Raw
                ? data?.numberOfStpRawMaterials
                : data?.numberOfStpRawMaterials}
            </h1>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center justify-center gap-1">
              <Button
                onClick={() =>
                  onMaterialKindChange?.(
                    materialKind === EMaterialKind.Packing
                      ? EMaterialKind.Raw
                      : EMaterialKind.Packing,
                  )
                }
                variant={
                  materialKind === EMaterialKind.Raw ? "default" : "outline"
                }
                className="size-3 p-0 rounded-full"
              ></Button>
              <Button
                onClick={() =>
                  onMaterialKindChange?.(
                    materialKind === EMaterialKind.Raw
                      ? EMaterialKind.Packing
                      : EMaterialKind.Raw,
                  )
                }
                variant={
                  materialKind === EMaterialKind.Packing ? "default" : "outline"
                }
                className="size-3 p-0 rounded-full"
              ></Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Batch Test Count(Products)</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfBatchTestApprovedRawMaterials}
            </h1>
          </CardContent>
        </Card>
      </div>
      {/* TODO: Implement Batch Test(Products) Card with the right data */}
      <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Batch Test(Raw Materials)</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfBatchTestPendingRawMaterials +
                data?.numberOfBatchTestApprovedRawMaterials +
                data?.numberOfBatchTestRejectedRawMaterials}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col items-start gap-1">
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfBatchTestPendingRawMaterials}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">
                    {data?.numberOfBatchTestApprovedRawMaterials}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfBatchTestRejectedRawMaterials}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Batch Test(Products)</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfBatchTestCountRawMaterials}
            </h1>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col items-start gap-1">
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-gray-700 text-white">
                  <span className="text-xs">Pending</span>
                  <span className="font-semibold">
                    {data?.numberOfBatchTestPendingRawMaterials}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-green-700 text-white">
                  <span className="text-xs">Approved</span>
                  <span className="font-semibold">
                    {data?.numberOfBatchTestApprovedRawMaterials}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfBatchTestRejectedRawMaterials}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex w-full justify-between items-center gap-2">
              <CardTitle>Approvals</CardTitle>
              <Icon name="ChevronDown" className="text-primary-default" />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-4xl font-bold text-gray-900">
              {data?.numberOfApprovals +
                data?.numberOfPendingApprovals +
                data?.numberOfRejectedApprovals}
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
                    {data?.numberOfApprovals}
                  </span>
                </div>
                <div className="flex font-medium px-2 rounded-full items-center gap-1 bg-red-700 text-white">
                  <span className="text-xs">Rejected</span>
                  <span className="font-semibold">
                    {data?.numberOfRejectedApprovals}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
