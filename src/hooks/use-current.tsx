import { AuditModules } from "@/lib";
import { useGetApiV1UserAuthenticatedQuery } from "@/lib/redux/api/openapi.generated";

const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetApiV1UserAuthenticatedQuery({
    module: AuditModules.settings.name,
    subModule: AuditModules.settings.authUser,
  });

  return {
    user,
    isLoading,
    error,
    refetch,
    isAuthenticated: !!user,
  };
};

export default useCurrentUser;
