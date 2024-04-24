"use client";

import { Button } from "@/components/base-components/button";
import { GoBack } from "@/components/ministry-departments/go-back";
import { get } from "@/helper/apiFetch";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const TeenageMinistryPage = () => {
  const { data: teenage_ministry, isLoading: loadingTeenageInfo } = useQuery({
    queryKey: ["teenage_ministry"],
    queryFn: async () => {
      const res = await get(`/ministry-page/teenage-page`);
      return res.data;
    },
    select: (data) => data.data,
    staleTime: 3000,
  });
  teenage_ministry && console.log(teenage_ministry);
  // form configs
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      heading_text: teenage_ministry?.settings?.settings?.heading_text,
    },
  });
  // edit page function here...
  const editPage = async (data: any) => {
    console.log(data);
  };
  //
  return (
    <div className="px-4 mb-8">
      <GoBack header="Teenage Ministry" />
      {/*  */}
      <div className="mt-8">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Manage header content
        </h3>
        {/* form */}
        <form
          className="mt-5 flex flex-col gap-3"
          onSubmit={handleSubmit(editPage)}
        >
          {/* Image input */}
          <div className="px-4 py-5 rounded-lg bg-white">
            <h4 className="font-play-fair-display font-semibold mb-3">
              Add Background Image
            </h4>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="bg_image"
            >
              <input type="file" accept="image/*" hidden id="bg_image" />
              <div className="flex flex-col gap-2 items-center border-[1.5px] border-dashed p-3 rounded-lg">
                <UploadImgIcon />
                <div className="flex items-center gap-1">
                  <p className="text-orange">Click to upload</p>
                  <p>or drag and drop</p>
                </div>
                <p className="text-xs text-fade-ash">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </label>
          </div>
          {/* Header text */}
          <div className="rounded-lg p-4 bg-white">
            <label className="flex flex-col gap-1" htmlFor="headerText">
              <h4 className="font-play-fair-display font-semibold mb-3">
                Header Text
              </h4>
              <input
                id="headerText"
                type="text"
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                {...register("heading_text", { required: true })}
              />
            </label>
          </div>
          {/* Body texts */}
          <div>
            <h3 className="font-play-fair-display font-semibold text-lg mb-1">
              Body content
            </h3>
            <div className="flex flex-col gap-4 rounded-lg p-4 bg-white">
              <label className="flex flex-col gap-1" htmlFor="bodyTitle">
                <h4 className="font-play-fair-display font-semibold">Title</h4>
                <input
                  id="bodyTitle"
                  type="text"
                  className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                />
              </label>
              {/*  */}
              <label className="flex flex-col gap-1" htmlFor="description">
                <h4 className="font-play-fair-display font-semibold">
                  Description
                </h4>
                <textarea
                  id="description"
                  className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                  rows={5}
                />
              </label>
              {/*  */}
            </div>
          </div>
          {/* Carousel Images Input */}
          <div className="flex flex-col gap-2">
            <h4 className="font-play-fair-display font-semibold mb-2 mt-3">
              Image Carousel
            </h4>
            <div className="px-4 py-5 rounded-lg bg-white">
              <h4 className="font-play-fair-display font-semibold mb-1">
                Add Image
              </h4>
              <label
                className="flex flex-col gap-1 cursor-pointer justify-center items-center"
                htmlFor="img_carousel"
              >
                <input type="file" accept="image/*" hidden id="img_carousel" />
                <div className="flex flex-col gap-2 items-center border-[1.5px] border-dashed p-3 rounded-lg">
                  <UploadImgIcon />
                  <div className="flex items-center gap-1">
                    <p className="text-orange">Click to upload</p>
                    <p>or drag and drop</p>
                  </div>
                  <p className="text-xs text-fade-ash">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </label>
            </div>
          </div>
          <Button
            label="Update page settings"
            type="submit"
            className="self-start py-3"
          />
        </form>
      </div>
    </div>
  );
};

export default TeenageMinistryPage;
