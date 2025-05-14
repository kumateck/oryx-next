// components/withPermission.tsx

import { hasPermissionForKey, Section } from "@/lib";
import { useGetApiV1PermissionUserByUserIdQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withPermission(Component: React.FC, permissionKey: string) {
  return function ProtectedComponent(props: any) {
    const userId = useSelector((state) => state.persistedReducer?.auth?.userId);
    const { data: permissions, isLoading } =
      useGetApiV1PermissionUserByUserIdQuery({
        userId: userId as string,
      });
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && permissions) {
        const permissionLists = permissions as Section[];
        const allowed = hasPermissionForKey(permissionLists, permissionKey);
        if (!allowed) {
          router.replace("/no-access");
        }
      }
    }, [permissions, isLoading, router]);

    if (isLoading || !permissions) return <div>Loading...</div>;

    return <Component {...props} />;
  };
}
