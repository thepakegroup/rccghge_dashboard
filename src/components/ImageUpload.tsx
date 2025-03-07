import Image from "next/image";
import DragDrop from "./DragDrop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { setLeaderImg, setLeaderImgName } from "@/store/slice/leader";
import { setGroupImg, setGroupImgName } from "@/store/slice/churchGroup";
import { useState } from "react";

interface uploadI {
  section?: string;
  handleImageChange: (file: File) => void;
  isPage?: boolean; // Add isPage prop
  // defImg?: any;
}

const ImageUpload = ({
  section,
  handleImageChange = () => {},
  isPage = false, // Default to false
}: uploadI) => {
  const { file, fileName } = useAppSelector((state) => state.mediaItems);
  const { leaderImg, leaderImgName } = useAppSelector((state) => state.leader);
  const { groupImg, groupImgName } = useAppSelector(
    (state) => state.churchGroup
  );
  const dispatch = useAppDispatch();
  const [invalidDimension, setInvalidDimension] = useState(false);

  // Determine which file and filename to use based on section
  const currentFile =
    section === "leader" ? leaderImg : section === "group" ? groupImg : file;

  const currentFileName =
    section === "leader"
      ? leaderImgName
      : section === "group"
      ? groupImgName
      : fileName;

  const kb = currentFile && currentFile?.size / 1024; // Fixed size calculation

  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!isPage || !file.type.startsWith("image/")) {
        // Skip validation if not a page or not an image
        resolve(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = document.createElement("img");
        img.onload = () => {
          // For pages, validate minimum dimensions (1400x600px) and maximum (2000x600px)
          const isValid =
            img.width >= 1600 && img.width <= 2600 && img.height === 600;
          resolve(isValid);
        };
        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        } else {
          resolve(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File) => {
    if (file.type.startsWith("image/")) {
      const isValid = await checkImageDimensions(file);
      if (!isValid) {
        setInvalidDimension(true);
        return;
      }
    }
    setInvalidDimension(false);
    handleImageChange(file);
  };

  const upload = (
    <div className="flex-center md:flex-col gap-2 relative cursor-pointer">
      <div className="flex justify-center">
        <Image
          src="/icons/upload.svg"
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
          SVG, PNG, JPG or GIF{" "}
          {isPage ? "(min. 1400x600px, max. 2000x600px)" : "(max. 800x400px)"}
        </p>
      </div>
      <div className="md:hidden mt-4 ">
        <p className="text-gray-600 text-sm">
          <span className="text-gray-1 font-medium">Tap to Upload</span>
        </p>
        <p className="text-[11px] text-gray-400 w-full">
          SVG, PNG, JPG, GIF | 10MB max.{" "}
          {isPage && "| min 1400x600px, max 2000x600px"}
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
          src="/warning.svg"
          alt=""
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
      <div>
        <div className="text-sm text-gray-600">{currentFile?.name}</div>
        <div className="text-error-400 text-[0.6875rem]">
          The file is too large to upload
        </div>
      </div>
      <div className="flex-center justify-center gap-2 text-[#F56630] text-[0.6875rem]">
        <Image
          src="/icons/reload.svg"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
        <p>Reupload</p>
      </div>
    </div>
  );

  const dimensionError = (
    <div className="flex-center md:flex-col gap-3 relative cursor-pointer">
      <div className="flex justify-center h-10 w-10 rounded-full bg-warning-400">
        <Image
          src="/warning.svg"
          alt=""
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
      <div>
        <div className="text-sm text-gray-600">{currentFile?.name}</div>
        <div className="text-error-400 text-[0.6875rem]">
          The image dimensions are invalid.{" "}
          {isPage
            ? "Minimum dimensions required: 1400x600px, and Maximum dimensions required: 2000x600px"
            : "Maximum dimensions allowed: 800x400px"}
        </div>
      </div>
      <div className="flex-center justify-center gap-2 text-[#F56630] text-[0.6875rem]">
        <Image
          src="/icons/reload.svg"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
        <p>Reupload</p>
      </div>
    </div>
  );

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (section === "leader") {
      dispatch(setLeaderImg(null));
      dispatch(setLeaderImgName(""));
    } else if (section === "group") {
      dispatch(setGroupImg(null));
      dispatch(setGroupImgName(""));
    } else {
      dispatch(setMediaFile(null));
      dispatch(setFileName(""));
    }
  };

  const fileAvailable = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {currentFile && (
          <div className="relative h-14 w-14">
            <Image
              src={URL.createObjectURL(currentFile)}
              alt="Selected file"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-800">{currentFileName}</p>
          <span className="text-gray-400 text-[0.6875rem]">
            {kb && Math.ceil(kb)} KB
          </span>
        </div>
      </div>
      <Image
        src="/icons/delete.svg"
        alt="Remove file"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={removeFile}
      />
    </div>
  );

  const renderContent = () => {
    if (currentFile && kb && kb >= 3000) {
      return fileTooLarge;
    }

    if (invalidDimension) {
      return dimensionError;
    }

    if (currentFile && currentFileName) {
      return fileAvailable;
    }

    return upload;
  };

  return (
    <DragDrop section={section} handleImageChange={handleImageUpload}>
      <div className="px-4 py-6 rounded-md border border-dashed border-[#D0D5DD] my-6">
        {renderContent()}
      </div>
    </DragDrop>
  );
};

export default ImageUpload;
