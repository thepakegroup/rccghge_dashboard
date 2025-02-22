"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import useCloseModal from "@/hooks/closeModal";
import { useState } from "react";

interface editSettingI {
  handleSubmit: (mediaInfo: any) => void;
  onResetEditId: () => void;
  editItemData: any;
  editItemId: number | null;
}

const EditSettings = ({
  handleSubmit,
  editItemData,
  onResetEditId,
}: editSettingI) => {
  const handleCloseModal = useCloseModal();

  const [name, setName] = useState(editItemData?.name);
  const [value, setValue] = useState(editItemData?.value);

  const submitForm = (e: any) => {
    handleSubmit({ name, value });
    handleCloseModal();
    onResetEditId();
  };

  return (
    <ModalWrapper>
      <div onClick={(e) => e.stopPropagation()} className="modal pb-8">
        <div
          onClick={() => {
            handleCloseModal();
            onResetEditId();
          }}
          className="flex-center justify-end font-semibold text-base text-orange cursor-pointer"
        >
          <span>Close</span>
          <Image
            src="icons/close.svg"
            alt=""
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <form className="flex flex-col gap-[1.19rem]">
          <label htmlFor="name" className="input-field">
            <span>Setting Name</span>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              className="input"
            />
          </label>
          <label htmlFor="value" className="input-field">
            <span>Setting Value</span>
            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              name="value"
              className="input"
            />
          </label>
          <button
            onClick={submitForm}
            className="px-6 py-4 bg-[#e77400] w-full text-white rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditSettings;
