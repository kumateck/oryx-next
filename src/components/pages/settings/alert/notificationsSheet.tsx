import {
  Icon,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { format, parseISO } from "date-fns";

import React from "react";

import ScrollableWrapper from "@/shared/scroll-wrapper";
import { useGetApiV1AlertNotificationsQuery } from "@/lib/redux/api/openapi.generated";

export function NotificationsSheet() {
  const { data: unReadNotfications } = useGetApiV1AlertNotificationsQuery({
    unreadOnly: true,
  });

  const notificationCount = unReadNotfications?.length ?? 0;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative inline-block">
          <Icon
            name="Bell"
            className="size-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
          />

          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] px-1">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <ScrollableWrapper>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-xl">Notifications</SheetTitle>

            <div className="space-y-6">
              <div className="border-b">
                <h1>Unread ({unReadNotfications?.length}) </h1>
              </div>

              {unReadNotfications?.map((item, idx) => (
                <div key={idx}>
                  {/* <h1>{format(new Date(data.date), "MMM d, yyyy")}</h1> */}
                  <div className="space-y-3 ">
                    {/* {data.items.map((item) => (
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
                      ))} */}
                    {item.message}
                  </div>
                </div>
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </ScrollableWrapper>
    </Sheet>
  );
}

// const notifications: Notification[] = [
//   {
//     id: "1",
//     user: "Abigail Tobbin",
//     action: "created a purchase requisition",
//     date: "2025-07-17T09:50:00Z",
//     timeAgo: "10mins ago",
//     status: "unread",
//   },
//   {
//     id: "2",
//     user: "Desmond Adusei",
//     action: "rejected a leave request",
//     date: "2025-05-09T14:53:00Z",
//     timeAgo: "May 9 @ 2:53 PM",
//     status: "read",
//   },
//   {
//     id: "3",
//     user: "Eugene Dumoga",
//     action: "created a purchase requisition",
//     date: "2025-05-01T22:50:00Z",
//     timeAgo: "May 1 @ 10:50 PM",
//     status: "read",
//   },
//   {
//     id: "4",
//     user: "System",
//     action: "Paracetamol API below reorder level 150kg",
//     date: "2025-07-16T21:00:00Z",
//     timeAgo: "10mins ago",
//     status: "unread",
//   },
//   {
//     id: "5",
//     user: "Douglas Boakye",
//     action: "created a purchase requisition",
//     date: "2025-07-16T21:00:00Z",
//     timeAgo: "10mins ago",
//     status: "unread",
//   },
//   {
//     id: "6",
//     user: "Leeroy Solomon",
//     action: "created a purchase requisition",
//     date: "2025-07-16T21:00:00Z",
//     timeAgo: "10mins ago",
//     status: "unread",
//   },
//   {
//     id: "7",
//     user: "Bernd Opoku",
//     action: "created a purchase requisition",
//     date: "2025-07-16T21:00:00Z",
//     timeAgo: "10mins ago",
//     status: "unread",
//   },
//   {
//     id: "8",
//     user: "Charles Nartey",
//     action: "created a purchase requisition",
//     date: "2025-07-10T10:00:00Z",
//     timeAgo: "Last 7 days",
//     status: "read",
//   },
//   {
//     id: "9",
//     user: "System",
//     action: "Paracetamol API out of stock 150kg",
//     date: "2025-07-10T10:00:00Z",
//     timeAgo: "10mins ago",
//     status: "read",
//   },
//   {
//     id: "10",
//     user: "Anthony Gyan",
//     action: "created a purchase requisition",
//     date: "2025-07-09T13:00:00Z",
//     timeAgo: "Last 7 days",
//     status: "read",
//   },
//   {
//     id: "11",
//     user: "Theresa Boateng",
//     action: "created a purchase requisition",
//     date: "2025-07-08T15:00:00Z",
//     timeAgo: "Last 7 days",
//     status: "read",
//   },
// ];

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
