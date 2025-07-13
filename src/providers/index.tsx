import ClientProviders from "./client-provider";
import NotificationProvider from "./notification";
import ServerProviders from "./server-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ServerProviders>
      <ClientProviders>
        <NotificationProvider>{children}</NotificationProvider>
      </ClientProviders>
    </ServerProviders>
  );
};

export default Providers;
