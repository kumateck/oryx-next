// "use client";
// import { Provider } from "react-redux";
// // import { PersistGate } from "redux-persist/integration/react";
// import { Toaster } from "@/components/ui";
// import { reduxStore } from "@/lib/redux/store";
// function Providers({ children }: { children: React.ReactNode }): JSX.Element {
//   return (
//     <Provider store={reduxStore}>
//       {/* <PersistGate loading={<p>loading...</p>} persistor={reduxPersistor}> */}
//       {children}
//       {/* </PersistGate> */}
//       <Toaster closeButton position="top-right" richColors />
//     </Provider>
//   );
// }
// export default Providers;
import ClientProviders from "./client-provider";
import ServerProviders from "./server-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ServerProviders>
      <ClientProviders>{children}</ClientProviders>
    </ServerProviders>
  );
};

export default Providers;
