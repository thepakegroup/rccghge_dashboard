import React, { useState } from "react";
import ServiceInfo from "./ServiceInfo";
import { useFetchData } from "@/hooks/fetchData";
import { serviceTime } from "@/util/interface/serviceTime";
import DeleteModal from "../DeleteModal";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { convertTo12HourFormat } from "@/helper/convertTo12HrTime";
import {
  setDiscriptionService,
  setEndTime,
  setName,
  setService,
  setStartTime,
} from "@/store/slice/service";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import { AxiosError } from "axios";
import { post, remove } from "@/helper/apiFetch";
import ImageUpload from "../ImageUpload";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { formats, modules } from "../quill-config/confiig";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

const ServiceTimes = ({ currentSection }: { currentSection: string }) => {
  const type = useGetTypeOfModal();
  const updateToast = useUpdateToast();
  const dispatch = useAppDispatch();
  const formData = new FormData();

  const { id } = useAppSelector((state) => state.mediaItems);
  const { section } = useAppSelector((state) => state.content);
  const [loader, setLoader] = useState(false);
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

  const { data, loading, fetchData } = useFetchData({
    url: `service-times`,
    method: "client",
  });

  const services: serviceTime[] = data?.message;

  // Delete Service
  const deleteService = async () => {
    setLoader(true);
    try {
      const res = await remove(`service-time/${id}`);

      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
    } catch (error) {
      setLoader(false);

      updateToast({
        type: "error",
        title: "Error!",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // Update and Create Service
  const updateService = async () => {
    setLoader(true);

    if (btnType !== "edit" && !img) {
      updateToast({
        title: `Please add an image`,
        info: name,
      });
      return;
    }

    img && formData.append("image", img as Blob, img.name as string);
    formData.append("service_name", name as string);
    formData.append("service_description", description);
    // formData.append("service_description", description as string);
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
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  return (
    <div
      className={`bg-white rounded-lg py-6 px-7 md:overflow-y-scroll md:h-[34.75rem] ${
        currentSection === "service times" ? "block" : "hidden md:block"
      }`}
    >
      <h2 className="font-bold text-lg">Service time</h2>
      <form
        className="flex flex-col gap-[1.12rem] mt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full md:max-w-[60%] mx-auto">
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
              onChange={(e) => dispatch(setStartTime(e.target.value))}
              value={startTime}
              type="time"
              name="start"
              required
              className="input"
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
              className="input"
            />
          </label>
        </div>
        <label htmlFor="description" className="input-field">
          <span>Description</span>
          <QuillEditor
            className="write-editor"
            formats={formats}
            modules={modules}
            value={description}
            onChange={(event: any) => dispatch(setDiscriptionService(event))}
          />
        </label>
        <button
          onClick={updateService}
          type="submit"
          className="flex-center gap-1 p-2 capitalize rounded-md bg-[#e77400] text-white max-w-max text-sm font-semibold"
        >
          {btnType}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.8333 3.33333C10.8333 2.8731 10.4602 2.5 10 2.5C9.53976 2.5 9.16667 2.8731 9.16667 3.33333V9.16667H3.33333C2.8731 9.16667 2.5 9.53976 2.5 10C2.5 10.4602 2.8731 10.8333 3.33333 10.8333H9.16667V16.6667C9.16667 17.1269 9.53976 17.5 10 17.5C10.4602 17.5 10.8333 17.1269 10.8333 16.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H10.8333V3.33333Z"
                fill="#fff"
              />
            </svg>
          </span>
        </button>
        {loading || loader ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            {services?.map((service) => {
              return (
                <ServiceInfo
                  key={service?.id}
                  id={service?.id}
                  image={service?.image_url as string}
                  name={service?.service_name}
                  serviceTime={service?.service_period}
                  description={service?.service_description}
                />
              );
            })}
          </div>
        )}
      </form>
      {type == "delete" && section === "service times" && (
        <DeleteModal deleteFunc={deleteService} />
      )}
    </div>
  );
};

export default ServiceTimes;
