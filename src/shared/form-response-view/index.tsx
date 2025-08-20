import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import {
  isDocument,
  isImageFile,
  QuestionType,
  SpecificationReference,
  toSentenceCase,
} from "@/lib";
import { FormResponseDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  responses?: FormResponseDto[];
}

const FormResponseView = ({ responses }: Props) => {
  console.log(responses, "materialData?.response?.formResponses");
  const renderResponseValue = (response: FormResponseDto) => {
    const questionType = response?.formField?.question?.type;
    const value = response?.value;

    switch (questionType) {
      case QuestionType.Datepicker:
        return value ? (
          <span className="text-sm text-neutral-400">
            {format(value as string, "MMM d, yyyy")}
          </span>
        ) : (
          <span className="text-sm text-neutral-400"></span>
        );

      case QuestionType.Paragraph:
        return (
          <div className="text-sm text-neutral-400">
            <TheAduseiEditorViewer content={value ?? ""} />
          </div>
        );

      case QuestionType.FileUpload:
      case QuestionType.Signature:
        return <span className="text-sm text-neutral-400"></span>;

      case QuestionType.Formular:
        if (!value) {
          return <span className="text-sm text-neutral-400"></span>;
        }

        // Try to parse as JSON first
        let formularValue;
        let isValidJSON = false;

        try {
          formularValue = JSON.parse(value as string);
          // Check if it's a valid JSON object with the expected structure
          if (
            formularValue &&
            typeof formularValue === "object" &&
            "result" in formularValue &&
            "expression" in formularValue &&
            "fieldValues" in formularValue &&
            "previewExpression" in formularValue
          ) {
            isValidJSON = true;
          }
        } catch (error) {
          console.log(error);
          // If JSON parsing fails, treat as regular string
          isValidJSON = false;
        }

        // If it's not valid JSON or doesn't have expected structure, treat as normal string
        if (!isValidJSON) {
          return (
            <span className="text-sm text-neutral-400">
              {toSentenceCase(value as string)}
            </span>
          );
        }

        // Process valid formula JSON
        const expressionPreview = formularValue.previewExpression;
        const fieldValues = formularValue.fieldValues || {};

        // Replace field keys with their values in the preview

        return (
          <div className="flex justify-between text-sm text-neutral-400">
            {/* Left side: Expression, Preview, Result */}
            <div className="space-y-3">
              {/* Expression */}
              {formularValue.expression && (
                <div>
                  <span className="font-medium text-neutral-600">
                    Expression:{" "}
                  </span>
                  <span className="font-mono bg-gray-50 px-2 py-1 rounded">
                    {formularValue.expression}
                  </span>
                </div>
              )}

              {/* Preview with substituted values */}
              <div>
                <span className="font-medium text-neutral-600">Preview: </span>
                <span className="font-mono bg-green-50 px-2 py-1 rounded text-green-800">
                  {expressionPreview}
                </span>
              </div>

              {/* Result */}
              <div>
                <span className="font-medium text-neutral-600">Result: </span>
                <span className="font-semibold text-lg text-blue-600">
                  {formularValue.result}
                </span>
              </div>
            </div>

            {/* Right side: Legend */}
            {Object.keys(fieldValues).length > 0 && (
              <div className="ml-8">
                <span className="font-medium text-neutral-600">Legend: </span>
                <div className="mt-1 space-y-1">
                  {Object.entries(fieldValues).map(
                    ([key, fieldData]: [string, any]) => {
                      const label = fieldData?.label || key;
                      const fieldKey = fieldData?.key || key;
                      const fieldValue = fieldData?.value || fieldData;
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span className="font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                            :{fieldKey}
                          </span>
                          <span>=</span>
                          <span className="font-medium">{fieldValue}</span>
                          {label !== key && (
                            <span className="text-neutral-500">({label})</span>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case QuestionType.Specification:
        return (
          <span className="text-sm text-neutral-400">
            {SpecificationReference[Number(value as string)]}
          </span>
        );
      default:
        return (
          <span className="text-sm text-neutral-400">
            {toSentenceCase(value as string)}
          </span>
        );
    }
  };

  return (
    <div>
      <div>
        <div className="w-full">
          <ul className="space-y-4">
            {responses?.map((response, idx) => {
              // Dynamically define images and documents for each response
              const attachments = response?.attachments || [];
              const images = attachments.filter((attachment) =>
                isImageFile(attachment.name as string),
              );
              const documents = attachments.filter((attachment) =>
                isDocument(attachment.name as string),
              );

              return (
                <li key={idx}>
                  <div className="rounded-xl border bg-white p-6 shadow-sm bg-background px-8 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="flex flex-1 gap-1 text-sm text-primary-500">
                          <span>{idx + 1}.</span>
                          <span>
                            {toSentenceCase(
                              response?.formField?.question?.label as string,
                            )}
                          </span>
                        </div>
                        <div>
                          {renderResponseValue(response)}
                          <div>
                            <div className="space-y-6">
                              {/* Images */}
                              {images.length > 0 && (
                                <>
                                  <p className="mb-3 mt-4 text-xs font-medium text-neutral-400">
                                    Images
                                  </p>
                                  <div className="flex flex-wrap gap-3">
                                    {images.map((image) => (
                                      <Image
                                        key={image.link as string}
                                        src={image.link as string}
                                        alt={image.name as string}
                                        width={123}
                                        height={123}
                                        className="h-[123px] w-fit rounded-2xl object-cover"
                                      />
                                    ))}
                                  </div>
                                </>
                              )}

                              {/* Documents */}
                              {documents.length > 0 && (
                                <>
                                  <p className="mb-3 mt-4 text-xs font-normal text-neutral-400">
                                    Documents
                                  </p>
                                  <div className="grid grid-cols-4 gap-4">
                                    {documents.map((doc) => (
                                      <div
                                        key={doc.id}
                                        className="flex items-center gap-2"
                                      >
                                        <FileIcon />
                                        <a
                                          href={doc.link as string}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs font-normal text-info-500"
                                        >
                                          {doc.name}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormResponseView;
