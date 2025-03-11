// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { FormError, FormTextInput } from "@/components/form-inputs";
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   Icon,
//   IconProps,
//   Input,
// } from "@/components/ui";
// import { DEFAULT_API_PAYLOAD, QUESTION_TYPES } from "@/lib";
// import { cn } from "@/lib/utils";
// import {
//   PutApiV1FormQuestionsByIdApiArg,
//   UpdateQuestionRequest,
// } from "@/redux/api/openapi.generated";
// import { restApi } from "@/redux/restApi";
// import { CreateQuestionValidator, QuestionRequestDto } from "./type";
// import TypesDropdown, { List } from "./type-dropdown";
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   details: QuestionRequestDto;
//   LoadData: () => void;
// }
// const EditQuestionTypes = ({ isOpen, onClose, details, LoadData }: Props) => {
//   const [saveMutation, { isLoading }] =
//     restApi.useUpdateFormQuestionsMutation();
//   const [selectFilter, setSelectFilter] = useState<List>(
//     TypeLists.find((item) => item.name === details?.type) as List,
//   );
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<QuestionRequestDto>({
//     resolver: CreateQuestionValidator,
//     defaultValues: {
//       label: details.label,
//       type: details.type,
//       // required: details?.required,
//       options: details?.options || [],
//     },
//   });
//   const typeWatch = watch("type");
//   useEffect(() => {
//     if (
//       typeWatch === QUESTION_TYPES.MULTIPLE_CHOICE ||
//       typeWatch === QUESTION_TYPES.CHECKBOXES ||
//       typeWatch === QUESTION_TYPES.DROPDOWN
//     ) {
//       // If the user has selected multiple_choice or checkboxes, check for existing options.
//       if ((details?.options?.length ?? 0) > 0) {
//         setValue("options", details.options);
//       } else {
//         setValue("options", [{ name: "Option 1" }]);
//       }
//     } else {
//       // If the user selects another type, clear the options.
//       setValue("options", []);
//     }
//   }, [typeWatch, setValue, details.options]);
//   const onSubmit = async (data: QuestionRequestDto) => {
//     const updateQuestionRequest = {
//       label: data.label,
//       type: data.type,
//       options: data.options,
//     } satisfies UpdateQuestionRequest;
//     const payload = {
//       updateQuestionRequest,
//       id: details?.id as string,
//       ...DEFAULT_API_PAYLOAD,
//     } satisfies PutApiV1FormQuestionsByIdApiArg;
//     try {
//       await saveMutation(payload).unwrap();
//       toast.success("Question updated successfully");
//       // loadQuestions({ ...DEFAULT_API_PAYLOAD, page: 1, pageSize: 10 });
//       LoadData();
//       onClose();
//     } catch (error) {
//       // toast.error(isError)
//       console.log(error);
//     }
//   };
//   const watchedOptions = watch("options"); //? watch("options") : details?.options;
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-200 w-200">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <DialogHeader>
//             <DialogTitle>Edit Question</DialogTitle>
//           </DialogHeader>
//           <div className="flex w-full items-center gap-4">
//             <div className="w-full">
//               <FormTextInput
//                 label=""
//                 placeholder="Enter your question"
//                 className="w-full rounded-none border-0 border-b border-b-neutral-400"
//                 register={register("label")}
//                 errors={{
//                   error: !!errors.label,
//                   message: errors.label?.message,
//                 }}
//               />
//             </div>
//             <TypesDropdown
//               active={selectFilter}
//               lists={TypeLists}
//               onSelect={(set) => {
//                 setSelectFilter(set);
//                 setValue("type", set.name);
//               }}
//             >
//               <div className="flex justify-between gap-6 whitespace-nowrap rounded-3xl border border-neutral-300 px-3 py-2.5">
//                 <div className="flex w-full items-center gap-2">
//                   {selectFilter?.icon && (
//                     <Icon
//                       name={selectFilter?.icon}
//                       className="h-5 w-5 text-neutral-500"
//                     />
//                   )}
//                   <span className="text-sm text-neutral-400">
//                     {selectFilter?.title}
//                   </span>
//                 </div>
//                 <Icon name="ChevronDown" className="h-5 w-5 text-neutral-500" />
//               </div>
//             </TypesDropdown>
//           </div>
//           {/* Options for Multiple Choice or Checkboxes */}
//           {(selectFilter?.name === QUESTION_TYPES.MULTIPLE_CHOICE ||
//             selectFilter?.name === QUESTION_TYPES.CHECKBOXES ||
//             selectFilter.name === QUESTION_TYPES.DROPDOWN) && (
//             <div>
//               <ul className="space-y-2">
//                 {watchedOptions?.map((_, idx) => (
//                   <li className="flex items-center gap-2" key={idx}>
//                     <div
//                       className={cn("h-6 w-6 border border-neutral-400", {
//                         "rounded-full":
//                           selectFilter?.name === QUESTION_TYPES.MULTIPLE_CHOICE,
//                         "rounded-md":
//                           selectFilter?.name === QUESTION_TYPES.CHECKBOXES ||
//                           selectFilter.name === QUESTION_TYPES.DROPDOWN,
//                       })}
//                     />
//                     <Input
//                       suffix="X"
//                       suffixClass="h-5 w-5 text-neutral-500"
//                       onSuffixClick={() => {
//                         const currentOptions = watch("options") || [];
//                         if (currentOptions.length > 1) {
//                           const updatedOptions = currentOptions.filter(
//                             (_, optionIdx) => optionIdx !== idx,
//                           );
//                           setValue("options", updatedOptions);
//                         }
//                       }}
//                       className="w-full rounded-none border-0 focus:border-b focus:border-b-neutral-400"
//                       {...register(`options.${idx}.name` as const)}
//                       placeholder={`Option ${idx + 1}`}
//                     />
//                     {errors.options?.[idx]?.name && (
//                       <FormError
//                         error={!!errors.options[idx]?.name}
//                         message={errors.options[idx]?.name?.message}
//                       />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//               {(typeWatch === QUESTION_TYPES.CHECKBOXES ||
//                 typeWatch === QUESTION_TYPES.MULTIPLE_CHOICE ||
//                 typeWatch === QUESTION_TYPES.DROPDOWN) && (
//                 <button
//                   className="flex cursor-pointer items-center gap-1 pt-4"
//                   type="button"
//                   onClick={() =>
//                     setValue("options", [
//                       ...(watch("options") || []),
//                       { name: `Option ${(watch("options")?.length ?? 0) + 1}` },
//                     ])
//                   }
//                 >
//                   <div
//                     className={cn("h-6 w-6 border border-neutral-400", {
//                       "rounded-full":
//                         selectFilter?.name === QUESTION_TYPES.MULTIPLE_CHOICE,
//                       "rounded-md":
//                         selectFilter?.name === QUESTION_TYPES.CHECKBOXES ||
//                         selectFilter.name === QUESTION_TYPES.DROPDOWN,
//                     })}
//                   />
//                   <Icon name="Plus" className="h-5 w-5 text-neutral-500" />
//                   <span className="text-sm">Add Option</span>
//                 </button>
//               )}
//             </div>
//           )}
//           <DialogFooter className="items-center justify-between gap-4 pt-2">
//             <div className="flex w-full items-center gap-2">
//               {/* <Label>Required</Label>
//               <Controller
//                 name="required"
//                 control={control}
//                 render={({ field }) => (
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 )}
//               /> */}
//             </div>
//             <div className="flex w-full items-center justify-end gap-4">
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant={"default"}
//                 className="flex items-center gap-2"
//               >
//                 {isLoading ? (
//                   <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
//                 ) : null}
//                 <span>Save Question</span>
//               </Button>
//             </div>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
// interface TypeProps {
//   name: string;
//   icon: IconProps["name"];
//   title: string;
// }
// const TypeLists: TypeProps[] = [
//   {
//     title: "Short Answer",
//     icon: "Equal",
//     name: QUESTION_TYPES.SHORT_ANSWER,
//   },
//   {
//     name: QUESTION_TYPES.PARAGRAPH,
//     icon: "AlignJustify",
//     title: "Paragraph",
//   },
//   {
//     title: "Multiple Choice",
//     icon: "CircleStop",
//     name: QUESTION_TYPES.MULTIPLE_CHOICE,
//   },
//   {
//     title: "Checkboxes",
//     icon: "CircleCheck",
//     name: QUESTION_TYPES.CHECKBOXES,
//   },
//   {
//     title: "Dropdown",
//     name: QUESTION_TYPES.DROPDOWN,
//     icon: "AlignRight",
//   },
//   {
//     title: "File Upload",
//     icon: "Upload",
//     name: QUESTION_TYPES.FILE_UPLOAD,
//   },
//   {
//     title: "Date",
//     icon: "Calendar",
//     name: QUESTION_TYPES.DATE,
//   },
//   {
//     title: "Time",
//     icon: "Clock",
//     name: QUESTION_TYPES.TIME,
//   },
//   {
//     title: "Signature",
//     icon: "Fingerprint",
//     name: QUESTION_TYPES.SIGNATURE,
//   },
// ];
// export default EditQuestionTypes;
import React from "react";

const edit = () => {
  return <div>edit</div>;
};

export default edit;
