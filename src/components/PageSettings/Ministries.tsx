"use client";

import { MinistriesSchema, landingPageSchema } from "@/helper/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../ImageUpload";
import useUpdateToast from "@/hooks/updateToast";
import { useFetchData } from "@/hooks/fetchData";
import { IAmNewPage } from "@/util/interface/settings";
import { post } from "@/helper/apiFetch";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";

const Ministries = () => {
  const formData = new FormData();
  const updateToast = useUpdateToast();

  const [img, setImg] = useState<File | any>("");
  const [loading, setLoading] = useState(false);

  // get all social connect
  const {
    data,
    loading: page_loading,
    fetchData,
  } = useFetchData({
    url: `page-setting/info?name=our_ministry`,
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
    resolver: yupResolver(MinistriesSchema),
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

  const onMinistriesSubmit: SubmitHandler<{
    header_text: string;
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
    img && formData.append("image_slides", img as Blob, img.name as string);

    try {
      const res = await post(
        `page-setting/our-ministry-page`,
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
    <div className="flex flex-col gap-[35px]">
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
        onSubmit={handleSubmit(onMinistriesSubmit)}
        className="flex flex-col gap-[35px]"
      >
        {/* text */}
        <div className="bg-white rounded-[10px] p-6 flex flex-col gap-7">
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

        {/* select options */}
        {/* <div className="bg-white rounded-[10px] p-6 flex flex-col gap-7">
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
        </div> */}
        <div className="flex items-center gap-6">
          <button
            type="submit"
            className={`bg-[#E77400] h-[55px] py-[10px] px-10 w-fit text-white rounded-md ${
              loading && "animate-pulse"
            }`}
          >
            {loading ? "Updating..." : "Update Page Settings"}
          </button>
          <Link href="/page_settings/ministry-subpage-settings">
            <button
              disabled={loading}
              type="button"
              className={`bg-transparent border border-orange h-[55px] py-[10px] px-10 w-fit text-[#101928] rounded-md`}
            >
              Manage sub pages
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Ministries;
