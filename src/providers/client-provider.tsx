"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from "@/components/ui";
import { reduxPersistor, reduxStore } from "@/lib/redux/store";
import { useEffect } from "react";

function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the socket connection
    fetch("/api/socket");
  }, []);
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        {children}
        <Toaster closeButton position="top-right" richColors />
      </PersistGate>
    </Provider>
  );
}
export default ClientProviders;
