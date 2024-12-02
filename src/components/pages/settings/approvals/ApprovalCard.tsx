// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { FormWizard } from "~/components/form-inputs";
// import { Button, Icon } from "~/components/ui";
// import { DEFAULT_API_PAYLOAD, InputTypes } from "~/lib/constants";
// import { ApprovalDto } from "~/redux/api/openapi.generated";
// import { restApi } from "~/redux/restApi";

// import {
//   ActionOrItemText,
//   ApprovalCardMode,
//   ApprovalFormValidator,
//   ApprovalItemTypes,
//   TApprovalForm,
// } from "./types";

// type Props = {
//   approval: ApprovalDto;
//   mode: ApprovalCardMode;
//   setMode?: (mode: ApprovalCardMode) => void;
// };
// export function ApprovalCard(props: Props) {
//   const [getEmployees, { data: employees }] =
//     restApi.useLazyGetEmployeesQuery();

//   const [getScreens, { data: screens }] = restApi.useLazyGetScreensQuery();

//   useEffect(() => {
//     getEmployees?.({
//       ...DEFAULT_API_PAYLOAD,
//     });
//     getScreens?.({
//       ...DEFAULT_API_PAYLOAD,
//     });
//   }, [getEmployees, getScreens]);

//   const { register: viewOnlyRegister } = useForm({
//     defaultValues: {
//       user: props.approval.user?.name,
//       itemType: props.approval.modelType,
//       actionOrItem: ActionOrItemText[props.approval.type!],
//     },
//   });
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TApprovalForm>({
//     resolver: ApprovalFormValidator,
//     mode: "onSubmit",
//     defaultValues: {
//       user: props.approval.user
//         ? {
//             label: props.approval.user.name || "",
//             value: props.approval.user.id || "",
//           }
//         : undefined,
//     },
//   });

//   const onSubmit = () => {};

//   return (
//     <div className="space-y-5 rounded-lg bg-white px-7 py-6">
//       <div className="flex w-full items-start">
//         {props.mode === ApprovalCardMode.VIEW ? (
//           <>
//             <FormWizard
//               className="grid w-full grid-cols-3 gap-6 space-y-0"
//               fieldWrapperClassName="flex-grow"
//               wizardWrapperClassName="flex justify-end items-end"
//               config={[
//                 {
//                   register: { ...viewOnlyRegister("user") },
//                   type: InputTypes.TEXT,
//                   label: "User",
//                   placeholder: "User",
//                   errors: {
//                     error: false,
//                     message: undefined,
//                   },
//                   readOnly: true,
//                 },
//                 {
//                   register: { ...viewOnlyRegister("itemType") },
//                   type: InputTypes.TEXT,
//                   label: "Item type",
//                   placeholder: "Item type",
//                   errors: {
//                     error: false,
//                     message: undefined,
//                   },
//                   readOnly: true,
//                 },
//                 {
//                   register: { ...viewOnlyRegister("actionOrItem") },
//                   type: InputTypes.TEXT,
//                   label: "Action/ Item",
//                   placeholder: "Action/ Item",
//                   errors: {
//                     error: false,
//                     message: undefined,
//                   },
//                   readOnly: true,
//                 },
//               ]}
//               suffix={() => {
//                 return (
//                   <Button
//                     type="button"
//                     onClick={() => props.setMode?.(ApprovalCardMode.EDIT)}
//                     className="ml-6 h-fit max-w-fit rounded-full bg-secondary-300 p-3"
//                     variant="secondary"
//                   >
//                     <Icon name="Pencil" className="h-5 w-5" />
//                   </Button>
//                 );
//               }}
//             />
//           </>
//         ) : (
//           <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
//             <FormWizard
//               className="grid w-full grid-cols-3 gap-6 space-y-0"
//               fieldWrapperClassName="flex-grow"
//               wizardWrapperClassName="flex justify-end items-end"
//               config={[
//                 {
//                   type: InputTypes.SEARCHABLE_SELECT,
//                   label: "User",
//                   placeholder: "User",
//                   errors: {
//                     message: errors.user?.message,
//                     error: !!errors.user,
//                   },
//                   control,
//                   name: "user",
//                   options: employees
//                     ? employees?.result.data.map((employee) => ({
//                         label: `${employee.firstName} ${employee.lastName}`,
//                         value: employee.id,
//                       }))
//                     : [],
//                   searchPlaceholder: "Search Users",
//                   prefix: (
//                     <Icon
//                       name="UserRound"
//                       className="text-muted-foreground"
//                       size={20}
//                     />
//                   ),

//                   className: "min-w-fit",
//                 },
//                 {
//                   type: InputTypes.SELECT,
//                   label: "Item Type",
//                   placeholder: "Select Item Type",
//                   errors: {
//                     message: errors.itemType?.message,
//                     error: !!errors.itemType,
//                   },
//                   name: "itemType",
//                   control,
//                   options: screens
//                     ? screens?.result.map((screen) => ({
//                         label: screen
//                           .split("-")
//                           .join(" ")
//                           .split(" ")
//                           .map(
//                             (word) =>
//                               word.charAt(0).toUpperCase() + word.slice(1),
//                           )
//                           .join(" "),
//                         value: screen,
//                       }))
//                     : [],
//                 },
//                 {
//                   type: InputTypes.SELECT,
//                   label: "Action/ Item",
//                   placeholder: "Select Action/ Item",
//                   errors: {
//                     message: errors.actionOrItem?.message,
//                     error: !!errors.actionOrItem,
//                   },
//                   name: "actionOrItem",
//                   control,
//                   options: ApprovalItemTypes,
//                 },
//               ]}
//               suffix={() => {
//                 return (
//                   <Button
//                     type="button"
//                     onClick={() => props.setMode?.(ApprovalCardMode.EDIT)}
//                     className="ml-6 h-fit max-w-fit rounded-full bg-destructive-100 p-3"
//                     variant="secondary"
//                   >
//                     <Icon
//                       name="Trash2"
//                       className="h-5 w-5 text-destructive-500"
//                     />
//                   </Button>
//                 );
//               }}
//             />
//           </form>
//         )}
//       </div>
//       <div className="space-y-4 font-Medium">
//         <div className="flex w-fit items-center justify-center gap-1 text-sm">
//           <Icon name="Tag" size={16} />
//           <span className="">Tags</span>
//         </div>
//         <div className="flex w-fit items-center justify-center gap-1 text-sm">
//           {props.approval.tags?.map((tag) => (
//             <span
//               key={tag.id}
//               className="rounded-3xl border border-neutral-300 bg-white px-2.5 py-0.5 text-sm text-neutral-700"
//             >
//               {tag.tagName}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
