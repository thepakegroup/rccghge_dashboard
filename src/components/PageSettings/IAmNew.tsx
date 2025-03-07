"use client";

import dynamic from "next/dynamic";
import { IAmNewPageSchema } from "@/helper/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../ImageUpload";
import useUpdateToast from "@/hooks/updateToast";
import { post } from "@/helper/apiFetch";
import { AxiosError } from "axios";
import { useFetchData } from "@/hooks/fetchData";
import { IAmNewPage } from "@/util/interface/settings";
import Image from "next/image";
import { formats, modules } from "../quill-config/confiig";
import "react-quill/dist/quill.snow.css";
import { MotionPresence } from "@/util/motion-exports";
import { UploadVideoLink } from "./im-new-page-modals/upload-video-link";
import { MoreInfoContentModal } from "./im-new-page-modals/more-info-content";
import { WednesdayBibleStudyModal } from "./im-new-page-modals/wednesday-bible-study-modal";
import { SundayServicesModal } from "./im-new-page-modals/sunday-services-modal";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

const IAmNew = () => {
  const formData = new FormData();
  const updateToast = useUpdateToast();

  const [img, setImg] = useState<File | any>("");
  const [loading, setLoading] = useState(false);
  //
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [showSundayServices, setShowSundayServices] = useState<boolean>(false);
  const [showWednesdayBibleStudy, setShowWednesdayBibleStudy] =
    useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  // get all social connect
  const {
    data,
    loading: page_loading,
    fetchData,
  } = useFetchData({
    url: `page-setting/info?name=iam_new_page`,
    method: "client",
  });

  const page_data: IAmNewPage = data?.data;

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(IAmNewPageSchema),
  });

  useEffect(() => {
    fetchData();

    setValue("header_text", page_data?.settings?.settings?.heading_text);
    setValue(
      "service_times",
      page_data?.settings?.settings?.our_service_times === "true" ? true : false
    );
    setValue(
      "events",
      page_data?.settings?.settings?.our_upcoming_events === "true"
        ? true
        : false
    );
    setValue("subheading_text", page_data?.settings?.settings?.subheading_text);
    setValue(
      "subheading_description_text",
      page_data?.settings?.settings?.subheading_description_text
    );
    setValue(
      "arrivalAndParking",
      page_data?.settings?.settings?.arrivalAndParking
    );
    setValue(
      "worshipExperience",
      page_data?.settings?.settings?.worshipExperience
    );
  }, [
    page_data?.settings?.settings?.heading_text,
    page_data?.settings?.settings?.our_service_times,
    page_data?.settings?.settings?.our_upcoming_events,
    page_data?.settings?.settings?.subheading_text,
    page_data?.settings?.settings?.arrivalAndParking,
    page_data?.settings?.settings?.worshipExperience,
    page_data?.settings?.settings?.subheading_description_text,
  ]);

  const onIAmNewPageSubmit: SubmitHandler<{
    header_text: string;
    service_times: boolean;
    events: boolean;
    subheading_text: string;
    subheading_description_text?: any;
    arrivalAndParking?: any;
    worshipExperience?: any;
  }> = async (data) => {
    setLoading(true);

    formData.append("our_upcoming_events", data?.events ? "true" : "false");
    formData.append(
      "our_service_times",
      data?.service_times ? "true" : "false"
    );
    formData.append("subheading_text", data?.subheading_text);
    formData.append(
      "subheading_description_text",
      data?.subheading_description_text
    );
    formData.append("arrivalAndParking", data?.arrivalAndParking);
    formData.append("worshipExperience", data?.worshipExperience);
    formData.append("heading_text", data?.header_text);
    img && formData.append("image_slides", img as Blob, img.name as string);

    try {
      const res = await post(
        `page-setting/iam-new-page`,
        formData,
        "multipart/form-data"
      );

      updateToast({
        title: `${"Setting updated successfully."}`,
      });

      setLoading(false);
      fetchData();
    } catch (error) {
      setLoading(false);

      updateToast({
        title: `Error! Settings not updated.`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  return (
    <div className="relative flex flex-col gap-[35px]">
      <h1 className="text-lg font-semibold text-[#030229]">
        Manage Header Content
      </h1>

      {/* images */}
      <div className="bg-white rounded-[10px] p-6">
        <h3 className="text-lg font-medium text-[#030229]">
          Add background image
        </h3>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="w-full md:max-w-[60%] mx-auto">
            <ImageUpload isPage handleImageChange={handleImageChange} />
          </div>
          {page_data?.slides?.[0]?.image_url && (
            <div className="md:max-w-[30%] relative max-h-[225px]">
              <Image
                src={page_data?.slides?.[0]?.image_url}
                alt=""
                width={305}
                height={225}
                className="rounded-[10px] !w-full !h-[225px]"
              />
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onIAmNewPageSubmit)}
        className="flex flex-col gap-[35px]"
      >
        {/* text */}
        <div className="bg-white rounded-[10px] p-6 flex flex-col gap-2">
          <h3 className="text-lg font-medium text-[#030229]">Header Text</h3>

          <label htmlFor="">
            <input
              {...register("header_text")}
              type="text"
              className="w-full border-[#D1D1D1] outline-none border rounded-[5px]"
            />
            <p className="text-xs text-red-600">
              {errors.header_text?.message}
            </p>
          </label>
        </div>
        {/* sub header */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Sub-header content</h2>
          <div className="bg-white rounded-[10px] p-6 flex flex-col gap-2">
            <h3 className="text-lg font-medium text-[#030229]">Header Text</h3>

            <label htmlFor="">
              <input
                {...register("subheading_text")}
                type="text"
                className="w-full border-[#D1D1D1] outline-none border rounded-[5px]"
              />
              <p className="text-xs text-red-600">
                {errors.header_text?.message}
              </p>
            </label>
            {/*  */}
            <label className="flex flex-col gap-1" htmlFor="">
              <h4 className="text-lg font-medium text-[#030229]">
                Description
              </h4>
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                value={
                  page_data?.settings?.settings?.subheading_description_text
                }
                onChange={(event: any) =>
                  setValue("subheading_description_text", event)
                }
              />
            </label>
            {/*  */}
          </div>
        </div>
        {/* modal sections */}
        {/* page video link */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Page video and link</h2>
          <div className="flex justify-between items-center gap-4 bg-white rounded-[10px] p-6">
            <h3 className="font-semibold">Upload video link</h3>
            <p
              className="cursor-pointer text-orange"
              onClick={() => setShowLinkModal(true)}
            >
              Edit details
            </p>
          </div>
        </div>
        {/* services content */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Services content</h2>
          <div className="flex justify-between items-center gap-4 bg-white rounded-[10px] p-6">
            <h3 className="font-semibold">Sunday services</h3>
            <p
              className="cursor-pointer text-orange"
              onClick={() => setShowSundayServices(true)}
            >
              Edit details
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 bg-white rounded-[10px] p-6">
            <h3 className="font-semibold">Wednesday bible study</h3>
            <p
              className="cursor-pointer text-orange"
              onClick={() => setShowWednesdayBibleStudy(true)}
            >
              Edit details
            </p>
          </div>
        </div>
        {/* More information */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">More information</h2>
          <div className="flex justify-between items-center gap-4 bg-white rounded-[10px] p-6">
            <h3 className="font-semibold">Edit content</h3>
            <p
              className="cursor-pointer text-orange"
              onClick={() => setShowMoreInfo(true)}
            >
              Edit details
            </p>
          </div>
        </div>
        {/* Plan your visit content */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Plan your visit content</h2>
          <div className="flex justify-between flex-wrap md:flex-nowrap items-center gap-4 bg-white rounded-[10px] p-6">
            <label htmlFor="">
              <h3 className="font-semibold">Arrival and parking</h3>
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                value={page_data?.settings?.settings?.arrivalAndParking}
                onChange={(event: any) => setValue("arrivalAndParking", event)}
              />
            </label>
            {/*  */}
            {/* commented off worship experience */}
            {/* <label htmlFor="">
              <h3 className="font-semibold">The worship experience</h3>
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                value={page_data?.settings?.settings?.worshipExperience}
                onChange={(event: any) => setValue("worshipExperience", event)}
              />
            </label> */}
            {/*  */}
          </div>
        </div>
        {/* End of modal sections */}
        {/* select options */}
        <div className="bg-white rounded-[10px] p-6 flex flex-col gap-7">
          <h3 className="text-lg font-medium text-[#030229]">
            Cards display selection
          </h3>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="service_times"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register("service_times")}
                id="service_times"
                className="border-[#D1D1D1] outline-none border rounded-[2px] cursor-pointer focus:ring-0 text-[#E77400]"
              />
              Our service times
            </label>
            <label
              htmlFor="events"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register("events")}
                id="events"
                className="border-[#D1D1D1] outline-none border rounded-[2px] cursor-pointer focus:ring-0 text-[#E77400]"
              />
              Our upcoming events
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`bg-[#E77400] py-[10px] px-10 w-fit text-white rounded-md ${
            loading && "animate-pulse"
          }`}
          onClick={() => onIAmNewPageSubmit}
        >
          {loading ? "Updating..." : "Update Page Settings"}
        </button>
      </form>
      {/* modals */}
      <MotionPresence>
        {page_data && showLinkModal && (
          <UploadVideoLink
            setShowLinkModal={setShowLinkModal}
            data={page_data?.settings?.settings?.pageVideoLink}
            getPageData={fetchData}
            toast={updateToast}
          />
        )}
        {page_data && showMoreInfo && (
          <MoreInfoContentModal
            setShowMoreInfo={setShowMoreInfo}
            data={page_data?.settings?.settings?.blueBannerContent}
            getPageData={fetchData}
            toast={updateToast}
          />
        )}
        {page_data && showWednesdayBibleStudy && (
          <WednesdayBibleStudyModal
            setShowModal={setShowWednesdayBibleStudy}
            data={page_data?.settings?.settings?.wednesdayBibleStudy}
            getPageData={fetchData}
            toast={updateToast}
          />
        )}
        {page_data && showSundayServices && (
          <SundayServicesModal
            setShowModal={setShowSundayServices}
            toast={updateToast}
            getPageData={fetchData}
            data={page_data?.settings?.settings?.sundayServices}
          />
        )}
      </MotionPresence>
    </div>
  );
};

export default IAmNew;
