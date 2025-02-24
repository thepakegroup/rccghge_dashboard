"use client";

import { remove } from "@/helper/apiFetch";
import { Truncate } from "@/helper/truncate-text";
import { DotsIcon } from "@/icons/dots-icon";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { DeletingImageLoader } from "../deleting-image-loader";
import useUpdateToast from "@/hooks/updateToast";

export const OurProgramsList = ({
  item,
  setShowUpdateProgram,
  setSelectedProgram,
  getBackPageInfo,
}: {
  item: any;
  setShowUpdateProgram: Dispatch<SetStateAction<boolean>>;
  setSelectedProgram: Dispatch<SetStateAction<any>>;
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  const updateToast = useUpdateToast();
  //states
  const [showControls, setSetControls] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  // delete program function
  const removeProgram = async (id: any) => {
    setDeleting(true);
    try {
      const res = await remove(`ministry-page/program/${id}`);
      if (res.statusText === "OK") {
        await getBackPageInfo();
        updateToast({
          title: `Success`,
          type: "update",
          info: `${res.data?.message}`,
        });
      }
    } catch (error: any) {
      updateToast({
        title: `Error`,
        type: "error",
        info: `${error.response?.data?.message}`,
      });
    } finally {
      setDeleting(false);
    }
  };

  //
  return (
    <div
      key={item?.id}
      className="relative flex justify-between items-center bg-fade-ash/10 p-2 rounded-lg"
    >
      <input
        type="checkbox"
        className="ring-0 ring-transparent focus:ring-0 focus:ring-transparent checked:ring-0 checked:ring-transparent active:ring-0 active:ring-transparent checked:focus:bg-fade-ash checked:bg-fade-ash active:hover:bg-fade-ash checked:hover:bg-fade-ash rounded cursor-pointer"
      />
      <div className="flex gap-3 justify-start items-center">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={item?.flyer_url}
            alt={item?.name}
            width={100}
            height={100}
          />
        </div>
        <div title={item?.name}>{Truncate(item?.name, 14)}</div>
      </div>
      <div
        title={item?.description}
        dangerouslySetInnerHTML={{ __html: Truncate(item?.description, 8) }}
      />
      <DotsIcon onClick={() => setSetControls(!showControls)} />
      <MotionPresence>
        {showControls && (
          <MotionDiv
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="flex flex-col gap-2 bg-white absolute top-10 right-6 z-10 overflow-hidden"
          >
            <div
              className="py-2 px-3 border-b cursor-pointer"
              onClick={() => {
                setSetControls(false);
                setSelectedProgram(item);
                setShowUpdateProgram(true);
              }}
            >
              Edit
            </div>
            <div
              className="py-2 px-3 cursor-pointer"
              onClick={() => removeProgram(item?.id)}
            >
              Delete
            </div>
          </MotionDiv>
        )}
      </MotionPresence>
      {deleting && <DeletingImageLoader deleting={deleting} />}
    </div>
  );
};
