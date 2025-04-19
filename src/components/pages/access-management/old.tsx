// import React, { useState } from "react";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import {
//   Button,
//   Icon,
//   SelectDropDown,
//   Switch,
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "~/components/ui";
// import { DEFAULT_API_PAYLOAD, Option } from "~/lib/constants";
// import { cn } from "~/lib/utils";
// import { restApi } from "~/redux/restApi";

// import StepWrapper from "../../itemManagement/incidents/create/steps/wrapper";

// const Access: React.FC = () => {
//   const { data } = restApi.useGetRolesQuery({
//     ...DEFAULT_API_PAYLOAD,
//   });

//   const roles = data?.result;
//   const rolesOptions = roles?.map((role) => ({
//     label: role.displayName,
//     value: role.id,
//   })) as Option[];

//   const [permissions, setPermissions] =
//     useState<Permission[]>(initialPermissions);
//   const handleToggle = (
//     sectionIndex: number,
//     childKey: string,
//     type: string,
//   ) => {
//     setPermissions((prevPermissions) => {
//       // Create a copy of the permissions array
//       const updatedPermissions = [...prevPermissions];

//       const section = updatedPermissions[sectionIndex];
//       // Find the child in the children array by key
//       const child = section?.children?.find((c) => c.key === childKey);

//       if (child) {
//         // Check if the type exists in the types array
//         const hasType = child.types.includes(type);

//         // Create a new array for types with the desired modification
//         const updatedTypes = hasType
//           ? child.types.filter((t) => t !== type) // Remove the type if it exists
//           : [...child.types, type]; // Add the type if it doesn't exist

//         // Update the child types with the new array
//         child.types = updatedTypes;
//       }

//       // Return the modified permissions array
//       return updatedPermissions;
//     });
//   };

//   const handleSectionToggle = (sectionIndex: number) => {
//     setPermissions((prevPermissions) => {
//       const updatedPermissions = [...prevPermissions];
//       updatedPermissions[sectionIndex].isActive =
//         !updatedPermissions[sectionIndex].isActive;
//       return updatedPermissions;
//     });
//   };

//   return (
//     <div className="space-y-5 p-5">
//       <div className="flex justify-between gap-4">
//         <div>
//           <span className="block font-Medium text-2xl">
//             Roles & Permissions
//           </span>
//           <span className="block text-sm font-normal text-neutral-500">
//             Allows you to assign and manage access levels for different users
//             within the system
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <SelectDropDown
//             options={rolesOptions}
//             className="w-60 rounded-2xl border border-neutral-300 bg-white"
//           />
//           <Button className="flex items-center gap-2">
//             <HiOutlineUserGroup className="text-secondary-500" />
//             <span>Manage Roles</span>
//           </Button>
//         </div>
//       </div>
//       <StepWrapper>
//         <Tabs defaultValue={permissions[0].section}>
//           <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
//             {permissions.map((tab, idx) => (
//               <TabsTrigger
//                 key={idx}
//                 value={tab.section}
//                 className="h-10 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:border-b-primary-500 data-[state=active]:bg-transparent data-[state=active]:font-Bold data-[state=active]:text-primary-500 data-[state=active]:shadow-none"
//               >
//                 {tab.section}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {permissions.map((tab, pidx) => (
//             <TabsContent value={tab.section} key={pidx} className="h-full">
//               <div className="flex items-center gap-2 pb-8">
//                 <Icon
//                   name={tab.isActive ? "LockKeyholeOpen" : "LockKeyhole"}
//                   className="h-4 w-4"
//                 />
//                 <span>{tab.isActive ? "Access" : "No Access"}</span>
//                 <Switch
//                   checked={tab.isActive}
//                   onCheckedChange={() => handleSectionToggle(pidx)}
//                   className="h-4 w-7"
//                   thumbClassName="h-3 w-3 data-[state=checked]:translate-x-3"
//                 />
//               </div>
//               {/* inner tabs */}
//               <Tabs
//                 defaultValue={Object.entries(groupByModule(tab.children))[0][0]}
//                 orientation="vertical"
//                 // onValueChange={setActiveModule}
//                 // className={tab.isActive ? "" : "pointer-events-none opacity-50"}
//                 className={cn("w-full", {
//                   "pointer-events-none opacity-50": !tab.isActive,
//                 })}
//               >
//                 <div className="white grid h-full min-h-96 grid-cols-6 rounded-2xl border border-neutral-300 bg-neutral-50">
//                   {/* Sidebar for Grouped Modules */}
//                   <div className="col-span-1 space-y-4 rounded-s-2xl border-r border-r-neutral-300 p-2">
//                     <span>Sections</span>
//                     <div className="">
//                       <TabsList className="w-full flex-col items-start space-y-2 bg-transparent">
//                         {Object.entries(groupByModule(tab.children)).map(
//                           ([module], midx) => (
//                             <TabsTrigger
//                               key={midx}
//                               value={module}
//                               className="w-full justify-start text-primary-500 data-[state=active]:w-full data-[state=active]:rounded-2xl data-[state=active]:bg-primary-500 data-[state=active]:text-white"
//                             >
//                               {module}
//                             </TabsTrigger>
//                           ),
//                         )}
//                       </TabsList>
//                     </div>
//                   </div>

//                   {/* Content for Items */}
//                   <div className="col-span-5 rounded-r-2xl rounded-t-2xl bg-white">
//                     <div className="grid grid-cols-6 overflow-hidden border-b border-b-neutral-300">
//                       <div className="col-span-2 bg-neutral-50 p-2">
//                         <span>Items</span>
//                       </div>
//                       <div className="mx-auto flex w-full items-center justify-center bg-neutral-50 p-2">
//                         <span>Self Access</span>
//                       </div>
//                       <div className="mx-auto flex w-full items-center justify-center bg-neutral-50 p-2">
//                         <span>Direct Report</span>
//                       </div>
//                       <div className="mx-auto flex w-full items-center justify-center bg-neutral-50 p-2">
//                         <span>Indirect Report</span>
//                       </div>
//                       <div className="mx-auto flex w-full items-center justify-center rounded-t-2xl bg-neutral-50 p-2">
//                         <span>Everyone</span>
//                       </div>
//                     </div>

//                     {/* Grouped Items by Module */}
//                     <div className="bg-white">
//                       {Object.entries(groupByModule(tab.children)).map(
//                         ([module, childrenInModule], mpidx) => (
//                           <TabsContent
//                             value={module}
//                             key={mpidx}
//                             className="mt-0 grid grid-cols-6 bg-white"
//                           >
//                             {childrenInModule.map((child, mcidx) => (
//                               <React.Fragment key={mcidx}>
//                                 <div className="col-span-2 border-b border-r border-b-neutral-300 border-r-neutral-300 bg-white px-3 py-2">
//                                   <span className="block font-Bold text-sm text-black">
//                                     {child.name}
//                                   </span>
//                                   <p className="text-sm font-normal text-neutral-400">
//                                     {child.description}
//                                   </p>
//                                 </div>
//                                 {types.map((type, tidx) => (
//                                   <div
//                                     className="mx-auto flex w-full items-center justify-center border-b border-b-neutral-300 bg-white"
//                                     key={tidx}
//                                   >
//                                     <Switch
//                                       checked={child.types.includes(type)}
//                                       onCheckedChange={() =>
//                                         handleToggle(pidx, child.key, type)
//                                       }
//                                       key={tidx}
//                                       className="h-4 w-7"
//                                       thumbClassName="h-3 w-3 data-[state=checked]:translate-x-3"
//                                     />
//                                   </div>
//                                 ))}
//                               </React.Fragment>
//                             ))}
//                           </TabsContent>
//                         ),
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Tabs>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </StepWrapper>
//       <div className="flex justify-end gap-4">
//         <Button variant={"outline"} type="button">
//           Reset Changes
//         </Button>
//         <Button variant={"secondary"} type="button">
//           Cancel
//         </Button>
//         <Button>Apply Changes</Button>
//       </div>
//     </div>
//   );
// };

// export default Access;

// const types = ["Self", "Direct", "Indirect", "Everyone"];

// interface PermissionChild {
//   key: string;
//   name: string;
//   description: string;
//   module: string;
//   types: string[];
// }

// interface Permission {
//   section: string;
//   isActive: boolean;
//   children: PermissionChild[];
// }
// const initialPermissions: Permission[] = [
//   {
//     section: "General Section",
//     isActive: true,
//     children: [
//       {
//         key: "view_actions_on_dashboard",
//         name: "Can View Actions on Dashboard",
//         description:
//           "Allows members to view incidents assigned to their direct reports.",
//         module: "Dashboard",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//       {
//         key: "view_items_on_dashboard",
//         name: "Can View Items on Dashboard",
//         description:
//           "Allows members to view incidents assigned to employees who report indirectly through their direct reports.",
//         module: "Dashboard",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//       {
//         key: "view_dashboards_on_reports",
//         name: "Can View Dashboards on Reports",
//         description:
//           "Allows members to manage incidents assigned to their direct reports.",
//         module: "Reports",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//       {
//         key: "view_queries_on_reports",
//         name: "Can View Queries on Reports",
//         description:
//           "Allows members to manage incidents assigned to employees who report indirectly through their direct reports.",
//         module: "My Actions",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//     ],
//   },
//   {
//     section: "Item Mgt",
//     isActive: false,
//     children: [
//       {
//         key: "add_new_item",
//         name: "Can Add New Item",
//         description: "Allows members to add new items to the inventory.",
//         module: "Incident",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//       {
//         key: "edit_item",
//         name: "Can Edit Item",
//         description: "Allows members to edit details of existing items.",
//         module: "Observation",
//         types: ["Self", "Direct", "Everyone"],
//       },
//       {
//         key: "delete_item",
//         name: "Can Delete Item",
//         description: "Allows members to delete items from the inventory.",
//         module: "Inspection",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//       {
//         key: "view_item_details",
//         name: "Can View Item Details",
//         description:
//           "Allows members to view details of items in the inventory.",
//         module: "Audit",
//         types: ["Self", "Direct", "Indirect", "Everyone"],
//       },
//     ],
//   },
// ];

// const groupByModule = (
//   children: PermissionChild[],
// ): Record<string, PermissionChild[]> => {
//   return children.reduce(
//     (acc, child) => {
//       acc[child.module] = acc[child.module] || [];
//       acc[child.module].push(child);
//       return acc;
//     },
//     {} as Record<string, PermissionChild[]>,
//   );
// };
