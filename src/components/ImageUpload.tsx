import Image from "next/image";
import DragDrop from "./DragDrop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { setLeaderImg, setLeaderImgName } from "@/store/slice/leader";
import { setGroupImg, setGroupImgName } from "@/store/slice/churchGroup";

interface uploadI {
  section?: string;
  handleImageChange: (file: File) => void;
  // defImg?: any;
}

const ImageUpload = ({ section, handleImageChange = () => {} }: uploadI) => {
  const { file, fileName } = useAppSelector((state) => state.mediaItems);
  const { leaderImg, leaderImgName } = useAppSelector((state) => state.leader);
  const { groupImg, groupImgName } = useAppSelector(
    (state) => state.churchGroup
  );
  const dispatch = useAppDispatch();

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

  const upload = (
    <div className="flex-center md:flex-col gap-2 relative cursor-pointer">
      <div className="flex justify-center">
        <Image
          src="/icons/upload.svg" // Added leading slash
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
          src="/warning.svg" // Added leading slash
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
          src="/icons/reload.svg" // Added leading slash
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
        src="/icons/delete.svg" // Added leading slash
        alt="Remove file"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={removeFile}
      />
    </div>
  );

  // Simplified content rendering logic
  const renderContent = () => {
    if (currentFile && kb && kb >= 3000) {
      return fileTooLarge;
    }

    if (currentFile && currentFileName) {
      return fileAvailable;
    }

    return upload;
  };

  return (
    <DragDrop section={section} handleImageChange={handleImageChange}>
      <div className="px-4 py-6 rounded-md border border-dashed border-[#D0D5DD] my-6">
        {renderContent()}
      </div>
    </DragDrop>
  );
};

export default ImageUpload;
