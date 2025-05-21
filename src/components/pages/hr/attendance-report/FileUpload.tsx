import { FormError } from "@/components/form-inputs";
import { Button, Icon } from "@/components/ui";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AttendanceReportDto, AttendanceReportValidator } from "./types";

interface FileType {
  name: string;
  size: string;
  file: File; // Store the original file for further use
}

export function FillUpload() {
  const [fileDetails, setFileDetails] = useState<FileType[]>([]);

  const {
    formState: { errors },
  } = useForm<AttendanceReportDto>({
    resolver: AttendanceReportValidator,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (fileDetails.length > 0) {
        return toast.info("You can only upload sing report at a momment");
      }
      const newFiles: { name: string; size: string; file: File }[] = [];
      acceptedFiles.forEach((file) => {
        if (!fileDetails.find((oldFile) => file.name === oldFile.name)) {
          newFiles.push({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)}KB`,
            file,
          });
        } else {
          toast.info("There already exists a file with this name");
        }
      });

      // const mergedFiles = [...fileDetails, ...newFiles];
      setFileDetails([...newFiles]);
    },
    [fileDetails], // Dependencies for onDrop
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [], // DOCX
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [], // XLSX
    },
  });

  return (
    <div className="w-full">
      <div className="my-4 grid w-full grid-cols-2 justify-center gap-x-11 gap-y-8">
        {fileDetails.map((file) => (
          <div
            key={file.name}
            className="flex w-full items-center gap-3 rounded-2xl border bg-neutral-50 px-4 py-4"
          >
            <div className="bg-secondary-500 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <Icon name="FileText" className="text-primary-500" />
            </div>
            <div className="flex w-full flex-col">
              <span className="text-base text-neutral-900">{file.name}</span>
              <span className="text-sm text-neutral-500">{file.size}</span>
            </div>
            <button
              type="button"
              className="bg-danger-50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setFileDetails([]);
              }}
            >
              <Icon name="Trash2" className="text-danger-500" />
            </button>
          </div>
        ))}
      </div>
      <div {...getRootProps()}>
        <input key={fileDetails.length} {...getInputProps()} />
        <div className="flex w-full flex-col items-center rounded-2xl border border-dashed border-neutral-400 p-4">
          <div className="inline-flex cursor-pointer flex-col items-center justify-center rounded-2xl px-4 py-2">
            <Icon name="Image" className="text-neutral-900" />
            {isDragActive ? (
              <span className="text-base">
                <b className="text-info-500">Upload files</b> or drag and drop
              </span>
            ) : (
              "Upload New file here"
            )}
          </div>
          <p className="text-sm text-neutral-400">LSX upto 5MB</p>
        </div>
      </div>
      <FormError errors={errors} fieldName={"File"} />
      {/* Butthos */}
      <form className="w-fit mt-4 ml-auto flex items-center justify-center gap-2">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setFileDetails([]);
          }}
          disabled={fileDetails.length === 0}
          variant="outline"
        >
          Cancil
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
