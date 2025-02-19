"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCloseModal from "@/hooks/closeModal";
import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { eventSchema1 } from "@/helper/schema";
import useUpdateToast from "@/hooks/updateToast";
import { DateTimePicker } from "../DateTimePicker";

interface modalI {
  handleSubmitEvent: (mediaInfo: any) => void;
  // handleImageChange: (file: File) => void;
  buttonText: string;
}

const ModifyModal = ({
  buttonText,
  handleSubmitEvent,
}: // handleImageChange = () => {},
modalI) => {
  const handleCloseModal = useCloseModal();
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<File | any>("");
  const updateToast = useUpdateToast();

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema1),
  });

  // Start date
  const [start, setStart] = useState(new Date());

  // Start date
  const [end, setEnd] = useState(new Date());

  const handleStartChange = (value: any) => {
    setStart(value);
  };

  const handleEndChange = (value: any) => {
    setEnd(value);
  };

  const toIsoStringDate = (dateString: string | Date) => {
    const dateObject = new Date(dateString);
    const isoDateString = dateObject?.toISOString();

    return isoDateString;
  };

  const onSubmit = (data: any) => {
    if (img === "") {
      updateToast({
        title: "Image cannot be empty",
        info: "Please select an image!",
      });
      return;
    }

    const mediaInfo = {
      banner: img,
      title: data.eventTitle,
      location: data.location,
      short_description: data.description,
      start_date: toIsoStringDate(start),
      end_date: data.endDate !== "" && toIsoStringDate(end),
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

            {/* Start Date */}
            <label htmlFor="start" className="input-field">
              <span>Start Date</span>

              <DateTimePicker
                date={start}
                onDateChange={handleStartChange}
                minDate={new Date()}
              />
            </label>

            {/* End Date */}
            <label htmlFor="end" className="input-field">
              <span>End Date</span>

              <DateTimePicker
                date={end}
                onDateChange={handleEndChange}
                minDate={start ? start : new Date()}
              />
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

            <div className="w-full flex justify-center items-center">
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
