// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { toast } from "sonner";
// import { ConfirmDeleteDialog, Icon } from "@/components/ui";
// import { DEFAULT_API_PAYLOAD } from "@/lib";
// import { handleError } from "@/lib/error";
// import { restApi } from "@/redux/restApi";
// import { commonActions } from "@/redux/slice/common";
// import { useDispatch, useSelector } from "@/redux/store";
// import { TResult } from "@/redux/types";
// import { Question } from "../types";
// import QuestionCard from "./card";
// import EditQuestionTypes from "./question-types/edit";
// import { QuestionRequestDto } from "./question-types/type";
// interface Props {
//   triggerReload: boolean;
//   setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const QuestionCards = ({ triggerReload, setTriggerReload }: Props) => {
//   const searchInput = useSelector((state) => state.common.searchInput);
//   const selectedQuestionType = useSelector(
//     (state) => state.common.questionType,
//   );
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [isOpenConfirm, setIsOpenConfirm] = useState(false);
//   const [details, setDetails] = useState<QuestionRequestDto>();
//   const [state, setState] = useState<TResult<Question> | null>(null); // Set initial state to null
//   const [loadQuestions, { isLoading, isFetching }] =
//     restApi.useLazyGetFormQuestionsQuery();
//   const [loadQuestionsByType] = restApi.useLazyGetFormQuestionsByTypeQuery();
//   const [deleteMutation, { isLoading: isDeleting }] =
//     restApi.useDeleteFormQuestionsMutation();
//   const [page, setPage] = useState(1);
//   const [isDeleted, setIsDeleted] = useState(false); // Track if an item is deleted
//   const [isLoadingFirst, setIsLoadingFirst] = useState(false); // Track if an item is deleted
//   // useEffect(() => {
//   //   LoadData();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [page]);
//   useEffect(() => {
//     LoadData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, selectedQuestionType, searchInput]); // Ensure relevant dependencies are included
//   // const LoadData = async () => {
//   //   if (page === 1) {
//   //     setIsLoadingFirst(true);
//   //   }
//   //   let response;
//   //   if (selectedQuestionType.length > 0) {
//   //     response = await loadQuestionsByType({
//   //       ...DEFAULT_API_PAYLOAD,
//   //       pageSize: 10,
//   //       page,
//   //       questionTypes: selectedQuestionType,
//   //     }).unwrap();
//   //   } else {
//   //     response = await loadQuestions({
//   //       ...DEFAULT_API_PAYLOAD,
//   //       pageSize: 10,
//   //       page,
//   //       searchQuery: searchInput,
//   //     }).unwrap();
//   //   }
//   //   const results = response?.result;
//   //   setState((prevState) => {
//   //     if (
//   //       page === 1 ||
//   //       searchInput ||
//   //       // selectedQuestionType.length > 0 ||
//   //       isDeleted
//   //     ) {
//   //       setIsDeleted(false);
//   //       return results;
//   //     }
//   //     return {
//   //       ...results,
//   //       data: [...(prevState?.data || []), ...results.data],
//   //     };
//   //   });
//   //   setIsLoadingFirst(false);
//   // };
//   const LoadData = async (pageToLoad = page) => {
//     if (pageToLoad === 1) {
//       setIsLoadingFirst(true);
//     }
//     let response;
//     if (selectedQuestionType.length > 0) {
//       response = await loadQuestionsByType({
//         ...DEFAULT_API_PAYLOAD,
//         pageSize: 30,
//         page: pageToLoad,
//         questionTypes: selectedQuestionType,
//       }).unwrap();
//     } else {
//       response = await loadQuestions({
//         ...DEFAULT_API_PAYLOAD,
//         pageSize: 30,
//         page: pageToLoad,
//         searchQuery: searchInput,
//       }).unwrap();
//     }
//     const results = response?.result;
//     setState((prevState) => {
//       if (pageToLoad === 1 || searchInput || isDeleted) {
//         setIsDeleted(false);
//         return results;
//       }
//       return {
//         ...results,
//         data: [...(prevState?.data || []), ...results.data],
//       };
//     });
//     setIsLoadingFirst(false);
//   };
//   const onEdit = (details: Question) => {
//     const payload = {
//       id: details.id,
//       label: details.label,
//       type: details.type.name,
//       options:
//         details?.questionOptions?.map((item) => ({ name: item.name })) || [],
//     } satisfies QuestionRequestDto;
//     setDetails(payload);
//     setIsOpen(true);
//   };
//   const onDelete = async () => {
//     try {
//       await deleteMutation({
//         ...DEFAULT_API_PAYLOAD,
//         id: selectedId as string,
//       }).unwrap();
//       toast.success("Deleted Successfully");
//       // setPage(1); // Reset page
//       // setState(null); // Clear existing data
//       // setIsDeleted(true); // Mark as deleted to reset state in LoadData
//       // LoadData();
//       handleRecallLoad();
//     } catch (error) {
//       handleError(error);
//     }
//   };
//   useEffect(() => {
//     if (triggerReload) {
//       handleRecallLoad();
//       setTriggerReload(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [triggerReload]);
//   const handleRecallLoad = () => {
//     setIsDeleted(true); // Activate the isDeleted flag
//     setPage(1); // Reset page to first
//     setState(null); // Clear existing data
//     LoadData(); // Call LoadData to reload
//   };
//   // this converts the input string to snake_case and maintains
//   // the original case if input is not a snake_case string
//   function convertToSnakeCase(input: string): string {
//     if (!input) return "";
//     if (input.includes("_") && input === input.toLowerCase()) {
//       return input;
//     }
//     return input
//       .trim()
//       .split(/[\s]+/)
//       .map((word) => word.toLowerCase())
//       .join("_");
//   }
//   function convertInput(input: string) {
//     return input
//       .split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   }
//   const type = convertInput(selectedQuestionType);
//   const handleRemoveType = (questionType: string) => {
//     const type = convertToSnakeCase(questionType);
//     const normalizedQuestionType = type.trim().toLowerCase();
//     if (!selectedQuestionType) {
//       return;
//     }
//     const typesArray = selectedQuestionType
//       .split(",")
//       .map((item) => item.trim().toLowerCase()); // Converts the string into an array of lowercase strings
//     // Filter out the removed type, checking for exact match
//     const updatedTypesArray = typesArray.filter(
//       (item) => item !== normalizedQuestionType,
//     );
//     // If the updated array is empty, return an empty string (no types selected)
//     if (updatedTypesArray.length === 0) {
//       dispatch(commonActions.updateQuestionTypes(""));
//       return;
//     }
//     // Join the array back into a string, ensuring no leading/trailing commas
//     const updatedTypes = updatedTypesArray.join(",");
//     // Dispatch the updated comma-separated string
//     dispatch(commonActions.updateQuestionTypes(updatedTypes));
//   };
//   return (
//     <div className="space-y-5 pb-20">
//       {type.length > 0 && (
//         <div className="flex items-center gap-5">
//           <p className="font-Medium text-sm font-bold">
//             All Results ({state?.data.length})
//           </p>
//           <p className="text-sm font-normal">Filtered by:</p>
//           {type &&
//             type.split(",").map((questionType: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 rounded-3xl border border-neutral-300 px-2 py-1 text-sm font-normal text-neutral-700"
//               >
//                 <span>{convertInput(questionType)}</span>
//                 <Icon
//                   className="h-4 w-4 cursor-pointer text-neutral-500"
//                   name="X"
//                   onClick={() => handleRemoveType(questionType)}
//                 />
//               </div>
//             ))}
//         </div>
//       )}
//       {isLoadingFirst && (
//         <div className="flex h-full w-full items-center justify-center">
//           <Icon name="LoaderCircle" className="h-8 w-8 animate-spin" />
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
//           // hasMore={(state?.data?.length || 0) < (state?.totalRecordCount || 0)}
//           hasMore={Boolean(
//             (state?.data?.length || 0) < (state?.totalRecordCount || 0),
//           )}
//           loader={
//             isLoading || isFetching ? (
//               <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
//             ) : null
//           }
//           endMessage={<p>{!isLoading && !isFetching && ""}</p>}
//         >
//           {state?.data?.map((item, index) => (
//             <QuestionCard
//               key={index}
//               number={index + 1}
//               question={item}
//               onEdit={onEdit}
//               isDeleting={selectedId === item.id && isDeleting}
//               onDelete={(id) => {
//                 setIsOpenConfirm(true);
//                 setSelectedId(id);
//               }}
//             />
//           ))}
//         </InfiniteScroll>
//       </div>
//       {isOpen && details && (
//         <EditQuestionTypes
//           details={details}
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           LoadData={handleRecallLoad}
//         />
//       )}
//       <ConfirmDeleteDialog
//         open={isOpenConfirm}
//         onClose={() => setIsOpenConfirm(false)}
//         onConfirm={onDelete}
//       />
//     </div>
//   );
// };
// export default QuestionCards;
import React from "react";

// interface Props {
//   triggerReload: boolean;
//   setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
// }
const QuestionCards = () => {
  return <div>Card</div>;
};

export default QuestionCards;
