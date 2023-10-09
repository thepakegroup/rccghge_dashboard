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
import useUpdateToast from '@/hooks/updateToast';
import { useState } from 'react';

interface cardI {
  title?: string;
  img: string;
  id: number;
  home?: boolean;
}

const Card = ({ title, img, id, home }: cardI) => {
  const handleButton = useModalType();
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState(false);

  const handleCheck = (e: any) => {
    e.target.checked ? dispatch(setItems(id)) : dispatch(removeItem(id));
    setCheck(e.target.checked);
  };
  const handleDelete = () => {
    handleButton('delete');
    dispatch(setItems(id));
  };

  const updateToast = useUpdateToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${baseUrl}load-media/${img}`);
    updateToast({
      title: `${title} copied!`,
    });
  };

  const handleEdit = () => {
    dispatch(setEditMediaId(id));
    dispatch(setFileName(img));
    handleButton('modify');
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-md p-2 bg-white ${
        check && ' border-[3px] border-secondary-02'
      }`}
    >
      <div>
        <div className="flex-center justify-between">
          <span>{title}</span>
          <input
            onChange={handleCheck}
            type="checkbox"
            name=""
            className=" h-5 w-5"
          />
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
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          {home && (
            <button onClick={copyToClipboard}>
              <Image src="icons/link.svg" alt="" width={24} height={24} />
            </button>
          )}
          <button onClick={handleDelete}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
