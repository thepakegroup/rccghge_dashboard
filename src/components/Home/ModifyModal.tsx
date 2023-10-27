"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import useCloseModal from "@/hooks/closeModal";
import { labels } from "@/util/constants";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch } from "@/store/hooks";
import { setMediaFile, setFileName } from "@/store/slice/mediaItems";
import useUpdateToast from "@/hooks/updateToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { mediaSchema } from "@/helper/schema";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface modalI {
  handleMSubmit: (mediaInfo: any) => void;
  buttonText: string;
}

const ModifyModal = ({ buttonText, handleMSubmit }: modalI) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mediaSchema),
  });

  const handleCloseModal = useCloseModal();
  const updateToast = useUpdateToast();

  const [mediaType, setMediaType] = useState("");
  const [img, setImg] = useState<File | any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // Conditional Validation
  mediaSchema.fields.mediaLink =
    mediaType === "SOCIAL_MEDIA"
      ? yup.string().required("Media link is required")
      : yup.string();

  mediaSchema.fields.description =
    mediaType === "SOCIAL_MEDIA"
      ? yup.string().required("Media description is required")
      : yup.string();

  const handleSubmitForm = (data: any) => {
    // console.log(data);

    if (img === "") {
      updateToast({
        title: "Image cannot be empty",
        info: "Please select an image!",
      });
      return;
    }
    if (mediaType === "") {
      updateToast({
        title: "Media type cannot be empty",
        info: "Please select a media type!",
      });
      return;
    }

    const mediaInfo = {
      name: data.name,
      media: img,
      link: data.mediaLink,
      short_description: data.description,
      media_type: mediaType,
    };

    handleMSubmit(mediaInfo);
    handleCloseModal();
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMediaFile(null));
    dispatch(setFileName(""));
  }, [dispatch]);

  return (
    <ModalWrapper>
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-content "
        >
          <div className="flex-center justify-end font-semibold text-base text-orange">
            <button onClick={handleCloseModal} className="flex-center gap-2">
              <span>Close</span>
              <Image src="icons/close.svg" alt="" width={24} height={24} />
            </button>
          </div>
          <ImageUpload handleImageChange={handleImageChange} />
          <form
            className="flex flex-col gap-[1.19rem] min-h-[200px]"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
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
                            stroke-width="2.25"
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
                      {labels.map((label, labelIdx) => (
                        <Listbox.Option
                          key={label.value}
                          className={({ active }) =>
                            `relative select-none py-2 px-4 cursor-pointer ${
                              active
                                ? "bg-gray-2 rounded-md w-full text-black"
                                : "text-black"
                            }`
                          }
                          value={label.value}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {label.label}
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
            <label htmlFor="name" className="input-field">
              <span>Media name</span>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="input"
              />
              <p className="text-xs text-red-600">{errors.name?.message}</p>
            </label>
            <label htmlFor="link" className="input-field">
              <span>Media link</span>
              <input
                {...register("mediaLink")}
                id="link"
                type="text"
                className="input"
              />
              <p className="text-xs text-red-600">
                {errors.mediaLink?.message}
              </p>
            </label>
            <label htmlFor="description" className="input-field">
              <span>Short description</span>
              <textarea
                {...register("description")}
                rows={10}
                className="input"
                id="description"
              />
              <p className="text-xs text-red-600">
                {errors.description?.message}
              </p>
            </label>
            <div className="">
              <button type="submit" className="modal-btn">
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModifyModal;
