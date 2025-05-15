// // hooks/useUserPermissions.ts
// "use client";

// import { hasPermissionForKey, Section } from "@/lib";
// import { useCallback, useEffect, useState } from "react";

// const STORAGE_KEY = "userPermissions";

// export const useUserPermissions = () => {
//   const [permissions, setPermissions] = useState<Section[]>([]);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     try {
//       const stored = localStorage.getItem(STORAGE_KEY);
//       if (stored) {
//         setPermissions(JSON.parse(stored));
//       }
//     } catch (error) {
//       console.error("Failed to parse userPermissions", error);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
//   }, [permissions]);

//   const setUserPermissions = useCallback((sections: Section[]) => {
//     setPermissions(sections);
//   }, []);

//   const clearPermissions = useCallback(() => {
//     setPermissions([]);
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
//     hasPermissionForKey: checkPermission,
//   };
// };

"use client";

import { hasPermissionForKey, Section } from "@/lib";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "userPermissions";

export const useUserPermissions = () => {
  const [permissions, setPermissions] = useState<Section[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPermissions(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse userPermissions", error);
    } finally {
      setHasInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
  }, [permissions, hasInitialized]);

  const setUserPermissions = useCallback((sections: Section[]) => {
    setPermissions(sections);
  }, []);

  const clearPermissions = useCallback(() => {
    setPermissions([]);
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
    hasPermissionForKey: checkPermission,
  };
};
