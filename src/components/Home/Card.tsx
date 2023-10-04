'use client';

import Image from 'next/image';
import useModalType from '@/hooks/modalType';
import { useAppDispatch } from '@/store/hooks';
import {
  removeItem,
  setEditMediaId,
  setFileName,
  setItems,
} from '@/store/slice/mediaItems';
import { baseUrl } from '@/util/constants';

interface cardI {
  title?: string;
  img: string;
  id: number;
  link?: string;
}

const Card = ({ title, img, id, link }: cardI) => {
  const handleButton = useModalType();
  const dispatch = useAppDispatch();

  const handleCheck = (e: any) => {
    e.target.checked ? dispatch(setItems(id)) : dispatch(removeItem(id));
  };
  const handleDelete = () => {
    handleButton('delete');
    dispatch(setItems(id));
  };

  const copyToClipboard = () => {
    link && navigator.clipboard.writeText(link);
  };

  const handleEdit = () => {
    dispatch(setEditMediaId(id));
    dispatch(setFileName(img));
    handleButton('modify');
  };

  return (
    <div className="flex flex-col gap-4 rounded-md p-2 bg-white">
      <div>
        <div className="flex-center justify-between">
          <span>{title}</span>
          <input onChange={handleCheck} type="checkbox" name="" id="" />
        </div>
      </div>
      <Image
        src={`${baseUrl}load-media/${img}`}
        alt=""
        height={100}
        width={200}
        className=" w-full h-28 object-contain"
      />
      <div className="flex justify-end">
        <div className="flex-center gap-[0.91rem]">
          <button onClick={handleEdit}>
            <Image src="icons/edit.svg" alt="" width={18} height={18} />
          </button>
          {link && (
            <button onClick={copyToClipboard}>
              <Image src="icons/link.svg" alt="" width={18} height={18} />
            </button>
          )}
          <button onClick={handleDelete}>
            <Image src="icons/delete.svg" alt="" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
