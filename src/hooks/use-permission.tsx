// "use client";

// import { hasPermissionForKey, Section } from "@/lib";
// import { useLazyGetApiV1PermissionUserByUserIdQuery } from "@/lib/redux/api/openapi.generated";
// import { useSelector } from "@/lib/redux/store";
// import { useCallback, useEffect, useState } from "react";

// const STORAGE_KEY = "userPermissions";

// export const useUserPermissions = () => {
//   const [permissions, setPermissions] = useState<Section[]>([]);
//   const [loading, setLoading] = useState(true);

//   const userId = useSelector((state) => state.persistedReducer?.auth?.userId);
//   const [loadUserPermissions] = useLazyGetApiV1PermissionUserByUserIdQuery();

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const init = async () => {
//       try {
//         const stored = localStorage.getItem(STORAGE_KEY);

//         if (stored) {
//           setPermissions(JSON.parse(stored));
//           setLoading(false);
//           return;
//         }

//         if (userId) {
//           const response = await loadUserPermissions({ userId }).unwrap();
//           localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
//           const userPermissions = (response ?? []) as Section[];
//           setPermissions(userPermissions);
//         }
//       } catch (error) {
//         console.error("Failed to load permissions", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     init();
//   }, [userId, loadUserPermissions]);

//   // Persist to localStorage only if not loading
//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
//     }
//   }, [permissions, loading]);

//   const setUserPermissions = useCallback((sections: Section[]) => {
//     setPermissions(sections);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
//   }, []);

//   const clearPermissions = useCallback(() => {
//     setPermissions([]);
//     localStorage.removeItem(STORAGE_KEY);
//   }, []);

//   const checkPermission = useCallback(
//     (key: string): boolean => {
//       return hasPermissionForKey(permissions, key);
//     },
//     [permissions],
//   );

//   return {
//     permissions,
//     setUserPermissions,
//     clearPermissions,
//     hasPermissionAccess: checkPermission,
//     loading,
//   };
// };
"use client";

import { hasPermissionForKey, Section } from "@/lib";
import { useLazyGetApiV1PermissionUserByUserIdQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "userPermissions";

// Utility to determine if the permissions data is valid
function isValidPermissions(data: any): data is Section[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.some(
      (section) =>
        typeof section === "object" &&
        Array.isArray(section.children) &&
        section.children.length > 0,
    )
  );
}

export const useUserPermissions = () => {
  const [permissions, setPermissions] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.persistedReducer?.auth?.userId);
  const [loadUserPermissions] = useLazyGetApiV1PermissionUserByUserIdQuery();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : null;

        if (isValidPermissions(parsed)) {
          setPermissions(parsed);
        } else if (userId) {
          const response = await loadUserPermissions({ userId }).unwrap();
          const userPermissions = (response ?? []) as Section[];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userPermissions));
          setPermissions(userPermissions);
        }
      } catch (error) {
        console.error("Failed to load permissions", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [userId, loadUserPermissions]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
    }
  }, [permissions, loading]);

  const setUserPermissions = useCallback((sections: Section[]) => {
    setPermissions(sections);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  }, []);

  const clearPermissions = useCallback(() => {
    setPermissions([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const checkPermission = useCallback(
    (key: string): boolean => {
      return hasPermissionForKey(permissions, key);
    },
    [permissions],
  );

  return {
    permissions,
    setUserPermissions,
    clearPermissions,
    hasPermissionAccess: checkPermission,
    loading,
  };
};
