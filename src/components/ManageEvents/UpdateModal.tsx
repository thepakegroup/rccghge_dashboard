"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { setModalToggle } from "@/store/slice/Modal";
import { eventSchema2 } from "@/helper/schema";
import { eventI } from "@/util/interface/events";
import { format } from "date-fns";

interface modalI {
  handleSubmitEvent: (mediaInfo: any) => void;
  buttonText: string;
  editItemId: number | null;
  onResetEditId: () => void;
  // handleImageChange: (file: File) => void;
  editItemData: eventI | null;
}

const UpdateModal = ({
  buttonText,
  handleSubmitEvent,
  editItemId,
  // handleImageChange = () => {},
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

  const toIsoStringDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const isoDateString = dateObject?.toISOString();
    return isoDateString;
  };

  const onSubmit = (data: any) => {
    const mediaInfo = {
      banner: img,
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
                  <label htmlFor="start" className="input-field">
                    <span>Start Date</span>
                    <input
                      type="date"
                      id="start"
                      defaultValue={editItemData?.start_date}
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
                      defaultValue={editItemData?.end_date}
                      {...register("endDate")}
                      className="input"
                    />
                    <p className="text-xs text-red-600">
                      {errors.endDate?.message}
                    </p>
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

                  <div className="">
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
