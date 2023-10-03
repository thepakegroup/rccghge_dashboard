import Image from 'next/image';
import DragDrop from './DragDrop';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMediaFile } from '@/store/slice/mediaItems';

const ImageUpload = () => {
  const { file } = useAppSelector((state) => state.mediaItems);
  const dispatch = useAppDispatch();

  const kb = file && file?.size / 1024;
  // const mb = kb && kb / 1024;

  // console.log(file?.mtime);

  const upload = (
    <div className="flex-center md:flex-col gap-3 relative cursor-pointer">
      <div className="flex justify-center">
        <Image
          src="icons/upload.svg"
          alt=""
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </div>
      <div className="hidden md:block text-center">
        <p className="text-gray-600 text-sm">
          <span className="text-secondary-01">Click to upload</span>{' '}
          <span>or drag and drop</span>
        </p>
        <p className="text-xs text-gray-400">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
      <div className="md:hidden mt-4 text-center">
        <p className="text-gray-600 text-sm">
          <span className="text-secondary-01">Tap upload</span>
        </p>
        <p className="text-xs text-gray-400">
          SVG, PNG, JPG or GIF (max. 800x400px)
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
        <div className="text-sm text-gray-600">{file?.name}</div>
        <div className="text-error-400 text-[0.6875rem]">
          The file is too large to upload
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
        <p>Reupload</p>
      </div>
    </div>
  );

  const removeFile = (e: any) => {
    e.stopPropagation();
    dispatch(setMediaFile(null));
  };

  const fileAvailable = (
    <div className="flex-center justify-between">
      <div className="flex-center gap-3">
        <div className="rounded-full bg-[#E7F6EC] h-10 w-10 flex-center justify-center">
          <Image
            src="icons/success.svg"
            alt=""
            width={28}
            height={28}
            className="cursor-pointer"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">Upload Successful</p>
          <span className="text-gray-400 text-[0.6875rem]">
            {file?.name} | {Math.ceil(kb as number)} KB
          </span>
        </div>
      </div>
      <Image
        src="icons/delete.svg"
        alt=""
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={removeFile}
      />
    </div>
  );

  return (
    <DragDrop>
      <div className="px-4 py-6 rounded-md border border-dashed border-[#D0D5DD] my-6">
        {!file
          ? upload
          : file && kb && kb >= 3000
          ? fileTooLarge
          : fileAvailable}
      </div>
    </DragDrop>
  );
};

export default ImageUpload;
