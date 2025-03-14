import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setContent, setDeleteFunc } from "@/store/slice/content";
import { setEditMediaId } from "@/store/slice/mediaItems";
import { writeupI } from "@/util/interface/writeup";
import Image from "next/image";
import { useState } from "react";

const Content = ({ id, page_title, content, heading }: writeupI) => {
  const handleButton = useModalType();
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const handleEditContent = () => {
    handleButton("modify");
    dispatch(
      setContent({
        title: page_title,
        content,
        header: heading,
        id,
        btnType: "edit",
      })
    );
  };

  const handleDeleteContent = () => {
    handleButton("delete");
    dispatch(setEditMediaId(id));
    dispatch(setDeleteFunc("edit content"));
  };

  return (
    <div className="bg-[#F2F2F2] rounded-lg p-6 text-sm flex flex-col gap-[0.69rem]">
      <div className="">
        <span className="capitalize font-bold">{page_title}</span>:{" "}
        <span>{heading}</span>
      </div>
      <>
        <div
          className={`${!expanded && "line-clamp-6"}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </>
      <div className="flex-center gap-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-center gap-1 text-sm text-ash-300 font-semibold rounded-md px-3 py-2 bg-[#D0D5DD]"
        >
          <span>{expanded ? "See less" : "See more"}</span>
          <Image
            src={!expanded ? "icons/arrowdown.svg" : "icons/arrow-up.svg"}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </button>
        <button onClick={handleEditContent}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={handleDeleteContent}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Content;
