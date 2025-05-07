import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "./icon";
import Image from "next/image";

interface Props {
  onChange: (file: File | null) => void;
  defaultValue: string | null;
  name: string;
}

export function ImageUpload({ onChange, defaultValue, name }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValue);

  const onDrop = (acceptedFiles: File[]) => {
    // Only accept image files
    const file = acceptedFiles[0];
    onChange(file);
    if (file && file.type.startsWith("image")) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [], // covers both JPG and JPEG
      "image/webp": [],
    }, // Only accept images
  });

  const handleRemoveImage = () => {
    setImagePreview(null); // Clear image preview
    onChange(null);
  };

  return (
    <div className="w-fit">
      {!imagePreview ? (
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <input id={name} {...getInputProps()} />
          <div className="w-48 h-48  flex  flex-col items-center rounded-2xl border border-dashed bg-white border-neutral-400 p-4 text-center">
            <div className="inline-flex cursor-pointer flex-col items-center justify-center rounded-2xl px-4 py-2 w-full h-full">
              <Icon name="Image" className="text-neutral-dark" />
              {isDragActive ? (
                <span className="text-sm">Drop the file here ...</span>
              ) : (
                <span className="text-sm">
                  <b className="text-info-500">Upload a file</b> or drag and
                  drop
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-default">
              PNG, JPG, JPEG, WEBP up to 5MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className=" w-48 h-48 overflow-hidden relative rounded-2xl">
            <Image
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleRemoveImage}
            className="absolute z-10 -top-2 -right-2 p-1 bg-danger-selected rounded-full shadow-md "
          >
            <Icon name="X" className="text-danger-default" />
          </button>
        </div>
      )}
    </div>
  );
}
