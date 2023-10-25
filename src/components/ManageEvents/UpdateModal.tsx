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
import Datepicker from "react-tailwindcss-datepicker";

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
  const [start, setStart] = useState({
    startDate: null,
    endDate: null,
  });

  // Start date
  const [end, setEnd] = useState({
    startDate: null,
    endDate: null,
  });

  // Check in order to display prev date data
  const refStart = useMemo(() => start, []);
  const refEnd = useMemo(() => end, []);

  const handleStartChange = (value: any) => {
    setStart(value);
  };

  const handleEndChange = (value: any) => {
    setEnd(value);
  };

  // convert to ISO
  const toIsoStringDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const isoDateString = dateObject?.toISOString();
    return isoDateString;
  };

  // onSubmit Form
  const onSubmit = (data: any) => {
    let selectedStartDate =
      start.startDate ||
      new Date(editItemData?.start_date as string).toDateString();
    let selectedEndDate =
      end.endDate || new Date(editItemData?.end_date as string).toDateString();

    const mediaInfo = {
      banner: img,
      title: data.eventTitle,
      location: data.location,
      short_description: data.description,
      start_date: toIsoStringDate(selectedStartDate),
      end_date: data.endDate !== "" && toIsoStringDate(selectedEndDate),
    };
    handleSubmitEvent(mediaInfo);
    handleCloseModal();
  };

  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    dispatch(setMediaFile(null));

    start === refStart ? setIsStart(true) : setIsStart(false);
    end === refEnd ? setIsEnd(true) : setIsEnd(false);
    // dispatch(setFileName(''));
  }, [dispatch, editItemData, refStart, start, refEnd, end]);

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

                    <Datepicker
                      value={
                        isStart
                          ? {
                              startDate: new Date(
                                editItemData?.start_date as string
                              ),
                              endDate: new Date(
                                editItemData?.start_date as string
                              ),
                            }
                          : start
                      }
                      onChange={handleStartChange}
                      asSingle={true}
                      useRange={false}
                      popoverDirection="down"
                      inputClassName="bg-transparent text-black outline-none focus:outline-none p-4  rounded-md border text-base placeholder:text-sm w-full"
                    />
                  </label>

                  {/* End Date */}
                  <label htmlFor="end" className="input-field">
                    <span>End Date</span>

                    <Datepicker
                      value={
                        isEnd
                          ? {
                              startDate: new Date(
                                editItemData?.end_date as string
                              ),
                              endDate: new Date(
                                editItemData?.end_date as string
                              ),
                            }
                          : end
                      }
                      onChange={handleEndChange}
                      asSingle={true}
                      useRange={false}
                      popoverDirection="down"
                      inputClassName="bg-transparent text-black outline-none focus:outline-none p-4  rounded-md border text-base placeholder:text-sm w-full"
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
