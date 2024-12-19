// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FaRegFileLines, FaRegTrashCan } from "react-icons/fa6";
// import { IoImageOutline } from "react-icons/io5";
// interface FileType {
//   name: string;
//   size: string;
// }
// interface Props {
//   onChange: (files: FileList | null) => void;
//   defaultValue: FileList | null;
// }
// export function DropZone({ onChange, defaultValue }: Props) {
//   const [files, setFiles] = useState<FileType[]>([]);
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     // Do something with the files
//     const uploadedFiles = Array.from(acceptedFiles || []).map((file) => ({
//       name: file.name,
//       size: `${(file.size / 1024).toFixed(2)}KB`,
//     }));
//     setFiles([...files, ...uploadedFiles]);
//     onChange(acceptedFiles as unknown as FileList);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     if (defaultValue) {
//       const uploadedFiles = Array.from(defaultValue || []).map((file) => ({
//         name: file.name,
//         size: `${(file.size / 1024).toFixed(2)}KB`,
//       }));
//       setFiles(uploadedFiles);
//     }
//   }, [defaultValue]);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//   const handleFileRemove = (fileName: string) => {
//     setFiles(files.filter((file) => file.name !== fileName));
//   };
//   return (
//     <div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <div className="flex w-full flex-col items-center rounded-md border border-dashed border-neutral-400 p-4">
//           <label
//             htmlFor="fileUpload"
//             className="inline-flex cursor-pointer flex-col items-center justify-center rounded-md px-4 py-2"
//           >
//             <IoImageOutline size={30} className="text-neutral-900" />
//             {isDragActive ? (
//               <span className="text-base">Drop the files here ...</span>
//             ) : (
//               <span className="text-base">
//                 <b className="text-info-500">Upload file(s)</b> or drag and drop
//               </span>
//             )}
//           </label>
//           <p className="text-sm text-neutral-400">
//             PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX, XLSX upto 5MB
//           </p>
//         </div>
//       </div>
//       <div className="mt-4 grid w-full grid-cols-2 justify-center gap-x-11">
//         {files.map((file) => (
//           <div
//             key={file.name}
//             className="flex w-full items-center gap-3 rounded-md bg-neutral-50 px-4 py-4"
//           >
//             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-500">
//               <FaRegFileLines size={16} className="text-primary-500" />
//             </div>
//             <div className="flex w-full flex-col">
//               <span className="text-base text-neutral-900">{file.name}</span>
//               <span className="text-sm text-neutral-500">{file.size}</span>
//             </div>
//             <div
//               className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-danger-50 hover:cursor-pointer"
//               onClick={() => {
//                 handleFileRemove(file.name);
//               }}
//             >
//               <FaRegTrashCan size={16} className="text-danger-500" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegFileLines, FaRegTrashCan } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";

interface FileType {
  name: string;
  size: string;
  file: File; // Store the original file for further use
}
interface Props {
  onChange: (files: FileList | null) => void;
  defaultValue: FileList | null;
}
export function DropZone({ onChange, defaultValue }: Props) {
  const [files, setFiles] = useState<FileType[]>([]);

  // const updateOnChange = (updatedFiles: FileType[]) => {
  //   const dataTransfer = new DataTransfer();
  //   updatedFiles.forEach((file) => dataTransfer.items.add(file.file));
  //   onChange(dataTransfer.files);
  // };

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const newFiles = acceptedFiles.map((file) => ({
  //       name: file.name,
  //       size: `${(file.size / 1024).toFixed(2)}KB`,
  //       file,
  //     }));

  //     const mergedFiles = [...files, ...newFiles];
  //     setFiles(mergedFiles);

  //     // Update the onChange callback
  //     updateOnChange(mergedFiles);
  //   },
  //   [files, updateOnChange],
  // );
  const updateOnChange = useCallback(
    (updatedFiles: FileType[]) => {
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file.file));
      onChange(dataTransfer.files);
    },
    [onChange], // Dependencies for updateOnChange
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}KB`,
        file,
      }));

      const mergedFiles = [...files, ...newFiles];
      setFiles(mergedFiles);

      // Use the stable updateOnChange function
      updateOnChange(mergedFiles);
    },
    [files, updateOnChange], // Dependencies for onDrop
  );

  useEffect(() => {
    if (defaultValue) {
      const uploadedFiles = Array.from(defaultValue || []).map((file) => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}KB`,
        file,
      }));
      setFiles(uploadedFiles);
    }
  }, [defaultValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileRemove = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    updateOnChange(updatedFiles);
  };

  return (
    <div className="w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex w-full flex-col items-center rounded-md border border-dashed border-neutral-400 p-4">
          <label
            htmlFor="fileUpload"
            className="inline-flex cursor-pointer flex-col items-center justify-center rounded-md px-4 py-2"
          >
            <IoImageOutline size={30} className="text-neutral-900" />
            {isDragActive ? (
              <span className="text-base">Drop the files here ...</span>
            ) : (
              <span className="text-base">
                <b className="text-info-500">Upload file(s)</b> or drag and drop
              </span>
            )}
          </label>
          <p className="text-sm text-neutral-400">
            PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX, XLSX upto 5MB
          </p>
        </div>
      </div>
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
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-danger-50 hover:cursor-pointer"
              onClick={(e) => handleFileRemove(file.name, e)}
            >
              <FaRegTrashCan size={16} className="text-danger-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
