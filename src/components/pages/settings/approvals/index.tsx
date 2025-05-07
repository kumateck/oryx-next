"use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Button, Icon } from "@/components/ui";
// import { Option } from "@/lib";
// import {
//   useDeleteApiV1ApprovalByApprovalIdMutation,
//   useGetApiV1ApprovalQuery,
//   usePostApiV1ApprovalMutation,
//   usePutApiV1ApprovalByApprovalIdMutation,
// } from "@/lib/redux/api/openapi.generated";
// import ApprovalLists from "./lists";
// import {
//   ActionOrItemText,
//   ApprovalCardMode,
//   Approvals,
//   ApprovalsSchemaDTO,
// } from "./types";
// const ApprovalsPage = () => {
//   const { data: approvalsResponse, isLoading: isApprovalsQueryLoading } =
//     useGetApiV1ApprovalQuery({
//       pageSize: 100,
//       page: 1,
//     });
//   // restApi.useGetApprovalsQuery({
//   //   ...DEFAULT_API_PAYLOAD,
//   //   pageSize: 100,
//   //   page: 1,
//   // });
//   // const [reloadApprovals, { isLoading: isReloadApprovalsLoading }] =
//   //   restApi.useLazyGetApprovalsQuery();
//   const [createMutation, { isLoading: isCreateMutationLoading }] =
//     usePostApiV1ApprovalMutation();
//   const [updateMutation, { isLoading: isUpdateMutationLoading }] =
//     usePutApiV1ApprovalByApprovalIdMutation();
//   const [deleteMutation, { isLoading: isDeleteMutationLoading }] =
//     useDeleteApiV1ApprovalByApprovalIdMutation();
//   const loadedApprovals = approvalsResponse?.data;
//   const [approvalLists, setApprovalLists] = useState<Approvals[] | []>([]);
//   const [changesApplied, setChangesApplied] = useState(false);
//   useEffect(() => {
//     if (loadedApprovals && loadedApprovals.length > 0) {
//       if (changesApplied) {
//         toast.success("Changes applied successfully");
//         setChangesApplied(false);
//       }
//       const transformedApprovals = loadedApprovals?.map((approval) => {
//         return {
//           tags:
//             approval.tags?.map((tag) => {
//               return { label: tag.tagName as string, value: tag.id as string };
//             }) || [],
//           mode: ApprovalCardMode.VIEW,
//           id: approval.id!,
//           user: {
//             label: approval.user?.name as string,
//             value: approval.user?.id as string,
//           },
//           modelType: {
//             label: approval.modelType!,
//             value: approval.modelType!,
//           },
//           type: {
//             label: ActionOrItemText[approval.type!],
//             value: approval.type?.toString(),
//           },
//         };
//       }) as Approvals[];
//       setApprovalLists(transformedApprovals);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loadedApprovals]);
//   const { data: employees } = restApi.useGetEmployeesQuery({
//     ...DEFAULT_API_PAYLOAD,
//   });
//   const employeesOptions = employees?.result.data.map((employee) => ({
//     value: employee.id,
//     label: `${employee.firstName} ${employee.lastName}`,
//   })) as Option[];
//   const deleteHandler = async (id: string) => {
//     setChangesApplied(false);
//     try {
//       await deleteMutation({ approvalId: id }).unwrap();
//       toast.success("Deleted successfully");
//       // await reloadApprovals({
//       //   ...DEFAULT_API_PAYLOAD,
//       //   pageSize: 100,
//       //   page: 1,
//       // }).unwrap();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const onSubmit = async () => {
//     const validate = ApprovalsSchemaDTO.safeParse(approvalLists);
//     setChangesApplied(true);
//     if (validate.success) {
//       try {
//         const approvalPromises = approvalLists?.map(async (item) => {
//           const payload = {
//             userId: item.user.value,
//             type: Number(item.type.value) as ApprovalType,
//             modelType: item.modelType.value,
//             tagIds: item.tags.map((tag) => tag.value),
//           };
//           if (item.id) {
//             return updateMutation({
//               // updateApprovalRequest: payload,
//               // id: item.id,
//               approvalId: item.id,
//               createApprovalRequest: payload,
//             }).unwrap();
//           } else {
//             return createMutation({
//               createApprovalRequest: payload,
//             }).unwrap();
//           }
//         });
//         // Wait for all promises to resolve
//         await Promise.all(approvalPromises);
//         // await reloadApprovals({
//         //   ...DEFAULT_API_PAYLOAD,
//         //   pageSize: 100,
//         //   page: 1,
//         // }).unwrap();
//       } catch (error) {
//         // Handle errors if any promise rejects
//         toast.error("An error occurred while applying changes");
//       }
//     } else if ("error" in validate) {
//       const errors = validate.error.issues.map(({ message, path }) => ({
//         errorIndex: path[0] as number,
//         key: path[1] as string,
//         message,
//       }));
//       const arrayWithErrors = approvalLists.map((item, index) => {
//         const relevantErrors = errors.filter(
//           (error) => error.errorIndex === index,
//         );
//         const errorsObject = relevantErrors.reduce(
//           (acc, curr) => {
//             acc[curr.key] = curr.message;
//             return acc;
//           },
//           {} as { [key: string]: string },
//         );
//         return {
//           ...item,
//           errors: Object.keys(errorsObject).length ? errorsObject : undefined,
//         };
//       });
//       setApprovalLists(arrayWithErrors);
//     }
//   };
//   return (
//     <div className="w-full">
//       <div className="w-[924px] flex-col space-y-9 pr-32">
//         <div className="w-full space-y-2">
//           <div className="flex w-full items-center justify-between">
//             <span className="font-Medium text-2xl capitalize">Approvals</span>
//             <div className="flex items-center gap-4">
//               {changesApplied && (
//                 <Button
//                   className="font-Medium gap-1.5"
//                   size="sm"
//                   type="button"
//                   onClick={onSubmit}
//                 >
//                   {(isCreateMutationLoading || isUpdateMutationLoading) && (
//                     <Icon
//                       name="LoaderCircle"
//                       className="h-5 w-5 animate-spin"
//                     />
//                   )}
//                   <span>Apply Changes</span>
//                 </Button>
//               )}
//               <Button
//                 type="button"
//                 onClick={() => {
//                   setChangesApplied(true);
//                   const checkIfCreate = approvalLists.find(
//                     (item) => item.mode === ApprovalCardMode.CREATE,
//                   );
//                   if (checkIfCreate) {
//                     toast.warning(
//                       "Please save changes before creating new approval",
//                     );
//                     return;
//                   }
//                   setApprovalLists([
//                     {
//                       mode: ApprovalCardMode.CREATE,
//                       id: "",
//                       user: { label: "", value: "" },
//                       type: { label: "", value: "" },
//                       modelType: { label: "", value: "" },
//                       tags: [],
//                     },
//                     ...approvalLists,
//                   ]);
//                 }}
//                 className="font-Medium gap-1.5"
//                 size="sm"
//                 variant="secondary"
//               >
//                 <Icon name="Plus" className="h-5 w-5" />
//                 Create New Approval
//               </Button>
//             </div>
//           </div>
//           <div className="text-muted-foreground text-sm">
//             Select the user that can approve and close out tasks
//           </div>
//         </div>
//         {isReloadApprovalsLoading ||
//           (isApprovalsQueryLoading && (
//             <div className="flex h-full w-full items-center justify-center">
//               <Icon name="Loader" className="animate-spin" />
//             </div>
//           ))}
//         <ScrollablePageWrapper className="pb-60">
//           <ApprovalLists
//             employeesOptions={employeesOptions}
//             setApprovalLists={setApprovalLists}
//             approvalLists={approvalLists}
//             deleteHandler={deleteHandler}
//             isDeleteMutationLoading={isDeleteMutationLoading}
//             setChangesApplied={setChangesApplied}
//           />
//         </ScrollablePageWrapper>
//       </div>
//     </div>
//   );
// };
// export default ApprovalsPage;
import React from "react";

import { Button } from "@/components/ui";
import {
  useDeleteApiV1ApprovalByApprovalIdMutation,
  useGetApiV1ApprovalQuery,
} from "@/lib/redux/api/openapi.generated";

// import AddApproval from "./add-approval";
import ApprovalCard from "./card";
import Link from "next/link";
import ThrowErrorMessage from "@/lib/throw-error";
import { toast } from "sonner";

const Page = () => {
  const { data: responseDto } = useGetApiV1ApprovalQuery({
    pageSize: 30,
    page: 1,
  });

  const [deleteApproval, { isLoading: isDeleteMutationLoading }] =
    useDeleteApiV1ApprovalByApprovalIdMutation();
  const approvals = responseDto?.data || [];

  const deleteHandler = async (id: string) => {
    try {
      await deleteApproval({
        approvalId: id,
      });
      toast.success("Deleted successfully");
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };
  // const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold capitalize">Approvals</span>
        <Link href={"/settings/approvals/create"}>
          <Button>Create</Button>
        </Link>
      </div>
      {/* <AddApproval isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      <ul>
        {approvals.map((approval, idx) => (
          <li key={idx}>
            <ApprovalCard
              approval={approval}
              number={idx}
              isDeleteMutationLoading={isDeleteMutationLoading}
              deleteHandler={deleteHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
