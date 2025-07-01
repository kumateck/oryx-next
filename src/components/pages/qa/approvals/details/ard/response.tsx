import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { isDocument, isImageFile, QuestionType, toSentenceCase } from "@/lib";
import { FormResponseDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  responses?: FormResponseDto[];
}
const FormResponseView = ({ responses }: Props) => {
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
                  <div className="rounded-xl border bg-white p-6 shadow-sm  bg-background px-8 py-4 ">
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
                          <span className="text-sm text-neutral-400">
                            {response?.formField?.question?.type ===
                            QuestionType.Datepicker ? (
                              response?.value ? (
                                format(response?.value as string, "MMM d, yyyy")
                              ) : (
                                ""
                              )
                            ) : response?.formField?.question?.type ===
                              QuestionType.Paragraph ? (
                              <TheAduseiEditorViewer
                                content={response?.value ?? ""}
                              />
                            ) : response?.formField?.question?.type ===
                                QuestionType.FileUpload ||
                              response?.formField?.question?.type ===
                                QuestionType.Signature ? (
                              ""
                            ) : (
                              toSentenceCase(response?.value as string)
                            )}
                          </span>
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
