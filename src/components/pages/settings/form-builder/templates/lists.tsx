// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { toast } from "sonner";
// import { ConfirmDeleteDialog, Icon } from "@/components/ui";
// import { commonActions } from "@/lib/redux/slice/common";
// import { useDispatch, useSelector } from "@/redux/store";
// import { FormTemplate } from "../types";
// import TemplateCard from "./card";
// import {
//   useDeleteApiV1FormByFormIdMutation,
//   useGetApiV1FormQuery,
//   useLazyGetApiV1FormQuery,
// } from "@/lib/redux/api/openapi.generated";
// const TemplateCards = () => {
//   const [state, setState] = useState<TResult<FormTemplate> | null>();
//   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
//   const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>();
//   const [isDeleted, setIsDeleted] = useState(false);
//   const [deleteMutation, { isLoading: isDeleting }] =
//     useDeleteApiV1FormByFormIdMutation();
//   // const [loadTemplates] = restApi.useLazyGetFormForTemplatesQuery();
//   const searchInput = useSelector((state) => state.common.searchInput);
//   const selectedFormType = useSelector((state) => state.common.formTypes);
//   const dispatch = useDispatch();
//   const [loadTemplates, { isLoading, isFetching }] = useLazyGetApiV1FormQuery();
//   const [loadTemplatesByFormType] =
//     restApi.useLazyGetFormForTemplatesByFormTypeQuery();
//   const [page, setPage] = useState(1);
//   useEffect(() => {
//     LoadData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, searchInput, selectedFormType]);
//   const LoadData = async () => {
//     let response;
//     if (selectedFormType) {
//       response = await loadTemplatesByFormType({
//         ...DEFAULT_API_PAYLOAD,
//         pageSize: 30,
//         page,
//         formTypes: selectedFormType,
//       }).unwrap();
//     } else {
//       response = await loadTemplates({
//         ...DEFAULT_API_PAYLOAD,
//         formTypeId: "",
//         pageSize: 30,
//         page,
//         searchQuery: searchInput,
//       }).unwrap();
//     }
//     const results = response?.result;
//     setState((prevState) => {
//       if (
//         !prevState ||
//         searchInput ||
//         selectedFormType ||
//         page === 1 ||
//         isDeleted
//       ) {
//         setIsDeleted(false);
//         return results; // Initial load
//       }
//       // Append new data to the existing state
//       return {
//         ...results,
//         data: [...(prevState?.data || []), ...results.data],
//       };
//     });
//   };
//   const handleRemoveType = (type: string) => {
//     const normalizedFormType = type.trim().toLowerCase();
//     if (!selectedFormType) {
//       return;
//     }
//     const typesArray = selectedFormType
//       .split(",")
//       .map((item) => item.trim().toLowerCase()); // Converts the string into an array of lowercase strings
//     // Filter out the removed type, checking for exact match
//     const updatedTypesArray = typesArray.filter(
//       (item) => item !== normalizedFormType,
//     );
//     // If the updated array is empty, return an empty string (no types selected)
//     if (updatedTypesArray.length === 0) {
//       dispatch(commonActions.updateFormTypes(""));
//       return;
//     }
//     // Join the array back into a string, ensuring no leading/trailing commas
//     const updatedTypes = updatedTypesArray.join(",");
//     // Dispatch the updated comma-separated string
//     dispatch(commonActions.updateFormTypes(updatedTypes));
//   };
//   const onDelete = async () => {
//     try {
//       await deleteMutation({
//         ...DEFAULT_API_PAYLOAD,
//         id: String(selectedTemplateId),
//       }).unwrap();
//       toast.success("Deleted Successfully");
//       LoadData();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="space-y-5">
//       {selectedFormType && (
//         <div className="flex items-center gap-5">
//           <p className="font-Medium text-sm font-bold">
//             All Results ({state?.data.length})
//           </p>
//           <p className="text-sm font-normal">Filtered by:</p>
//           {selectedFormType &&
//             selectedFormType.split(",").map((type: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 rounded-3xl border border-neutral-300 px-2 py-1 text-sm font-normal text-neutral-700"
//               >
//                 <span>{type}</span>
//                 <Icon
//                   className="h-4 w-4 cursor-pointer text-neutral-500"
//                   name="X"
//                   onClick={() => handleRemoveType(type)}
//                 />
//               </div>
//             ))}
//         </div>
//       )}
//       <div
//         id="scrollableDiv"
//         className="scrollbar-grey-red-600 scrollbar-track-grey-300 h-64 overflow-y-auto p-4 pb-20 scrollbar-thin"
//         style={{
//           height: "calc(100vh - 250px)",
//           overflow: "auto",
//         }}
//       >
//         <InfiniteScroll
//           className="h-full w-full pr-4"
//           scrollableTarget="scrollableDiv"
//           dataLength={state?.data?.length || 0}
//           next={() => {
//             setPage(page + 1);
//           }}
//           hasMore={(state?.data?.length || 0) < (state?.totalRecordCount || 0)}
//           loader={
//             isLoading || isFetching ? (
//               <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
//             ) : null
//           }
//           endMessage={<p>{!isLoading && !isFetching && ""}</p>}
//         >
//           {state?.data?.map((item, index) => (
//             <TemplateCard
//               key={index}
//               number={index + 1}
//               template={item}
//               onDelete={(id) => {
//                 setOpenDeleteModal(true);
//                 setSelectedTemplateId(id);
//               }}
//               isDeleting={selectedTemplateId === item.id && isDeleting}
//             />
//           ))}
//         </InfiniteScroll>
//       </div>
//       <ConfirmDeleteDialog
//         open={openDeleteModal}
//         onClose={() => setOpenDeleteModal(false)}
//         onConfirm={onDelete}
//       />
//     </div>
//   );
// };
// export default TemplateCards;
import React from "react";

const lists = () => {
  return <div>lists</div>;
};

export default lists;
