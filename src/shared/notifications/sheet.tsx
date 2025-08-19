import React, { useState, useMemo } from "react";
import { Bell, Check, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationDto } from "@/lib/redux/api/openapi.generated";
import { Icon } from "@/components/ui";
import { NotificationType } from "@/lib";

// Extended type to track read status
type NotificationWithReadStatus = NotificationDto & {
  isRead: boolean;
};

// Props interface for the component
interface NotificationAreaProps {
  unreadNotifications?: NotificationDto[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  isLoading?: boolean;
}

// Skeleton component for loading state
const NotificationSkeleton: React.FC = () => (
  <div className="p-6 border-l-4 border-l-gray-300">
    <div className="flex items-start gap-4">
      <Skeleton className="w-4 h-4 mt-1 flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <Skeleton className="w-2 h-2 rounded-full flex-shrink-0 mt-2" />
    </div>
  </div>
);

const NotificationArea: React.FC<NotificationAreaProps> = ({
  unreadNotifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  isLoading = false,
}) => {
  // Convert API data to include read status (API only returns unread, so we'll manage read state locally)
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set(),
  );
  const [isOpen, setIsOpen] = useState(false);

  // Combine unread notifications with local read state
  const notifications = unreadNotifications.map((notification) => ({
    ...notification,
    isRead: readNotifications.has(notification.id || ""),
  }));

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setReadNotifications((prev) => new Set([...prev, id]));
    onMarkAsRead?.(id);
  };

  const markAllAsRead = () => {
    const allIds = new Set(
      notifications.map((n) => n.id).filter(Boolean) as string[],
    );
    setReadNotifications(allIds);
    onMarkAllAsRead?.();
  };

  const getTypeStyles = (type?: NotificationType) => {
    switch (type) {
      case NotificationType.ProductionStageChanged:
        return "border-l-blue-500 bg-blue-50";
      case NotificationType.ShiftAssigned:
        return "border-l-purple-500 bg-purple-50";
      case NotificationType.ShipmentArrived:
        return "border-l-green-500 bg-green-50";
      case NotificationType.MaterialAboveMaxStock:
        return "border-l-orange-500 bg-orange-50";
      case NotificationType.MaterialBelowMinStock:
        return "border-l-red-500 bg-red-50";
      case NotificationType.MaterialReachedReorderLevel:
        return "border-l-yellow-500 bg-yellow-50";
      case NotificationType.StockRequisitionCreated:
        return "border-l-teal-500 bg-teal-50";
      case NotificationType.PartialRequisitionCreated:
        return "border-l-cyan-500 bg-cyan-50";
      case NotificationType.PartialRequestProduction:
        return "border-l-indigo-500 bg-indigo-50";
      case NotificationType.OvertimeRequest:
        return "border-l-amber-500 bg-amber-50";
      case NotificationType.LeaveRequest:
        return "border-l-pink-500 bg-pink-50";
      case NotificationType.StaffRequest:
        return "border-l-rose-500 bg-rose-50";
      case NotificationType.AuditLogEvent:
        return "border-l-gray-500 bg-gray-50";
      case NotificationType.BmrBprRequested:
        return "border-l-violet-500 bg-violet-50";
      case NotificationType.BmrBprApproved:
        return "border-l-emerald-500 bg-emerald-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const getTypeIcon = (type?: NotificationType) => {
    switch (type) {
      case NotificationType.ProductionStageChanged:
        return <span className="w-4 h-4 text-blue-600 text-sm">🔄</span>;
      case NotificationType.ShiftAssigned:
        return <span className="w-4 h-4 text-purple-600 text-sm">📅</span>;
      case NotificationType.ShipmentArrived:
        return <span className="w-4 h-4 text-green-600 text-sm">📦</span>;
      case NotificationType.MaterialAboveMaxStock:
        return <span className="w-4 h-4 text-orange-600 text-sm">📈</span>;
      case NotificationType.MaterialBelowMinStock:
        return <span className="w-4 h-4 text-red-600 text-sm">📉</span>;
      case NotificationType.MaterialReachedReorderLevel:
        return <span className="w-4 h-4 text-yellow-600 text-sm">⚠️</span>;
      case NotificationType.StockRequisitionCreated:
        return <span className="w-4 h-4 text-teal-600 text-sm">📋</span>;
      case NotificationType.PartialRequisitionCreated:
        return <span className="w-4 h-4 text-cyan-600 text-sm">📝</span>;
      case NotificationType.PartialRequestProduction:
        return <span className="w-4 h-4 text-indigo-600 text-sm">⚙️</span>;
      case NotificationType.OvertimeRequest:
        return <span className="w-4 h-4 text-amber-600 text-sm">⏰</span>;
      case NotificationType.LeaveRequest:
        return <span className="w-4 h-4 text-pink-600 text-sm">🏖️</span>;
      case NotificationType.StaffRequest:
        return <span className="w-4 h-4 text-rose-600 text-sm">👥</span>;
      case NotificationType.AuditLogEvent:
        return <span className="w-4 h-4 text-gray-600 text-sm">🔍</span>;
      case NotificationType.BmrBprRequested:
        return <span className="w-4 h-4 text-violet-600 text-sm">📄</span>;
      case NotificationType.BmrBprApproved:
        return <Check className="w-4 h-4 text-emerald-600" />;
      default:
        return <span className="w-4 h-4 text-blue-600 text-sm">ℹ️</span>;
    }
  };

  const getTimePeriod = (dateString?: string) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const notificationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    if (notificationDate.getTime() === today.getTime()) {
      return "Today";
    } else if (notificationDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      const diffTime = today.getTime() - notificationDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        return "This Week";
      } else if (diffDays <= 30) {
        return "This Month";
      } else if (diffDays <= 90) {
        return "Last 3 Months";
      } else {
        return "Older";
      }
    }
  };

  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: NotificationWithReadStatus[] } = {};

    notifications.forEach((notification) => {
      const period = getTimePeriod(notification.sentAt);
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(notification);
    });

    // Sort groups by priority and notifications within groups by date (newest first)
    const sortedGroups: { [key: string]: NotificationWithReadStatus[] } = {};
    const periodOrder = [
      "Today",
      "Yesterday",
      "This Week",
      "This Month",
      "Last 3 Months",
      "Older",
    ];

    periodOrder.forEach((period) => {
      if (groups[period]) {
        sortedGroups[period] = groups[period].sort(
          (a, b) =>
            new Date(b.sentAt!).getTime() - new Date(a.sentAt!).getTime(),
        );
      }
    });

    return sortedGroups;
  }, [notifications]);

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderLoadingSkeleton = () => (
    <div className="space-y-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <NotificationSkeleton key={index} />
      ))}
    </div>
  );

  const renderNotifications = () => {
    if (isLoading) {
      return renderLoadingSkeleton();
    }

    if (notifications.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No notifications
          </h3>
          <p className="text-gray-500">
            You&apos;re all caught up! New notifications will appear here.
          </p>
        </div>
      );
    }

    return Object.entries(groupedNotifications).map(
      ([period, periodNotifications]) => (
        <div key={period}>
          {/* Period Header */}
          <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm px-6 py-3 border-b border-gray-200 z-10">
            <h4 className="text-sm font-semibold text-gray-700">{period}</h4>
          </div>

          {/* Notifications in this period */}
          <div className="divide-y divide-gray-100">
            {periodNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 border-l-4 transition-all duration-200 hover:bg-gray-50 ${
                  notification.isRead
                    ? "bg-white border-l-gray-300 opacity-75"
                    : getTypeStyles(notification.type)
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-relaxed ${
                        notification.isRead
                          ? "text-gray-600"
                          : "text-gray-900 font-medium"
                      }`}
                    >
                      {notification.message}
                    </p>

                    {notification.recipients &&
                      notification.recipients.length > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            To:{" "}
                            {notification.recipients
                              .map((r) => `${r.firstName} ${r.lastName}`.trim())
                              .join(", ")}
                          </span>
                        </div>
                      )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500 font-medium">
                        {formatTime(notification.sentAt)}
                      </span>

                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id!)}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>

                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative inline-block">
          <Icon
            name="Bell"
            className="size-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
          />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[440px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                {isLoading
                  ? "Loading notifications..."
                  : unreadCount > 0
                    ? `${unreadCount} unread notifications`
                    : "All caught up!"}
              </SheetDescription>
            </div>
            {!isLoading && unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-md hover:bg-blue-50"
              >
                Mark all read
              </button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">{renderNotifications()}</ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationArea;
