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
// import { handleError } from "@/lib/error";
// import { cn } from "@/lib/utils";
// import {
//   CreateQuestionRequest,
//   PostApiV1FormQuestionsApiArg,
// } from "@/redux/api/openapi.generated";
// import { restApi } from "@/redux/restApi";
// import { CreateQuestionValidator, QuestionRequestDto } from "./type";
// import TypesDropdown, { List } from "./type-dropdown";
// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const CreateQuestionTypes = ({ isOpen, onClose, setTriggerReload }: Props) => {
//   const [saveMutation, { isLoading }] =
//     restApi.useCreateFormQuestionsMutation();
//   const [loadQuestions] = restApi.useLazyGetFormQuestionsQuery();
//   const [selectFilter, setSelectFilter] = useState<List>(TypeLists[0]);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<QuestionRequestDto>({
//     resolver: CreateQuestionValidator,
//     defaultValues: {
//       label: "",
//       type: TypeLists[0].name,
//       // required: false,
//       options: [],
//     },
//   });
//   const typeWatch = watch("type");
//   useEffect(() => {
//     if (
//       typeWatch === QUESTION_TYPES.MULTIPLE_CHOICE ||
//       typeWatch === QUESTION_TYPES.CHECKBOXES ||
//       typeWatch === QUESTION_TYPES.DROPDOWN
//     ) {
//       setValue("options", [{ name: "Option 1" }]);
//     } else {
//       setValue("options", []);
//     }
//   }, [typeWatch, setValue]);
//   const onSubmit = async (data: QuestionRequestDto) => {
//     const createQuestionRequest = {
//       forms: [
//         {
//           label: data.label,
//           type: data.type,
//           // required: data.required,
//           options: data.options,
//         },
//       ],
//     } satisfies CreateQuestionRequest;
//     const payload = {
//       createQuestionRequest,
//       ...DEFAULT_API_PAYLOAD,
//     } satisfies PostApiV1FormQuestionsApiArg;
//     try {
//       await saveMutation(payload).unwrap();
//       toast.success("Question created successfully");
//       loadQuestions({ ...DEFAULT_API_PAYLOAD, page: 1, pageSize: 10 });
//       setTriggerReload(true);
//       reset({
//         label: "",
//         type: data.type, // Maintain the current type
//         options: [],
//       });
//       onClose();
//     } catch (error) {
//       // toast.error(isError)
//       handleError(error);
//     }
//   };
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-200 w-200">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <DialogHeader>
//             <DialogTitle>Create Question</DialogTitle>
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
//           {(selectFilter.name === QUESTION_TYPES.MULTIPLE_CHOICE ||
//             selectFilter.name === QUESTION_TYPES.CHECKBOXES ||
//             selectFilter.name === QUESTION_TYPES.DROPDOWN) && (
//             <div>
//               <ul className="space-y-2">
//                 {watch("options")?.map((_, idx) => (
//                   <li className="flex items-center gap-2" key={idx}>
//                     <div
//                       className={cn("h-6 w-6 border border-neutral-400", {
//                         "rounded-full":
//                           selectFilter.name === QUESTION_TYPES.MULTIPLE_CHOICE,
//                         "rounded-md":
//                           selectFilter.name === QUESTION_TYPES.CHECKBOXES ||
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
//                       "rounded-full": selectFilter.name === "Multiple Choice",
//                       "rounded-md": selectFilter.name === "Checkboxes",
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
//                 ) : (
//                   <Icon name="Plus" className="h-4 w-4" />
//                 )}
//                 <span>Create Question</span>
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
// export default CreateQuestionTypes;
import React from "react";

import { Dialog } from "@/components/ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setTriggerReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateQuestionTypes = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      index
    </Dialog>
  );
};

export default CreateQuestionTypes;
