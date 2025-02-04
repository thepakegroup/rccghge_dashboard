"use client";

import { ServicesPageSchema } from "@/helper/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUpload from "../ImageUpload";
import { useFetchData } from "@/hooks/fetchData";
import { IAmNewPage } from "@/util/interface/settings";
import useUpdateToast from "@/hooks/updateToast";
import { post } from "@/helper/apiFetch";
import { AxiosError } from "axios";
import Image from "next/image";

const Services = () => {
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
    url: `page-setting/info?name=our_service`,
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
    resolver: yupResolver(ServicesPageSchema),
  });

  useEffect(() => {
    fetchData();

    setValue("header_text", page_data?.settings?.settings?.heading_text);
  }, [page_data?.settings?.settings?.heading_text]);

  const onIAmNewPageSubmit: SubmitHandler<{
    header_text: string;
  }> = async (data) => {
    setLoading(true);

    formData.append("heading_text", data?.header_text);
    img && formData.append("image_slides", img as Blob, img.name as string);

    try {
      const res = await post(
        `page-setting/service-page`,
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
            <ImageUpload handleImageChange={handleImageChange} />
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

        <button
          type="submit"
          className={`bg-[#E77400] py-[10px] px-10 w-fit text-white rounded-md ${
            loading && "animate-pulse"
          }`}
        >
          {loading ? "Updating..." : "Update Page Settings"}
        </button>
      </form>
    </div>
  );
};

export default Services;
