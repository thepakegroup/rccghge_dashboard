"use client";

import Image from "next/image";
import ModalWrappeer from "../ModalWrapper";
import { setModalToggle } from "../../store/slice/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Listbox, Transition } from "@headlessui/react";
import DragDrop from "../DragDrop";
import useCloseModal from "@/hooks/closeModal";
import {
  groupI,
  setCatgeory,
  setName,
  setDescription,
  setAction,
  setGroupInfo,
} from "@/store/slice/churchGroup";
import useUpdateToast from "@/hooks/updateToast";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { Fragment, useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
  onResetEditId: () => void;
  editItemData: any;
  editItemId: number | null;
}

const GroupProfileModal = ({
  handleSubmit,
  editItemData,
  editItemId,
  onResetEditId,
}: modalI) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCloseModal();

  const { name, id, category, description } = useAppSelector(
    (state) => state.churchGroup
  );

  const [img, setImg] = useState<File | any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  const handleSubmitForm = () => {
    const groupInfo: groupI = {
      name,
      description,
      id,
      banner: img,
      category,
    };

    handleSubmit(groupInfo);

    handleCloseModal();
    onResetEditId();
  };

  useEffect(() => {
    editItemData &&
      dispatch(
        setGroupInfo({
          banner: editItemData?.banner,
          name: editItemData?.name,
          category: editItemData?.category,
          description: editItemData?.description,
          id: editItemData?.id,
          action: "edit",
        })
      );

    dispatch(setMediaFile(null));
  }, [dispatch, editItemData]);

  const [cat, setCat] = useState(editItemData?.category);

  const catOptions = [
    { name: "All", value: "All" },
    { name: "Department", value: "Department" },
    { name: "Ministry", value: "Ministry" },
  ];

  useEffect(() => {
    dispatch(setCatgeory(cat));
  }, [cat, dispatch]);

  return (
    <div
      onClick={() => {
        handleCloseModal();
        onResetEditId();
      }}
      className="modal-wrapper"
    >
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-content"
        >
          <div className="flex-center justify-end font-semibold text-base text-orange">
            <button
              onClick={() => {
                handleCloseModal();
                onResetEditId();
              }}
              className="flex-center gap-2"
            >
              <span>Close</span>
              <Image src="icons/close.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <ImageUpload handleImageChange={handleImageChange} />

          <form
            className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="name" className="input-field">
              <span>Name</span>
              <input
                onChange={(e) => dispatch(setName(e.target.value))}
                defaultValue={editItemData?.name}
                name="name"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="category" className="input-field">
              <span>Category</span>
              <Listbox value={cat} onChange={setCat}>
                <div className="relative">
                  <Listbox.Button className="relative w-full gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                    <span className="block truncate capitalize">
                      {cat === "our-mission"
                        ? "Our Mission"
                        : cat === "our-belief"
                        ? "Our Belief"
                        : cat}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="button-icon">
                          <path
                            id="Vector"
                            d="M4.375 7.1875L10 12.8125L15.625 7.1875"
                            stroke="#686868"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md p-1 mt-[3px] bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                      {catOptions.map((option, optionIdx) => (
                        <Listbox.Option
                          key={optionIdx}
                          className={({ active }) =>
                            `relative select-none py-2 px-4 cursor-pointer ${
                              active
                                ? "bg-gray-2 rounded-md w-full text-black"
                                : "text-black"
                            }`
                          }
                          value={option.value}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {option.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </label>
            <label htmlFor="description" className="input-field">
              <span>Description</span>
              <textarea
                onChange={(e) => dispatch(setDescription(e.target.value))}
                defaultValue={editItemData?.description}
                name="description"
                rows={5}
                className="input"
              />
            </label>
            <div className="">
              <button onClick={handleSubmitForm} className="modal-btn">
                update
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default GroupProfileModal;
