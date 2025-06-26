import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { FormWizard } from "@/components/form-inputs";

import { Button, Icon } from "@/components/ui";

import { fileToBase64 } from "@/lib/utils";

import { FormResponseResponse } from "../../../inspections/types";

import { FormField, FormValues, buildSchema } from "./type";
import { useParams, useRouter } from "next/navigation";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { QuestionType } from "@/lib";

type FormResponse = {
  formFieldId: string;
  value: string | string[] | { [key: string]: any };
};
const CompleteDesktop = () => {
  const [saveCompleteAudit, { isLoading }] =
    restApi.useCreateAuditCompleteMutation();
  const router = useRouter();
  const { id } = useParams();

  const { data: formTemplateForResponse } = restApi.useGetAuditByIdQuery({
    id: id as string,
  });
  const sections = formTemplateForResponse?.result.type?.sections;
  const questions = sections?.[0] && sections?.[0]?.formFields;
  const typeId = formTemplateForResponse?.result.type?.id;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(questions as FormField[])),
    mode: "all",
    // defaultValues: {},
  });

  const onSubmit = async (data: FormValues) => {
    const formResponse: FormResponse[] = Object.entries(data).map(
      ([key, value]) => ({
        formFieldId: key,
        value:
          typeof value === "object" && value !== null && "value" in value
            ? value.value
            : value,
      }),
    );

    const formData = await Promise.all(
      formResponse.map(async (response) => {
        let value: string | { [key: string]: any } = "";
        if (response?.value instanceof FileList) {
          if (response?.value.length > 0) {
            const images = [];
            const files = response?.value || [];
            for (const file of files) {
              images.push(await fileToBase64(file));
            }
            value = images.join("|");
          }
        } else {
          value = Array.isArray(response.value)
            ? response.value?.join(",")
            : response?.value;
        }
        return {
          formFieldId: response.formFieldId,
          value,
        };
      }),
    );

    const payload = {
      auditId: id as string,
      formId: typeId,
      formResponse: formData as unknown as FormResponseResponse[],
    } as CompleteAuditRequest;

    try {
      await saveCompleteAudit({
        ...DEFAULT_API_PAYLOAD,
        completeAuditRequest: payload,
      } satisfies PostApiV1AuditCompleteApiArg).unwrap();
      toast.success("Audit Responded successfully");
      navigate("/audits");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollablePageWrapper className="pr-10">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon
              name="ArrowLeft"
              className="h-5 w-5 text-neutral-900 hover:cursor-pointer"
              onClick={() => router.back()}
            />
            <h1 className="font-Medium text-2xl text-primary-500">
              {formTemplateForResponse?.result?.title}
            </h1>
          </div>
        </div>
        <ul className="space-y-3 py-3">
          {questions?.map((form, index) => (
            <li key={index}>
              <div className="relative w-full rounded-2xl border bg-white p-8">
                <div className="flex items-center justify-between gap-6">
                  <div className="w-full space-y-1">
                    {QuestionType.ShortAnswer === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            register: register(form.id),

                            label: form?.question.label,
                            required: form.required,
                            //   placeholder: "Enter Reference Number",
                            type: InputTypes.TEXT,
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}

                    {QuestionType.Paragraph === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            label: form?.question.label,
                            control,
                            type: InputTypes.RICHTEXT,
                            name: form?.id,
                            required: form.required,
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                    {QuestionType.Signature === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            name: form?.id,
                            label: form?.question.label,
                            type: InputTypes.SIGNATURE,
                            control,
                            required: form.required,
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                    {QuestionType.SingleChoice === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            label: form?.question.label,
                            control,
                            type: InputTypes.RADIO,
                            name: form?.id,
                            required: form.required,
                            //   placeholder: "Type",
                            options: form.question.questionOptions?.map(
                              (option) => ({
                                label: option.name,
                                value: option.name,
                              }),
                            ),
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                    {QuestionType.Checkbox === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            label: form?.question.label,
                            control,
                            type: InputTypes.CHECKBOX,
                            name: form?.id,
                            required: form.required,
                            //   placeholder: "Type",
                            options: form.question.questionOptions?.map(
                              (option) => ({
                                label: option.name,
                                value: option.name,
                              }),
                            ),
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                    {QUESTION_TYPES.DROPDOWN === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            label: form?.question.label,
                            control,
                            type: InputTypes.SELECT,
                            name: form?.id,
                            required: form.required,
                            //   placeholder: "Type",
                            options: form.question.questionOptions?.map(
                              (option) => ({
                                label: option.name,
                                value: option.name,
                              }),
                            ),
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                    {QUESTION_TYPES.DATE === form.question.type.name && (
                      <FormWizard
                        className="max-w-md"
                        config={[
                          {
                            label: form?.question.label,
                            control,
                            name: form?.id,
                            type: InputTypes.DATE,
                            kind: "extensive",
                            required: form.required,
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                    {QUESTION_TYPES.TIME === form.question.type.name && (
                      <FormWizard
                        className="max-w-md"
                        config={[
                          {
                            control,
                            name: form?.id,
                            label: form?.question.label,
                            //   placeholder: "Select Time",
                            type: InputTypes.MOMENT,
                            required: form.required,
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}

                    {QUESTION_TYPES.FILE_UPLOAD === form.question.type.name && (
                      <FormWizard
                        config={[
                          {
                            type: InputTypes.DRAGNDROP,
                            label: form?.question.label,
                            name: form?.id,
                            defaultValue: null,
                            control,
                            errors: {
                              message: errors?.[form?.id]?.message?.toString(),
                              error: !!errors?.[form?.id],
                            },
                          },
                        ]}
                      />
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="default"
            className="flex h-9 items-center gap-2"
            onClick={() => navigate(routes.audits())}
          >
            <span>Cancel </span>
          </Button>
          {findRecordWithFullAccess(
            permissions,
            PermissionKeys.itemManagement.inspections.create,
          ) && (
            <Button
              id={PermissionKeys.itemManagement.inspections.create}
              type="submit"
              variant="default"
              size="default"
              className="flex h-9 items-center gap-2"
            >
              {isLoading && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Submit</span>
            </Button>
          )}
        </div>
      </form>
    </ScrollablePageWrapper>
  );
};

export default CompleteDesktop;
