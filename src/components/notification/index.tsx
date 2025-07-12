import { useSocket } from "@/hooks/useSocket";
import { NotificationData } from "@/lib";
import React, { useState, useCallback } from "react";

interface NotificationListenerProps {
  className?: string;
}

const NotificationListener: React.FC<NotificationListenerProps> = ({
  className,
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const handleNotification = useCallback((data: NotificationData) => {
    console.log(data, " nofifications");
    setNotifications((prev) => [...prev, data]);
  }, []);

  const { isConnected } = useSocket(handleNotification);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Real-time Notifications</h2>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
          />
          <span className="text-sm text-gray-600">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet...</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              {notifications.length} notification(s)
            </span>
            <button
              onClick={clearNotifications}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="text-sm text-gray-800">
                  {notification.message?.message ||
                    JSON.stringify(notification)}
                </div>
                {notification.timestamp && (
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationListener;
