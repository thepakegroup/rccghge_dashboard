"use client";

import { MultipleImageUploader } from "@/components/MultipleFilesUploader";
import { landingPageSchema } from "@/helper/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LandingPage = () => {
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(landingPageSchema),
  });

  const onLandingPageSubmit: SubmitHandler<{
    header_text: string;
    service_times: boolean;
    events: boolean;
    mission_vision: boolean;
    ministries: boolean;
  }> = (data) => {
    console.log(files);
    console.log(data);
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

        <div className="md:max-w-[60%] mx-auto">
          <MultipleImageUploader files={files} setFiles={setFiles} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onLandingPageSubmit)}
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

        <button
          type="submit"
          className="bg-[#E77400] py-[10px] px-10 w-fit text-white rounded-md"
        >
          Update Page Settings
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
