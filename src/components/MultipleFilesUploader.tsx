"use client";

import Image from "next/image";
import React, { ReactElement, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = [
  "JPG",
  "PNG",
  "GIF",
  "SVG",
  "JPEG",
  "WEBP",
  "HEIF",
  "TIFF",
  "mp4",
];

function DragDropFile({
  children,
  handleChange,
}: {
  children: ReactElement;
  handleChange: (files: FileList) => void;
}) {
  return (
    <FileUploader
      multiple={true}
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    >
      {children}
    </FileUploader>
  );
}

export default DragDropFile;

export const MultipleImageUploader = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const handleChange = (newFiles: FileList) => {
    const filesArray = Array.from(newFiles);
    setFiles([...files, ...filesArray]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const upload = (
    <div className="flex-center md:flex-col gap-2 relative cursor-pointer">
      <div className="flex justify-center">
        <Image
          src="icons/upload.svg"
          alt=""
          width={32}
          height={32}
          className="cursor-pointer w-8 h-8 md:w-6 md:h-6"
        />
      </div>
      <div className="hidden md:block text-center">
        <p className="text-gray-600 text-sm">
          <span className="text-orange">Click to upload</span>{" "}
          <span>or drag and drop</span>
        </p>
        <p className="text-xs text-gray-400">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
      <div className="md:hidden mt-4 ">
        <p className="text-gray-600 text-sm">
          <span className="text-gray-1 font-medium">Tap to Upload</span>
        </p>
        <p className="text-[11px] text-gray-400 w-full">
          SVG, PNG, JPG, GIF | 10MB max.
        </p>
      </div>
      <button className="md:hidden bg-[#EB5017] px-4 py-2 text-white text-sm font-semibold rounded-md">
        Upload
      </button>
    </div>
  );

  const fileTooLarge = (
    <div className="flex-center md:flex-col gap-3 relative cursor-pointer">
      <div className="flex justify-center h-10 w-10 rounded-full bg-warning-400">
        <Image
          src="icons/warning.svg"
          alt=""
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
      <div>
        <div className="text-sm text-gray-600">
          {files
            ?.filter((c) => c?.size >= 10485760)
            ?.map((x) => x?.name + ", ")}
        </div>
        <div className="text-error-400 text-[0.6875rem]">
          These files are too large to upload
        </div>
      </div>
      <div className="flex-center justify-center gap-2 text-[#F56630] text-[0.6875rem]">
        <Image
          src="icons/reload.svg"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
        <p onClick={() => setFiles([])}>Reupload</p>
      </div>
    </div>
  );

  const fileAvailable = (
    <div className="flex flex-col gap-4">
      {/* Header with add button */}
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-800">Selected Files</p>
        <button className="bg-[#E77400] py-[10px] px-10 w-fit text-white rounded-md">
          Add
        </button>
      </div>

      {/* Display selected files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {files?.map((file, index) => (
          <div
            key={file.name}
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-2 border p-2 rounded-md"
          >
            {file.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={40}
                height={40}
                className="rounded-md"
              />
            ) : (
              <div className="text-gray-600 text-sm">{file.name}</div>
            )}
            <span className="text-gray-400 text-xs">
              {Math.ceil(file.size / 1024)} KB
            </span>
            <Image
              src="icons/delete.svg"
              alt="Remove"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const content = (file: File[]) => {
    if (file?.length < 1) {
      return upload;
    }

    const largeFiles = file.filter((c) => c?.size > 10485760);

    if (largeFiles?.length > 0) {
      return fileTooLarge;
    }

    if (file?.length > 0) {
      return fileAvailable;
    }
  };

  return (
    <DragDropFile handleChange={handleChange}>
      <div className="px-6 py-6 rounded-md bg-white border border-dashed border-[#D0D5DD] my-6 mx-6">
        {content(files)}
      </div>
    </DragDropFile>
  );
};
