"use client";

import React, { useEffect, useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";

interface FileType {
  name: string;
  size: string;
}

interface Props {
  onChange: (files: FileList | null) => void;
  defaultValue: FileList | null;
}
export const FileUpload = ({ onChange, defaultValue }: Props) => {
  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    if (defaultValue) {
      const uploadedFiles = Array.from(defaultValue || []).map((file) => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}KB`,
      }));
      setFiles(uploadedFiles);
    }
  }, [defaultValue]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = e.target.files;
    const uploadedFiles = Array.from(e.target.files || []).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
    }));
    const filelists = [...files, ...uploadedFiles];
    setFiles(filelists);
    onChange(targetFiles);
  };

  const handleFileRemove = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center rounded-md border border-dashed border-neutral-400 p-4">
        {/* Upload Input */}
        <div className="w-full max-w-md text-center">
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
          <label
            htmlFor="fileUpload"
            className="inline-flex cursor-pointer flex-col items-center justify-center rounded-md px-4 py-2"
          >
            <IoImageOutline size={30} className="text-neutral-900" />
            <span className="text-base">
              <b className="text-info-500">Upload a file</b> or drag and drop
            </span>
          </label>
          <p className="text-sm text-neutral-400">PNG, JPG, GIF up to 5MB</p>
        </div>
      </div>
      {/* File List */}
      <div className="mt-4 grid w-full grid-cols-2 justify-center gap-x-11">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex w-full items-center gap-3 rounded-md bg-neutral-50 px-4 py-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-500">
              <FaRegFileLines size={16} className="text-primary-500" />
            </div>
            <div className="flex w-full flex-col">
              <span className="text-base text-neutral-900">{file.name}</span>
              <span className="text-sm text-neutral-500">{file.size}</span>
            </div>
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-danger-50"
              onClick={() => handleFileRemove(file.name)}
            >
              <FaRegTrashCan size={16} className="text-danger-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
