"use client";
// import NotificationListener from "@/components/notification";
import React from "react";

interface NotificationProviderProps {
  children: React.ReactNode;
}
const NotificationProvider = ({ children }: NotificationProviderProps) => {
  return (
    <div>
      {children}
      {/* <NotificationListener className="max-w-2xl" /> */}
    </div>
  );
};

export default NotificationProvider;
