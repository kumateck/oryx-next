import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Icon,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsContent,
  TabsTrigger,
} from "@/components/ui";
import { format, parseISO } from "date-fns";
import { TabsList } from "@radix-ui/react-tabs";
import React from "react";
import { fullname, getInitials } from "@/lib";
import ScrollableWrapper from "@/shared/scroll-wrapper";
const TABS_OPTIONS = ["All", "Unread"];
export function NotificationsSheet() {
  const [activeTab, setActiveTab] = React.useState(TABS_OPTIONS[0]);
  const allData = groupByDate(notifications);
  const unreadData = allData.filter((data) =>
    data.items.filter((data) => data.status === "unread"),
  );
  console.log(allData, "this is all data we need");
  console.log(unreadData, "these are all unread data we've got");

  return (
    <Sheet>
      <SheetTrigger>
        <Icon name="Bell" className="size-6 text-gray-700 cursor-pointer" />
      </SheetTrigger>
      <ScrollableWrapper>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-xl">Notifications</SheetTitle>
            <Tabs defaultValue={activeTab}>
              {/* TabsList is used to render the tabs */}
              <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
                {TABS_OPTIONS.map((option) => (
                  <TabsTrigger
                    className=" px-4 capitalize  data-[state=active]:border-b data-[state=active]:border-b-primary-500 data-[state=active]:text-white data-[state=active]:font-Bold data-[state=active]:bg-primary-default"
                    key={option}
                    onClick={() => setActiveTab(option)}
                    value={option}
                  >
                    {option}(
                    {option === TABS_OPTIONS[0]
                      ? allData?.length
                      : unreadData?.length}
                    )
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTab} className="space-y-6 ">
                {allData.map((data) => (
                  <div key={data.date}>
                    <h1>{format(new Date(data.date), "MMM d, yyyy")}</h1>
                    <div className="space-y-3 ">
                      {data.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Avatar className="h-12 w-12 rounded-full">
                            <AvatarImage src={" " as string} alt={""} />
                            <AvatarFallback className="rounded-lg">
                              {getInitials(
                                fullname(
                                  item.user.split(" ")[0] ?? "",
                                  item.user.split(" ")[0] ?? "",
                                ),
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-lg">{item.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value={activeTab}>
                {allData.map((data) => (
                  <div key={data.date}>
                    <h1>{format(new Date(data.date), "MMM d, yyyy")}</h1>
                    <div className="flex w-full items-center justify-start">
                      {data.items.map((item) => (
                        <div key={item.id}>
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={" " as string} alt={""} />
                            <AvatarFallback className="rounded-lg">
                              {getInitials(
                                fullname(
                                  item.user.split(" ")[0] ?? "",
                                  item.user.split(" ")[1] ?? "",
                                ),
                              )}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </SheetHeader>
        </SheetContent>
      </ScrollableWrapper>
    </Sheet>
  );
}

const notifications: Notification[] = [
  {
    id: "1",
    user: "Abigail Tobbin",
    action: "created a purchase requisition",
    date: "2025-07-17T09:50:00Z",
    timeAgo: "10mins ago",
    status: "unread",
  },
  {
    id: "2",
    user: "Desmond Adusei",
    action: "rejected a leave request",
    date: "2025-05-09T14:53:00Z",
    timeAgo: "May 9 @ 2:53 PM",
    status: "read",
  },
  {
    id: "3",
    user: "Eugene Dumoga",
    action: "created a purchase requisition",
    date: "2025-05-01T22:50:00Z",
    timeAgo: "May 1 @ 10:50 PM",
    status: "read",
  },
  {
    id: "4",
    user: "System",
    action: "Paracetamol API below reorder level 150kg",
    date: "2025-07-16T21:00:00Z",
    timeAgo: "10mins ago",
    status: "unread",
  },
  {
    id: "5",
    user: "Douglas Boakye",
    action: "created a purchase requisition",
    date: "2025-07-16T21:00:00Z",
    timeAgo: "10mins ago",
    status: "unread",
  },
  {
    id: "6",
    user: "Leeroy Solomon",
    action: "created a purchase requisition",
    date: "2025-07-16T21:00:00Z",
    timeAgo: "10mins ago",
    status: "unread",
  },
  {
    id: "7",
    user: "Bernd Opoku",
    action: "created a purchase requisition",
    date: "2025-07-16T21:00:00Z",
    timeAgo: "10mins ago",
    status: "unread",
  },
  {
    id: "8",
    user: "Charles Nartey",
    action: "created a purchase requisition",
    date: "2025-07-10T10:00:00Z",
    timeAgo: "Last 7 days",
    status: "read",
  },
  {
    id: "9",
    user: "System",
    action: "Paracetamol API out of stock 150kg",
    date: "2025-07-10T10:00:00Z",
    timeAgo: "10mins ago",
    status: "read",
  },
  {
    id: "10",
    user: "Anthony Gyan",
    action: "created a purchase requisition",
    date: "2025-07-09T13:00:00Z",
    timeAgo: "Last 7 days",
    status: "read",
  },
  {
    id: "11",
    user: "Theresa Boateng",
    action: "created a purchase requisition",
    date: "2025-07-08T15:00:00Z",
    timeAgo: "Last 7 days",
    status: "read",
  },
];

type Notification = {
  id: string;
  user: string;
  action: string;
  date: string;
  timeAgo: string;
  status: "read" | "unread";
};

type GroupedData = {
  date: string;
  items: Notification[];
};

export const groupByDate = (data: Notification[]): GroupedData[] => {
  const map = new Map<string, Notification[]>();

  data.forEach((item) => {
    const parsedDate = parseISO(item.date);
    const day = format(parsedDate, "yyyy-MM-dd"); // format to "2025-07-17"

    if (!map.has(day)) {
      map.set(day, []);
    }
    map.get(day)?.push(item);
  });

  // Convert map to array
  return Array.from(map.entries()).map(([date, items]) => ({
    date,
    items,
  }));
};

//eaagyeman
// 1234;
