"use client";

import Image from "next/image";
import { baseUrl, labels } from "@/util/constants";
import { useState, useEffect } from "react";
import useUpdateToast from "@/hooks/updateToast";
import ImageUpload from "../ImageUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setModalToggle } from "@/store/slice/Modal";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { useFetchData } from "@/hooks/fetchData";

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
  buttonText: string;
  editItemId: number | null;
  onResetEditId: () => void;
}

const UpdateModal = ({
  buttonText,
  handleSubmit,
  editItemId,
  onResetEditId,
}: modalI) => {
  // initializing state
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState("");

  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  const { data, loading } = useFetchData({
    url: `api/getMediaById/${editItemId}`,
  });

  const media = data?.message;

  const handleCloseModal = () => {
    dispatch(setModalToggle({ isModalOpen: !isModalOpen }));
    onResetEditId();
  };

  const handleSubmitForm = () => {
    const mediaInfo = {
      name,
      link: mediaLink,
      short_description: description,
      media_type: mediaType,
    };

    handleSubmit(mediaInfo);
    handleCloseModal();
  };

  useEffect(() => {
    // dispatch(setMediaFile(null));

    if (media) {
      setName(media?.name);
      setMediaLink(media?.link);
      setDescription(media?.short_description);
      setMediaType(media?.type);
    }
  }, [media]);

  return (
    <>
      {isModalOpen && (
        <div onClick={handleCloseModal} className="modal-wrapper w-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-red w-full  max-w-[467px]"
          >
            <>
              <div
                onClick={(e) => e.stopPropagation()}
                className="modal modal-content overflow-x-hidden max-h-[500px] md:max-h-[561px]"
              >
                <div className="flex-center justify-end font-semibold text-base text-orange">
                  <button
                    onClick={handleCloseModal}
                    className="flex-center gap-2 "
                  >
                    <span>Close</span>
                    <Image
                      src="icons/close.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <ImageUpload />
                <form className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10">
                  <label htmlFor="type" className="input-field">
                    <span>Media type</span>
                    <select
                      onChange={(e) => setMediaType(e.target.value)}
                      value={mediaType}
                      name="type"
                      className="input"
                    >
                      <option value=""></option>
                      {labels.map((label) => {
                        return (
                          <option key={label.value} value={label.value}>
                            {label.label}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label htmlFor="name" className="input-field">
                    <span>Media name</span>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      className="input"
                    />
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
                  <label htmlFor="description" className="input-field">
                    <span>Short description</span>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      rows={10}
                      className="input"
                    />
                  </label>
                </form>
              </div>
              <div className="modal-btn-wrapper">
                <button onClick={handleSubmitForm} className="modal-btn">
                  {buttonText}
                </button>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
