import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Button, Icon } from "@/components/ui";
import { InputTypes } from "@/lib";
import { QuestionDto } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepWrapper from "@/shared/wrapper";

import DragLists from "../lists";
// import { cn, getListsForOptions } from "@/lib/utils";
import AddQuestions from "./add-questions";
import { CreateTemplateValidator, TemplateRequestDto } from "./type";

const EditTemplate = () => {
  const { id } = useParams();
  console.log(id);
  const router = useRouter();
  const [isAddQuestionsOpen, setIsAddQuestionsOpen] = useState(false);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [highlightedQuestion, setHighlightedQuestion] = useState<QuestionDto>();

  // const { data: singleResponse } = restApi.useGetFormForTemplatesByIdQuery({
  //   ...DEFAULT_API_PAYLOAD,
  //   id: id as string,
  // });
  // console.log(id, "id", singleResponse);

  // const [updateMutation, { isLoading: updateLoading }] =
  //   useupdateApiV1FormByIdMutation();
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm<TemplateRequestDto>({
    resolver: CreateTemplateValidator,
    mode: "onSubmit",
  });

  // useEffect(() => {
  //   if (singleResponse?.result) {
  //     const template = singleResponse?.result;

  //     setValue("formTypeId", {
  //       value: template.formType.id,
  //       label: template.formType.name,
  //     });

  //     setValue("name", template.name);
  //     const section = template.sections[0];
  //     const formFields = section.formFields;

  //     const questions: QuestionsProps[] = formFields.map((item) => ({
  //       questionId: item.question.id,
  //       required: item.required,
  //       name: item.question.label,
  //       type: item.question.type.name as string,
  //       options: item.question.questionOptions?.map((opt) => ({
  //         name: opt.name,
  //       })) as { name: string }[],
  //     }));
  //     setQuestions(questions);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [singleResponse?.result]);

  // const { data: collectionResponse } = restApi.useGetCollectionsQuery({
  //   ...DEFAULT_API_PAYLOAD,
  //   getCollectionRequest: {
  //     screen: SCREENS.INCIDENT,
  //     types: [COLLECTION_TYPES.FormType],
  //   },
  // });

  // const collections = collectionResponse?.result;
  // const templateTypeOptions = getListsForOptions(
  //   collections?.[lowerFirst(COLLECTION_TYPES.FormType)] as CollectionItemDto[],
  // );

  // Function to handle the drag and drop event

  const onSubmit = async (data: TemplateRequestDto) => {
    console.log(data);
    // if (questions.length === 0) {
    //   toast.warning("Please add at least one question");
    //   return;
    // }
    // const payload = {
    //   ...DEFAULT_API_PAYLOAD,
    //   id: id as string,
    //   createFormRequest: {
    //     formTypeId: data.formTypeId.value,
    //     name: data.name,
    //     sections: [
    //       {
    //         formFields: questions?.map((item) => ({
    //           questionId: item.questionId,
    //           required: item.required,
    //         })),
    //       },
    //     ],
    //   },
    // } satisfies PutApiV1FormByIdApiArg;
    // try {
    //   await updateMutation(payload).unwrap();
    //   toast.success("Template updated successfully");
    //   router.back();
    // } catch (error) {
    //   console.log(error);
    //   toast.error(isErrorResponse(error as ErrorResponse)?.description);
    //   // handleError(error);
    // }
  };

  const onDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((item) => item.id !== questionId));
  };

  return (
    <div className="w-full space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name="ArrowLeft"
              className="h-5 w-5 text-black hover:cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <span className="font-Medium text-primary-500 text-xl">
              Edit Template
            </span>
          </div>
          <Button
            type="submit"
            variant="default"
            size="default"
            className="flex h-9 items-center gap-2"
          >
            {/* {updateLoading && (
              <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
            )} */}
            <span>Save Changes</span>
          </Button>
        </div>

        {isAddQuestionsOpen && (
          <AddQuestions
            setQuestions={setQuestions}
            questions={questions}
            isOpen={isAddQuestionsOpen}
            onClose={() => setIsAddQuestionsOpen(false)}
          />
        )}

        <ScrollablePageWrapper className="space-y-5 pb-60">
          <StepWrapper className="w-full">
            <FormWizard
              className="grid w-full grid-cols-2 gap-10 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  register: register("name"),
                  label: "Title",
                  placeholder: "Enter Title",
                  type: InputTypes.TEXT,
                  errors,
                },
                // {
                //   label: "Template Type",
                //   control,
                //   type: InputTypes.SELECT,
                //   name: "formTypeId",
                //   required: true,
                //   placeholder: "Template Type",
                //   options: templateTypeOptions,
                //   errors: {
                //     message: errors.formTypeId?.message,
                //     error: !!errors.formTypeId,
                //   },
                // },
              ]}
            />
          </StepWrapper>

          <StepWrapper className="w-full">
            <div
              className="flex w-full rounded-2xl bg-neutral-100 px-4 py-3 hover:cursor-pointer"
              onClick={() => setIsAddQuestionsOpen(true)}
            >
              <Icon name="Plus" className="text-primary-500 h-5 w-5" />
              <span className="font-Medium text-primary-500 text-base">
                Add Question
              </span>
            </div>
            <DragLists
              questions={questions}
              highlightedQuestion={highlightedQuestion}
              setHighlightedQuestion={setHighlightedQuestion}
              onDeleteQuestion={onDeleteQuestion}
            />
            {/* Draggable Questions List */}
            {/* <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="questions-list">
                {(provided) => (
                  <ul
                    className="space-y-3 py-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {questions?.map((question, index) => (
                      <Draggable
                        key={question.questionId}
                        draggableId={question.questionId}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={cn(
                                "relative w-full rounded-2xl border bg-white p-8",
                                {
                                  "border-secondary-500 shadow-sm shadow-secondary-500":
                                    highlightedQuestion?.questionId ===
                                    question.questionId,
                                },
                              )}
                              onClick={() => setHighlightedQuestion(question)}
                            >
                              {highlightedQuestion?.questionId ===
                                question.questionId && (
                                <div className="absolute left-1/2 top-0 translate-x-1 translate-y-1/2 transform">
                                  <Icon
                                    name="GripHorizontal"
                                    className="h-6 w-8 text-neutral-300"
                                  />
                                </div>
                              )}
                              <div className="flex items-center justify-between gap-6">
                                <div className="w-full space-y-1">
                                  <span className="block font-Medium text-sm text-neutral-900">
                                    {question?.name}
                                  </span>

                                  {QUESTION_TYPES.SHORT_ANSWER ===
                                    question.type && (
                                    <div className="rounded-2xl border px-3 py-2.5">
                                      <span className="text-sm text-neutral-400">
                                        Short Answer
                                      </span>
                                    </div>
                                  )}

                                  {QUESTION_TYPES.PARAGRAPH ===
                                    question.type && (
                                    <div className="h-28 rounded-2xl border px-3 py-2.5">
                                      <span className="text-sm text-neutral-400">
                                        Paragraph
                                      </span>
                                    </div>
                                  )}
                                  {(question.type ===
                                    QUESTION_TYPES.MULTIPLE_CHOICE ||
                                    question.type ===
                                      QUESTION_TYPES.CHECKBOXES) && (
                                    <ul className="space-y-2">
                                      {question?.options?.map((option, idx) => (
                                        <li
                                          className="flex items-center gap-2"
                                          key={idx}
                                        >
                                          <div
                                            className={cn(
                                              "h-6 w-6 border border-neutral-400",
                                              {
                                                "rounded-full":
                                                  question.type ===
                                                  QUESTION_TYPES.MULTIPLE_CHOICE,
                                                "rounded-2xl":
                                                  question.type ===
                                                  QUESTION_TYPES.CHECKBOXES,
                                              },
                                            )}
                                          />
                                          <span className="text-sm text-black">
                                            {option.name}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {QUESTION_TYPES.DROPDOWN ===
                                    question.type && (
                                    <div className="flex w-full max-w-md items-center justify-between rounded-2xl border px-3 py-2.5">
                                      <span className="text-sm text-neutral-400">
                                        Select One
                                      </span>
                                      <Icon
                                        name="ChevronDown"
                                        className="h-5 w-5 text-neutral-500"
                                      />
                                    </div>
                                  )}
                                  {QUESTION_TYPES.DATE === question.type && (
                                    <div className="flex w-full max-w-md items-center justify-between rounded-2xl border px-3 py-2.5">
                                      <span className="text-sm text-neutral-400">
                                        DD/MM/YY
                                      </span>
                                      <Icon
                                        name="Calendar"
                                        className="h-5 w-5 text-neutral-500"
                                      />
                                    </div>
                                  )}
                                  {QUESTION_TYPES.TIME === question.type && (
                                    <div className="flex w-full max-w-md items-center justify-between rounded-2xl border px-3 py-2.5">
                                      <span className="text-sm text-neutral-400">
                                        12:00
                                      </span>
                                      <Icon
                                        name="Clock"
                                        className="h-5 w-5 text-neutral-500"
                                      />
                                    </div>
                                  )}

                                  {QUESTION_TYPES.FILE_UPLOAD ===
                                    question.type && (
                                    <div className="flex w-full flex-col items-center rounded-2xl border border-dashed border-neutral-400 p-4">
                                      <div className="w-full max-w-md text-center">
                                        <input
                                          type="file"
                                          id="fileUpload"
                                          className="hidden"
                                          multiple
                                          disabled
                                        />
                                        <label
                                          htmlFor="fileUpload"
                                          className="inline-flex cursor-pointer flex-col items-center justify-center rounded-2xl px-4 py-2"
                                        >
                                          <IoImageOutline
                                            size={30}
                                            className="text-neutral-900"
                                          />
                                          <span className="text-base">
                                            <b className="text-info-500">
                                              Upload a file
                                            </b>{" "}
                                            or drag and drop
                                          </span>
                                        </label>
                                        <p className="text-sm text-neutral-400">
                                          PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX,
                                          XLSX up to 5MB
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {highlightedQuestion?.questionId ===
                                  question.questionId && (
                                  <Icon
                                    name="Trash2"
                                    className="h-5 w-5 text-neutral-400"
                                    onClick={() =>
                                      onDeleteQuestion(question.questionId)
                                    }
                                  />
                                )}
                              </div>
                              {highlightedQuestion?.questionId ===
                                question.questionId && (
                                <div className="pt-5">
                                  <Switch
                                    className="h-4 w-7"
                                    thumbClassName="h-3 w-3 data-[state=checked]:translate-x-3"
                                    checked={question.required}
                                    onCheckedChange={(e) =>
                                      setQuestions((prevState) =>
                                        prevState.map((item) =>
                                          item.questionId ===
                                          question.questionId
                                            ? { ...item, required: e }
                                            : item,
                                        ),
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext> */}
          </StepWrapper>
        </ScrollablePageWrapper>
      </form>
    </div>
  );
};

export default EditTemplate;
