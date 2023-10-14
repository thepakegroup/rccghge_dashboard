"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import DragDrop from "../DragDrop";
import useCloseModal from "@/hooks/closeModal";
import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
  buttonText: string;
}

const ModifyModal = ({ buttonText, handleSubmit }: modalI) => {
  const handleCloseModal = useCloseModal();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const toIsoStringDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const isoDateString = dateObject?.toISOString();
    return isoDateString;
  };

  const handleSubmitForm = () => {
    const mediaInfo = {
      title,
      ...(buttonText === "Update" && location !== undefined
        ? { location }
        : {}),
      short_description: description,
      start_date: toIsoStringDate(startDate),
      end_date: endDate !== "" && toIsoStringDate(endDate),
    };

    handleSubmit(mediaInfo);
    handleCloseModal();
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMediaFile(null));
    // dispatch(setFileName(''));
  }, []);

  return (
    <ModalWrapper>
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-content"
        >
          <div
            onClick={handleCloseModal}
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
          <ImageUpload />
          <form className="flex flex-col gap-[1.19rem] min-h-[200px]">
            <label htmlFor="title" className="input-field">
              <span>Event title</span>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                name="title"
                id="title"
                className="input"
              />
            </label>
            <label htmlFor="start" className="input-field">
              <span>Start Date</span>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                type="date"
                name="start"
                id="start"
                className="input"
              />
            </label>

            <label htmlFor="end" className="input-field">
              <span>End Date</span>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                type="date"
                name="end"
                id="end"
                className="input"
              />
            </label>

            <label htmlFor="location" className="input-field">
              <span>Event Location</span>
              <input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                type="text"
                name="location"
                className="input"
              />
            </label>

            <label htmlFor="type" className="input-field">
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
    </ModalWrapper>
  );
};

export default ModifyModal;
