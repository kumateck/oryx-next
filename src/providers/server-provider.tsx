import { CookiesProvider } from "next-client-cookies/server";

interface Props {
  children: React.ReactNode;
}

const ServerProviders = ({ children }: Props) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default ServerProviders;
