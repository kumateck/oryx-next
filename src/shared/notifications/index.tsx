// Example of how to use the NotificationArea component with your API

import {
  NotificationDto,
  useGetApiV1AlertNotificationsQuery,
} from "@/lib/redux/api/openapi.generated";
import React from "react";
import NotificationArea from "./sheet";

const NotificationSheet: React.FC = () => {
  const { data: unReadNotifications, isLoading } =
    useGetApiV1AlertNotificationsQuery({
      unreadOnly: true,
    });

  // Optional: Add mutation hooks for marking notifications as read
  // const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  // const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation();

  const handleMarkAsRead = async (id: string) => {
    try {
      // Call your API to mark notification as read
      // await markNotificationAsRead({ id }).unwrap();
      console.log(`Marking notification ${id} as read`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Call your API to mark all notifications as read
      // await markAllNotificationsAsRead().unwrap();
      console.log("Marking all notifications as read");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  return (
    <NotificationArea
      unreadNotifications={unReadNotifications as NotificationDto[]}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      isLoading={isLoading}
    />
  );
};

export default NotificationSheet;
