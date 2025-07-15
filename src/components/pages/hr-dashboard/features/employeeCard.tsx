import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";

export function EmployeeCard() {
  return (
    <Card className=" col-span-5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Total Employee</CardTitle>
          <Icon
            name="UsersRound"
            className="size-5 font-semibold text-primary-default"
          />
        </div>
        <CardDescription className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">99%</h1>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="flex w-full mb-4 p-2
         items-center rounded-md bg-opacity-40 bg-green-200 justify-between"
        >
          <div className="flex items-center justify-start gap-10">
            <span className="text-2xl font-bold text-gray-900">500</span>
            <span>
              <span className="text-green-700 font-medium">+45%</span> in last
              quarter
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Permanent Staff
          </div>
        </div>
        <div className="flex w-full p-2 bg-opacity-45 items-center rounded-md bg-orange-200 justify-between">
          <div className="flex items-center justify-start gap-10">
            <span className="text-2xl font-bold text-gray-900">204</span>
            <span>
              <span className="text-green-700 font-medium">+15%</span> in last
              quarter
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Permanent Staff
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
