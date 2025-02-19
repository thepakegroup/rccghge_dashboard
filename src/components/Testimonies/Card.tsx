"use client";

import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setTestimonyId } from "@/store/slice/testimony";
import Image from "next/image";
import { format } from "date-fns";

interface cardI {
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  onEditClick?: () => void;
  id: number;
  publishTestimony: (published: boolean, id: number) => void;
}

const Card = ({
  title,
  content,
  published,
  createdAt,
  id,
  onEditClick = () => {},
  publishTestimony,
}: cardI) => {
  const handleButton = useModalType();
  const dispatch = useAppDispatch();

  const handleDeleteTestimony = () => {
    dispatch(setTestimonyId(id));
    handleButton("delete");
  };

  const handleEdit = () => {
    dispatch(setTestimonyId(id));
    handleButton("modify");

    onEditClick();
  };

  return (
    <div className="bg-white border border-[#AEBCD1] rounded-lg p-3 max-w-[269px]">
      <div className="text-xs text-fade-ash flex items-center gap-2">
        <span>{format(new Date(createdAt), "MMM d, yyyy")}</span>{" "}
        <span>
          <svg
            width="3"
            height="3"
            viewBox="0 0 3 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.5" cy="1.5" r="1" fill="#686868" />
          </svg>
        </span>
        <span>{format(new Date(createdAt), " h:mmaaa")}</span>
      </div>

      <div className="my-[1.38rem] flex flex-col gap-2">
        <p className="text-base font-semibold capitalize">{title}</p>
        <p className="text-ash-200 text-sm">{content}</p>
      </div>

      <div className="flex-center justify-between">
        <button
          onClick={() => publishTestimony(published, id)}
          className={`text-sm font-semibold capitalize px-4 py-2 rounded-md ${
            published
              ? "border border-[#e77400] text-[#e77400]"
              : "bg-[#e77400] text-white"
          }`}
        >
          {published ? "Published" : "publish"}
        </button>
        <div className="flex-center gap-6">
          <button onClick={handleEdit}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={handleDeleteTestimony}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
