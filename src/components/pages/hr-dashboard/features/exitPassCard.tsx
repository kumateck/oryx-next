import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
} from "@/components/ui";
import { fullname, getInitials } from "@/lib";
import { HrDashboardDtoRead } from "@/lib/redux/api/openapi.generated";

//ARRAY OF USERS WITH THEIR NAMES AVATARS URLS AND ROLES
const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "HR Manager",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Recruiter",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Payroll Specialist",
  },
];

interface Props {
  data: HrDashboardDtoRead;
}
export function ExitPassCard({ data }: Props) {
  console.log("ExitPassCard data", data);
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>EXIT PASS</CardTitle>
          <Icon
            name="UserRound"
            className="size-5 font-semibold text-primary-default"
          />
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center justify-start">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.avatar as string}
                  alt={user?.role as string}
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials(
                    fullname(
                      user?.firstName as string,
                      user?.lastName as string,
                    ),
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2 flex flex-col">
                <span className="font-medium">
                  {fullname(
                    user?.firstName as string,
                    user?.lastName as string,
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {user?.role as string}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Icon name="Check" className="size-5 text-green-600" />
              <Icon name="X" className="size-5 text-red-600 ml-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
