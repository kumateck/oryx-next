import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";
import { useRouter } from "next/navigation";

interface Props {
  data: HrDashboardDtoRead;
}
export function EmployeeCard({ data }: Props) {
  const router = useRouter();
  return (
    <Card className="col-span-6 w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Total Employee</CardTitle>
          <Icon
            name="UsersRound"
            onClick={() => router.push("/hr/employee-management")}
            className="size-5 font-semibold text-primary-default"
          />
        </div>
        <CardDescription className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {data.totalEmployees}
          </h1>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex w-full mb-4 p-2
         items-center rounded-md bg-opacity-40 bg-green-200 justify-between"
        >
          <div className="flex items-center justify-start gap-10">
            <span className="text-2xl font-bold text-gray-900">
              {data.numberOfPermanentEmployees}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Permanent Employee
          </div>
        </div>
        <div className="flex w-full p-2 bg-opacity-45 items-center rounded-md bg-orange-200 justify-between">
          <div className="flex items-center justify-start gap-10">
            <span className="text-2xl font-bold text-gray-900">
              {data.numberOfCasualEmployees}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Casual Employee
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
