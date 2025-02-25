"use client";

import Image from "next/image";
import useModalType from "@/hooks/modalType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  setEditMediaId,
  setFileName,
  setItems,
} from "@/store/slice/mediaItems";
import { baseUrl } from "@/util/constants";
import useUpdateToast from "@/hooks/updateToast";
import { useState, useEffect } from "react";
import { CalenderIcon } from "@/icons";
import { format, parseISO } from "date-fns";

interface cardI {
  title?: string;
  description?: string;
  img: string;
  id: number;
  home?: boolean;
  onEditClick?: () => void;
  end_date: string;
}

const Card = ({
  title,
  img,
  id,
  description,
  end_date,
  home,
  onEditClick = () => {},
}: cardI) => {
  const handleButton = useModalType();
  const dispatch = useAppDispatch();

  const [check, setCheck] = useState(false);
  const { items } = useAppSelector((state) => state.mediaItems);

  const handleCheck = (e: any) => {
    e.target.checked ? dispatch(setItems(id)) : dispatch(removeItem(id));
    setCheck(e.target.checked);
  };
  const handleDelete = () => {
    handleButton("delete");
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
    handleButton("modify");

    onEditClick();
  };

  useEffect(() => {
    items.length === 0 ? setCheck(false) : null;
  }, [items.length]);

  const date = parseISO(end_date);

  return (
    <div
      className={`flex flex-col relative gap-4 rounded-md  bg-white border-[3px] max-w-[269px]  ${
        check ? " border-secondary-02" : "border-white"
      }`}
    >
      <div className="absolute right-1 top-1">
        {/* <span>{title}</span> */}
        <input
          onChange={handleCheck}
          type="checkbox"
          checked={items.length === 0 ? false : check}
          name=""
          className=" h-5 w-5 cursor-pointer"
        />
      </div>

      <Image
        src={`${baseUrl}event-image/${img}`}
        alt=""
        height={100}
        width={200}
        className="!w-full h-[225px] object-contain"
      />

      <div className="flex flex-col gap-[7px] p-[10px]">
        <h3 className="font-play-fair-display font-medium text-base line-clamp-1">
          {title}
        </h3>
        <p className="font-quicksand !text-[#454545] text-xs line-clamp-3">
          {description}
        </p>
        <p className="text-xs font-quicksand flex items-start gap-2 text-gray-500">
          <CalenderIcon />
          <span>{end_date && format(date, "MMMM do - h a") + " - 12PM"}</span>
        </p>
      </div>

      <div className="flex justify-end pb-2">
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
