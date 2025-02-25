"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import {
  setDiscriptionService,
  setEndTime,
  setName,
  setService,
  setStartTime,
} from "@/store/slice/service";
import useCloseModal from "@/hooks/closeModal";
import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import useUpdateToast from "@/hooks/updateToast";
import { post } from "@/helper/apiFetch";
import { convertTo12HourFormat } from "@/helper/convertTo12HrTime";
import { AxiosError } from "axios";
import { formats, modules } from "../quill-config/confiig";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import clsx from "clsx";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

interface modalI {
  fetchData: () => void;
}

const ModifyServiceModal = ({ fetchData }: modalI) => {
  const handleCloseModal = useCloseModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const [loader, setLoader] = useState(false);
  const formData = new FormData();

  const [img, setImg] = useState<File | any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  const {
    name,
    startTime,
    endTime,
    description,
    btnType,
    id: editId,
  } = useAppSelector((state) => state.service);

  // Update and Create Service
  const updateService = async () => {
    if ((!name || !description) && btnType !== "edit") {
      updateToast({
        title: `Please fill in all fields`,
        info: name,
      });
      return;
    }

    if (btnType !== "edit" && !img) {
      updateToast({
        title: `Please add an image`,
        info: name,
      });
      return;
    }

    setLoader(true);

    img && formData.append("image", img as Blob, img.name as string);
    formData.append("service_name", name as string);
    formData.append("service_description", description);
    formData.append(
      "service_period",
      `${convertTo12HourFormat(startTime as string)} ${convertTo12HourFormat(
        endTime as string
      )}`
    );
    btnType === "edit" &&
      editId !== undefined &&
      formData.append("id", editId as unknown as string);

    try {
      const res = await post(
        `${
          btnType === "edit" ? `update-service-times` : `create-service-time`
        }`,
        formData,
        "multipart/form-data"
      );

      fetchData();
      updateToast({
        title: `Service time ${btnType === "edit" ? "updated" : "added!"}`,
        info: name,
      });

      setLoader(false);

      setImg("");
      dispatch(
        setService({
          name: "",
          startTime: "",
          endTime: "",
          description: "",
          btnType: "add",
          id: null,
        })
      );
      handleCloseModal();
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
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

          <form
            className="flex flex-col gap-[1.12rem] mt-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-full  mx-auto">
              <ImageUpload handleImageChange={handleImageChange} />
            </div>

            <label htmlFor="title" className="input-field">
              <span>Servic name</span>
              <input
                onChange={(e) => dispatch(setName(e.target.value))}
                value={name}
                type="text"
                name="location"
                className="input"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label htmlFor="start" className="input-field">
                <span>Start time</span>
                <input
                  onChange={(e) => {
                    dispatch(setStartTime(e.target.value));
                  }}
                  value={startTime}
                  type="time"
                  name="start"
                  required
                  className="input cursor-pointer"
                />
              </label>
              <label htmlFor="end" className="input-field">
                <span>End Time</span>
                <input
                  onChange={(e) => dispatch(setEndTime(e.target.value))}
                  value={endTime}
                  type="time"
                  name="end"
                  required
                  className="input cursor-pointer"
                />
              </label>
            </div>
            <label htmlFor="description" className="input-field">
              <span>Description</span>
              <QuillEditor
                className="write-editor !w-full !max-w-full"
                formats={formats}
                modules={modules}
                value={description}
                onChange={(event: any) =>
                  dispatch(setDiscriptionService(event))
                }
              />
            </label>
            <button
              onClick={updateService}
              type="submit"
              className={clsx(
                "px-4 mx-auto py-2 capitalize rounded-md bg-[#e77400] text-white text-sm font-semibold",
                loader && "animate-pulse"
              )}
            >
              {btnType} service times
            </button>
          </form>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModifyServiceModal;
