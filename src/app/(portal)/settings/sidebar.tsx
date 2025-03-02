// import { useRouter } from "next/navigation";
// import { Icon } from "@/components/ui";
// import { cn } from "@/lib";
// export type SidebarItem = {
//   name: string;
//   component?: React.ReactNode;
//   tag: string;
// };
// export const SIDEBAR_ITEMS: SidebarItem[] = [
//   {
//     name: "Configurations",
//     tag: "",
//     // component: <TagsPage />,
//   },
//   {
//     name: "Code Settings",
//     tag: "code-settings",
//     // component: <FormOptionTabs />,
//   },
//   {
//     name: "Change Password",
//     tag: "change-password",
//     // component: <ChangePassword />,
//   },
//   {
//     name: "Approvals",
//     tag: "approvals",
//     // component: <ApprovalsPage />,
//   },
//   {
//     name: "Alerts & Notifications",
//     tag: "alerts",
//     // component: <Alerts />,
//   },
//   {
//     name: "Currency Settings",
//     tag: "currency-settings",
//     // component: <Alerts />,
//   },
// ];
// export type SidebarProps = {
//   activeItem?: string;
//   onChange: (itemName: string) => unknown;
// };
// export const Sidebar = ({ activeItem, onChange }: SidebarProps) => {
//   // const navigate = useNavigate(); // Hook to navigate
//   const router = useRouter();
//   return (
//     <div className="h-full w-48 space-y-2">
//       {SIDEBAR_ITEMS.map((item) => {
//         const isActive = activeItem === item.tag;
//         return (
//           <div
//             key={item.name} // Add key prop
//             onClick={() => {
//               onChange(item.tag);
//               router.push(item.tag);
//             }}
//             className={cn(
//               "text-muted-foreground relative w-full cursor-pointer text-sm",
//               isActive && "font-Bold text-black",
//             )}
//           >
//             {isActive && (
//               <div className="absolute -left-6 top-1/2 -translate-y-1/2">
//                 <Icon name="ChevronRight" />
//               </div>
//             )}
//             <span className="text-sm">{item.name}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/ui";
import { cn } from "@/lib";

export type SidebarItem = {
  name: string;
  component?: React.ReactNode;
  tag: string;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Configurations",
    tag: "/settings",
  },
  {
    name: "Code Settings",
    tag: "/settings/code-settings",
  },
  {
    name: "Change Password",
    tag: "change-password",
  },
  {
    name: "Approvals",
    tag: "/settings/approvals",
  },
  {
    name: "Alerts & Notifications",
    tag: "alerts",
  },
  {
    name: "Currency Settings",
    tag: "currency-settings",
  },
  {
    name: "Equipment",
    tag: "/settings/equipments",
  },
];

export type SidebarProps = {
  activeItem?: string;
  onChange: (itemName: string) => unknown;
};

export const Sidebar = () => {
  const currentPath = usePathname(); // Get the current path

  return (
    <ul className="h-full w-48 space-y-2">
      {SIDEBAR_ITEMS.map((item, idx) => {
        const isActive = item.tag === currentPath;
        return (
          <li key={idx}>
            <Link
              href={item.tag}
              // onClick={() => {
              //   onChange(item.tag);
              //   // Navigate to the child route by appending the tag to the current path
              //   router.push(`${currentPath}/${item.tag}`);
              // }}
              className={cn(
                "text-muted-foreground relative w-full cursor-pointer text-sm",
                isActive && "font-Bold text-black",
              )}
            >
              {isActive && (
                <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                  <Icon name="ChevronRight" />
                </div>
              )}
              <span className="text-sm">{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
