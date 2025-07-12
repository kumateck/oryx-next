import { NotificationData, SocketHookReturn } from "@/lib";
import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (
  onNotification?: (data: NotificationData) => void,
): SocketHookReturn => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleNotification = useCallback(
    (data: NotificationData) => {
      console.log("📥 Received notification:", data);
      if (onNotification) {
        onNotification(data);
      }
    },
    [onNotification],
  );

  useEffect(() => {
    // Initialize the socket server first
    const initializeSocket = async () => {
      try {
        // Call the API to initialize the Socket.io server
        const response = await fetch("/api/socket");
        const data = await response.json();

        if (data.status === "success") {
          const socketPort = data.socketPort || 3002;

          // Connect to the Socket.io server
          socketRef.current = io(`http://localhost:${socketPort}`, {
            transports: ["websocket", "polling"],
          });

          // Listen for notifications
          socketRef.current.on("notification", handleNotification);

          socketRef.current.on("connect", () => {
            console.log("🔌 Connected to Socket.io server");
            setIsConnected(true);
          });

          socketRef.current.on("disconnect", () => {
            console.log("❌ Disconnected from Socket.io server");
            setIsConnected(false);
          });

          socketRef.current.on("connect_error", (error) => {
            console.error("❌ Connection error:", error);
            setIsConnected(false);
          });
        }
      } catch (error) {
        console.error("Failed to initialize socket:", error);
      }
    };

    initializeSocket();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [handleNotification]);

  return {
    socket: socketRef.current,
    isConnected,
  };
};
