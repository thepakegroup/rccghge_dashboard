"use client";

import Image from "next/image";
import { labels } from "@/util/constants";
import { useState, useEffect } from "react";
// import useUpdateToast from "@/hooks/updateToast";
import ImageUpload from "../ImageUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setModalToggle } from "@/store/slice/Modal";
// import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
// import { useFetchData } from "@/hooks/fetchData";
import { EditItem } from "@/app/(admin)/page";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import Loader from "../Loader";

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
  buttonText: string;
  editItemId: number | null;
  editItemData: EditItem | null;
  onResetEditId: () => void;
  loading: boolean;
}

const UpdateModal = ({
  buttonText,
  handleSubmit,
  editItemId,
  onResetEditId,
  editItemData,
  loading,
}: modalI) => {
  // initializing state
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [img, setImg] = useState<File | any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  const handleCloseModal = () => {
    dispatch(setModalToggle({ isModalOpen: !isModalOpen }));
    onResetEditId();
    dispatch(setMediaFile(null));
    dispatch(setFileName(""));
  };

  const handleSubmitForm = () => {
    const mediaInfo = {
      name,
      media: img,
      link: mediaLink,
      short_description: description,
      media_type: mediaType,
    };

    handleSubmit(mediaInfo);

    loading ? null : handleCloseModal();
  };

  useEffect(() => {
    if (editItemData) {
      setName(editItemData.name);
      setMediaLink((info) => {
        return editItemData?.link === "undefined"
          ? "test link"
          : editItemData?.link;
      });
      setDescription(editItemData.short_description);
      setMediaType(editItemData.type);
    }
    dispatch(setMediaFile(null));
  }, [editItemData, dispatch]);

  // console.log(editItemData);

  return (
    <>
      {isModalOpen && (
        <div onClick={handleCloseModal} className="modal-wrapper w-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-red w-full  max-w-[467px]"
          >
            {loading ? (
              <Loader />
            ) : (
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
                  <ImageUpload handleImageChange={handleImageChange} />
                  <form className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10">
                    <label htmlFor="type" className="input-field">
                      <span>Media type</span>
                      <select
                        // onChange={(e) => setMediaType(e.target.value)}
                        disabled
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
