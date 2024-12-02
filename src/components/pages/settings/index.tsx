// import React, { useEffect, useState } from "react";
// import { Icon } from "@/components/ui";
// import { cn } from "@/lib/utils";
// // import Alerts from "./alerts";
// // import ApprovalsPage from "./approvals/index";
// // import ChangePassword from "./chg-pwd";
// // import FormOptionTabs from "./form-options/tabs";
// // import TagsPage from "./tags";
// const Sidebar: React.FC<SidebarProps> = ({ activeItem, onChange }) => {
//   // const navigate = useNavigate(); // Hook to navigate
//   return (
//     <div className="h-full w-48 space-y-2">
//       {SIDEBAR_ITEMS.map((item) => {
//         const isActive = activeItem === item.tag;
//         return (
//           <div
//             key={item.name} // Add key prop
//             onClick={() => {
//               onChange(item.tag);
//               // navigate(item.tag);
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
// const Settings = () => {
//   // const location = useLocation();
//   const [activePage, setActivePage] = useState(SIDEBAR_ITEMS[0].tag);
//   const pathSegments = location.pathname.split("/").filter(Boolean); // Filters out empty strings
//   const childRoute = pathSegments.length > 1 ? pathSegments[1] : ""; // Assumes first part is parent route, second part is child
//   useEffect(() => {
//     setActivePage(childRoute);
//   }, [childRoute]);
//   return (
//     <div className="flex h-full w-full">
//       <div className="w-full space-y-12 pl-2">
//         <div className="font-Medium text-4xl">Settings</div>
//         <div className="flex h-full gap-12 pb-24">
//           <Sidebar
//             activeItem={activePage}
//             onChange={(itemName) => setActivePage(itemName)}
//           />
//           <div className="border-r-2 border-r-neutral-300"></div>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Settings;
import React from "react";

const Settings = () => {
  return <div>Settings</div>;
};

export default Settings;
