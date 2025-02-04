"use client";

import { MultipleImageUploader } from "@/components/MultipleFilesUploader";
import { post } from "@/helper/apiFetch";
import { landingPageSchema } from "@/helper/schema";
import { useFetchData } from "@/hooks/fetchData";
import useUpdateToast from "@/hooks/updateToast";
import { IAmNewPage } from "@/util/interface/settings";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ConfirmDeleteImage from "./ConfirmDeleteImage";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { formats, modules } from "../quill-config/confiig";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { GiveSectionEdits } from "./give_section_edits";
import { MotionPresence } from "@/util/motion-exports";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

const LandingPage = () => {
  const formData = new FormData();
  const updateToast = useUpdateToast();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [give_bg, setGiveBg] = useState<any>(null);
  const [give_bg_prev, setGiveBgPrev] = useState<string>("");
  const [give_subheading, setGiveSubheading] = useState<string>("");
  const [give_header_text, setGiveHeaderText] = useState<string>("");
  const [showGiveEdit, setShowGiveEdit] = useState<boolean>(false);

  // get all social connect
  const {
    data,
    loading: page_loading,
    fetchData,
  } = useFetchData({
    url: `page-setting/info?name=landing_page`,
    method: "client",
  });

  const page_data: IAmNewPage = data?.data;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(landingPageSchema),
  });

  useEffect(() => {
    fetchData();

    setValue("header_text", page_data?.settings?.settings?.heading_text);
    setValue(
      "service_times",
      page_data?.settings?.settings?.our_service_times === "true" ? true : false
    );
    setValue(
      "mission_vision",
      page_data?.settings?.settings?.our_mission_vision === "true"
        ? true
        : false
    );
    setValue(
      "ministries",
      page_data?.settings?.settings?.our_ministries === "true" ? true : false
    );
    setValue(
      "events",
      page_data?.settings?.settings?.our_upcoming_events === "true"
        ? true
        : false
    );
  }, [
    page_data?.settings?.settings?.heading_text,
    page_data?.settings?.settings?.our_service_times,
    page_data?.settings?.settings?.our_upcoming_events,
    page_data?.settings?.settings?.our_ministries,
    page_data?.settings?.settings?.our_mission_vision,
  ]);

  useEffect(() => {
    setGiveBgPrev(page_data?.settings?.settings?.give_section?.give_bg_image);
    setGiveHeaderText(
      page_data?.settings?.settings?.give_section?.give_header_text
    );
    setGiveSubheading(
      page_data?.settings?.settings?.give_section?.give_subheading
    );
  }, [
    page_data?.settings?.settings?.give_section?.give_bg_image,
    page_data?.settings?.settings?.give_section?.give_header_text,
    page_data?.settings?.settings?.give_section?.give_subheading,
  ]);

  //
  const uploadGiveBg = (event: any) => {
    const file = event.target.files[0];
    setGiveBgPrev(page_data?.settings?.settings?.give_section?.give_bg_image);
    setGiveBg(null);
    if (file) {
      setGiveBg(file);
      setGiveBgPrev(URL.createObjectURL(file));
    }
  };
  //

  const onLandingPageSubmit: SubmitHandler<{
    header_text: any;
    service_times: boolean;
    events: boolean;
    mission_vision: boolean;
    ministries: boolean;
  }> = async (data) => {
    setLoading(true);

    formData.append("our_upcoming_events", data?.events ? "true" : "false");
    formData.append(
      "our_service_times",
      data?.service_times ? "true" : "false"
    );
    formData.append("our_ministries", data?.ministries ? "true" : "false");
    formData.append(
      "our_mission_vision",
      data?.mission_vision ? "true" : "false"
    );
    formData.append("heading_text", data?.header_text);

    files.forEach((file) => {
      formData.append("image_slides", file, file.name);
    });

    if (give_bg) formData.append("give_bg", give_bg);
    formData.append("give_header_text", give_header_text);
    formData.append("give_subheading", give_subheading);

    try {
      const res = await post(
        `page-setting/landing-page`,
        formData,
        "multipart/form-data"
      );

      updateToast({
        title: `${"Setting updated successfully."}`,
      });

      setLoading(false);
      setFiles([]);
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
    <div className="flex flex-col gap-[35px]">
      <h1 className="text-lg font-semibold text-[#030229]">
        Manage Header Content
      </h1>

      {/* images */}
      <div className="bg-white rounded-[10px] p-6">
        <h3 className="text-lg font-medium text-[#030229]">
          Add carousel images
        </h3>

        <div className="flex flex-col gap-3 items-center">
          <div className="md:max-w-[60%] mx-auto">
            <MultipleImageUploader files={files} setFiles={setFiles} />
          </div>
          <div className="flex flex-wrap gap-2 w-full">
            {page_data?.slides &&
              page_data?.slides?.map((img) => (
                <div key={img?.id} className=" relative max-h-[225px]">
                  <Image
                    src={img?.image_url}
                    alt=""
                    width={305}
                    height={225}
                    className="rounded-[10px] !w-full max-w-[305px] !h-[225px]"
                  />
                  <button
                    onClick={() => {
                      setSelectedImageId(img?.id);
                      setShowDelete(true);
                    }}
                    className="absolute top-2 right-2 p-1  bg-white cursor-pointer rounded"
                  >
                    <Image
                      src="icons/delete.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onLandingPageSubmit)}
        className="flex flex-col gap-[35px]"
      >
        {/* text */}
        {page_loading && (
          <div className="h-[300px] bg-zinc-300 animate-pulse rounded-md" />
        )}
        {data && (
          <div className="bg-white rounded-[10px] p-6 flex flex-col gap-7">
            <h3 className="text-lg font-medium text-[#030229]">Header Text</h3>

            <label htmlFor="">
              {/* <input
              {...register("header_text")}
              type="text"
              className="w-full border-[#D1D1D1] outline-none border rounded-[5px]"
            /> */}
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                defaultValue={data?.data?.settings?.settings?.heading_text}
                onChange={(value) => {
                  setValue("header_text", value);
                }}
              />
              <p className="text-xs text-red-600">
                {errors.header_text?.message}
              </p>
            </label>
          </div>
        )}

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
            <label
              htmlFor="mission_vision"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register("mission_vision")}
                id="mission_vision"
                className="border-[#D1D1D1] outline-none border rounded-[2px] cursor-pointer focus:ring-0 text-[#E77400]"
              />
              Our mission & vision
            </label>
            <label
              htmlFor="ministries"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register("ministries")}
                id="ministries"
                className="border-[#D1D1D1] outline-none border rounded-[2px] cursor-pointer focus:ring-0 text-[#E77400]"
              />
              Our ministries
            </label>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center justify-between py-6 px-4 gap-4 bg-white rounded-md">
          <div>
            <h3 className="font-semibold text-lg md:text-xl">Give Section</h3>
            <small className="text-xs text-fade-ash/80">
              edit settings, save and proceed, then update page settings
            </small>
          </div>
          <p
            className="text-sm md:text-base text-orange cursor-pointer"
            onClick={() => setShowGiveEdit(true)}
          >
            Edit settings
          </p>
        </div>
        {/*  */}
        <MotionPresence>
          {showGiveEdit && (
            <GiveSectionEdits
              setGiveBg={setGiveBg}
              setGiveBgPrev={setGiveBgPrev}
              uploadGiveBg={uploadGiveBg}
              give_bg={give_bg}
              give_bg_prev={give_bg_prev}
              setShowGiveEdit={setShowGiveEdit}
              give_header_text={give_header_text}
              setGiveHeaderText={setGiveHeaderText}
              give_subheading={give_subheading}
              setGiveSubHeading={setGiveSubheading}
            />
          )}
        </MotionPresence>
        {/*  */}
        <button
          type="submit"
          className={`bg-[#E77400] py-[10px] px-10 w-fit text-white rounded-md ${
            loading && "animate-pulse"
          }`}
        >
          {loading ? "Updating..." : "Update Page Settings"}
        </button>
      </form>

      {showDelete && (
        <ConfirmDeleteImage
          onClose={() => {
            setSelectedImageId(null);
            setShowDelete(false);
          }}
          selectedImageId={selectedImageId as number}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default LandingPage;
