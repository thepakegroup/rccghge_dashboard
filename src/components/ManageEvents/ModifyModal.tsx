"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCloseModal from "@/hooks/closeModal";
import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { eventSchema1 } from "@/helper/schema";

interface modalI {
  handleSubmitEvent: (mediaInfo: any) => void;
  handleImageChange: (file: File) => void;
  buttonText: string;
}

const ModifyModal = ({
  buttonText,
  handleSubmitEvent,
  handleImageChange = () => {},
}: modalI) => {
  const handleCloseModal = useCloseModal();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema1),
  });

  const toIsoStringDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const isoDateString = dateObject?.toISOString();
    return isoDateString;
  };

  const onSubmit = (data: any) => {
    const mediaInfo = {
      title: data.eventTitle,
      location: data.location,
      short_description: data.description,
      start_date: toIsoStringDate(data.startDate),
      end_date: data.endDate !== "" && toIsoStringDate(data.endDate),
    };

    handleSubmitEvent(mediaInfo);
    handleCloseModal();
  };

  useEffect(() => {
    dispatch(setMediaFile(null));
    dispatch(setFileName(""));
  }, [dispatch]);

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
          <ImageUpload handleImageChange={handleImageChange} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[1.19rem] min-h-[200px]"
          >
            <label htmlFor="title" className="input-field">
              <span>Event Title</span>
              <input
                type="text"
                id="title"
                {...register("eventTitle")}
                className="input"
              />
              <p className="text-xs text-red-600">
                {errors.eventTitle?.message}
              </p>
            </label>
            <label htmlFor="start" className="input-field">
              <span>Start Date</span>
              <input
                type="date"
                id="start"
                {...register("startDate")}
                className="input"
              />
              <p className="text-xs text-red-600">
                {errors.startDate?.message}
              </p>
            </label>

            <label htmlFor="end" className="input-field">
              <span>End Date</span>
              <input
                type="date"
                id="end"
                {...register("endDate")}
                className="input"
              />
              <p className="text-xs text-red-600">{errors.endDate?.message}</p>
            </label>

            <label htmlFor="location" className="input-field">
              <span>Event Location</span>
              <input
                type="text"
                id="location"
                {...register("location")}
                className="input"
              />
              <p className="text-xs text-red-600">{errors.location?.message}</p>
            </label>

            <label htmlFor="type" className="input-field">
              <span>Short Description</span>
              <textarea
                id="type"
                rows={10}
                {...register("description")}
                className="input"
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
