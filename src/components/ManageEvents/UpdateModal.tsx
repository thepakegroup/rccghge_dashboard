"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { setModalToggle } from "@/store/slice/Modal";
import { eventSchema2 } from "@/helper/schema";
import { eventI } from "@/util/interface/events";
import { DateTimePicker } from "../DateTimePicker";
import { isBefore } from "date-fns";
import useUpdateToast from "@/hooks/updateToast";

interface modalI {
  handleSubmitEvent: (mediaInfo: any) => void;
  buttonText: string;
  editItemId: number | null;
  onResetEditId: () => void;
  editItemData: eventI | null;
}

const UpdateModal = ({
  buttonText,
  handleSubmitEvent,
  editItemId,
  editItemData,
  onResetEditId,
}: modalI) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema2),
  });

  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  const handleCloseModal = () => {
    dispatch(setModalToggle({ isModalOpen: !isModalOpen }));
    onResetEditId();
    dispatch(setMediaFile(null));
    dispatch(setFileName(""));
  };

  const [img, setImg] = useState<File | any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // Start date
  const [start, setStart] = useState<Date | null>(null);

  // Start date
  const [end, setEnd] = useState<Date | null>(null);

  const handleStartChange = (value: any) => {
    setStart(value);
  };

  const handleEndChange = (value: any) => {
    setEnd(value);
  };

  // convert to ISO
  const toIsoStringDate = (dateString: string | Date | null) => {
    const dateObject = new Date(dateString as string);
    const isoDateString = dateObject?.toISOString();
    return isoDateString;
  };

  // onSubmit Form
  const onSubmit = (data: any) => {
    if (isBefore(end as Date, start as Date)) {
      updateToast({
        title: `Date Error`,
        type: "error",
        info: `Your end date cannot be before the start date!`,
      });
      return;
    }

    const mediaInfo = {
      banner: img,
      title: data.eventTitle,
      location: data.location,
      short_description: data.description,
      start_date: toIsoStringDate(start && start),
      end_date: data.endDate !== "" && toIsoStringDate(end && end),
    };

    handleSubmitEvent(mediaInfo);
    handleCloseModal();
  };

  useEffect(() => {
    dispatch(setMediaFile(null));

    if (editItemData) {
      setStart(new Date(editItemData.start_date));
      setEnd(new Date(editItemData.end_date));
    }

    // dispatch(setFileName(''));
  }, [dispatch, editItemData]);

  return (
    <>
      {isModalOpen && (
        <div onClick={handleCloseModal} className="modal-wrapper ">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-red w-full max-w-[467px] "
          >
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
                      defaultValue={editItemData?.title}
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
                      defaultValue={editItemData?.location}
                      {...register("location")}
                      className="input"
                    />
                    <p className="text-xs text-red-600">
                      {errors.location?.message}
                    </p>
                  </label>

                  <label htmlFor="type" className="input-field">
                    <span>Short Description</span>
                    <textarea
                      id="type"
                      rows={10}
                      {...register("description")}
                      defaultValue={editItemData?.short_description}
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
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
