"use client";

import Image from "next/image";
import React, { Fragment, useState } from "react";
import ImageUpload from "../ImageUpload";
import { Listbox, Transition } from "@headlessui/react";

interface Props {
  onClose: () => void;
  selectedAccount: string;
}

const EditSocial = ({ onClose, selectedAccount }: Props) => {
  const [img, setImg] = useState<File | any>("");
  const [mediaType, setMediaType] = useState<any>("");
  const [mediaLink, setMediaLink] = useState<any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      image: img,
      media_name: selectedAccount,
      media_type: mediaType,
      media_link: mediaLink,
    };

    console.log(body);
  };
  return (
    <section className="modal-wrapper w-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal modal-content overflow-x-hidden max-h-[500px] md:max-h-[561px]"
      >
        <div className="flex-center justify-end font-semibold text-base text-orange">
          <button onClick={onClose} className="flex-center gap-2 ">
            <span>Close</span>
            <Image src="icons/close.svg" alt="" width={24} height={24} />
          </button>
        </div>

        <ImageUpload handleImageChange={handleImageChange} />

        {/* form */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-[1.19rem] min-h-[200px] pb-5"
        >
          <label htmlFor="name" className="input-field">
            <span>Media name</span>
            <input
              readOnly
              value={selectedAccount}
              type="text"
              className="input"
            />
          </label>

          <label htmlFor="type" className="input-field">
            <span>Media type</span>
            <Listbox value={mediaType} onChange={setMediaType}>
              <div className="relative">
                <Listbox.Button className="relative w-full min-w-[127px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                  <span className="block truncate">
                    {mediaType || "Select Media Type"}
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
                    {labels.map((option, optionIdx) => (
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
                              {option.label}
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

          <label htmlFor="link" className="input-field">
            <span>Media link</span>
            <input
              onChange={(e) => setMediaLink(e.target.value)}
              value={mediaLink}
              type="text"
              className="input"
            />
          </label>

          <button
            className="bg-[#E77400] p-4 w-full max-w-[70%] mx-auto text-white rounded-md"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSocial;

const labels = [
  {
    label: "Image",
    value: "image",
  },
  {
    label: "Video",
    value: "video",
  },
];
