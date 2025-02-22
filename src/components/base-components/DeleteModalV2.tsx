import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { BtnLoader } from "./btn-loader";

export const DeleteModalV2 = ({
  deleting,
  deleteFunc,
  title,
  setShowModal,
}: {
  deleting: boolean;
  deleteFunc: () => void | Promise<void>;
  title?: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="modal-wrapper">
      <div className="relative bg-red w-full flex flex-col justify-center items-center ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="delete-modal flex-center flex-col justify-center"
        >
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
          <div className="text-base whitespace-break-spaces text-[#191919] font-medium text-center mt-3 mb-6">
            {title ? title : "Are you sure you want to delete?"}
          </div>
          <div className="flex-center gap-3 text-sm [&>button]:px-8 [&>button]:py-2 [&>button]:rounded-md">
            <button
              onClick={() => setShowModal(false)}
              className="border-2 border-[#D0D5DD]"
            >
              No
            </button>
            <button
              onClick={deleteFunc}
              className="flex items-center gap-2 bg-[#CB1A14] text-white"
            >
              {deleting ? <BtnLoader className="h-[22px] w-[22px]" /> : null}
              {deleting ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
