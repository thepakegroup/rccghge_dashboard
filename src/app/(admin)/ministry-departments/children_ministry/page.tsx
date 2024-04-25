"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { GoBack } from "@/components/ministry-departments/go-back";
import { get } from "@/helper/apiFetch";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ChildrenMinistryPage = () => {
  // states
  const [selectedBgImages, setSelectedBgImages] = useState<any>([]);
  const [bgImgPreview, setBgImgPreview] = useState<any>([]);
  const [slidersSelected, setSlidersSelected] = useState<any>([]);
  const [slidersPreview, setSlidersPreview] = useState<any>([]);
  //
  const [editing, setEditing] = useState<boolean>(false);

  // get the children ministry data
  const { data: children_ministry, isLoading: loadingChildrenInfo } = useQuery({
    queryKey: ["children_ministry"],
    queryFn: async () => {
      const res = await get(`/ministry-page/children-page`);
      const bgImages = res.data?.data.sliders.map((url: any) => url?.item_url);
      const carousels = res.data?.data.carousel.map(
        (url: any) => url?.item_url
      );
      setSlidersPreview(carousels);
      setBgImgPreview(bgImages);
      return res.data;
    },
    select: (data) => data.data,
    staleTime: 3000,
  });

  // handles bg image drop upload
  const handleBgImageDrop = (files: FileList) => {
    setBgImgPreview([]);
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setBgImgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSelectedBgImages([...fileArray]);
  };
  // handle bg image upload
  const uploadBgImage = (event: any) => {
    setBgImgPreview([]);
    const files = event.target.files;
    if (!files) {
      return setBgImgPreview(
        children_ministry?.sliders.map((url: any) => url.item_url)
      );
    }
    const fileArray = Array.from(files);
    console.log(fileArray);
    fileArray.forEach((file: any) => {
      setBgImgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSelectedBgImages([...fileArray]);
  };
  // handles sliders image drop upload
  const handleSliderDrop = (files: FileList) => {
    setSlidersPreview([]);
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setSlidersPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSlidersSelected([...fileArray]);
  };
  // handle sliders image upload
  const uploadSliderImage = (event: any) => {
    setSlidersPreview([]);
    const files = event.target.files;
    if (!files) {
      return setSlidersPreview(
        children_ministry?.carousel.map((url: any) => url.item_url)
      );
    }
    const fileArray = Array.from(files);
    console.log(fileArray);
    fileArray.forEach((file: any) => {
      setSlidersPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSlidersSelected([...fileArray]);
  };

  // form config
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      heading_text: children_ministry?.settings?.settings?.heading_text,
      heading_description:
        children_ministry?.settings?.settings?.heading_description,
      body: {
        title: children_ministry?.settings?.settings?.body?.title,
        content: children_ministry?.settings?.settings?.body?.content,
      },
      subheading_text: children_ministry?.settings?.settings?.subheading_text,
    },
  });
  //
  // edit page function
  const editPage = async (data: any) => {
    setEditing(true);
    try {
      const formData = new FormData();
      formData.append("heading_text", data.heading_text);
      formData.append("heading_description", data.heading_description);
      formData.append("body_title", data.body.title);
      formData.append("body_content", data.body.content);
      if (selectedBgImages.length > 0) {
        selectedBgImages.forEach((file: any) => {
          formData.append("background_images", file);
        });
      }
      if (slidersSelected.length > 0) {
        slidersSelected.forEach((file: any) => {
          formData.append("carousel_images", file);
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  };

  //
  return (
    <div className="px-4 mb-8">
      <GoBack header="Children Ministry" />
      {/*  */}
      <div className="mt-8">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Manage header content
        </h3>
        {/* form */}
        {children_ministry && (
          <form
            className="mt-5 flex flex-col gap-3"
            onSubmit={handleSubmit(editPage)}
          >
            {/* Image input */}
            <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
              <h4 className="font-play-fair-display font-semibold mb-3">
                Add Background Image
              </h4>
              <label
                className="flex flex-col gap-1 cursor-pointer justify-center items-center"
                htmlFor="bg_image"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleBgImageDrop(e.dataTransfer.files);
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="bg_image"
                  multiple
                  onChange={uploadBgImage}
                />
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
              <div className="flex flex-wrap items-center gap-2 mt-2 justify-center mb-3">
                {bgImgPreview?.map((url: any) => (
                  <div key={url} className="w-[150px] h-[90px]">
                    <Image
                      src={url}
                      alt={url}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Header text */}
            <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
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
              <label
                className="flex flex-col gap-1"
                htmlFor="heading_description"
              >
                <h4 className="font-play-fair-display font-semibold">
                  Heading description
                </h4>
                <textarea
                  id="heading_description"
                  rows={5}
                  className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                  {...register("heading_description", { required: true })}
                />
              </label>
            </div>
            {/* Sub Header text */}
            <div className="flex flex-col gap-2">
              <h4 className="font-play-fair-display font-semibold mb-3">
                Sub-header content
              </h4>
              <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
                <label className="flex flex-col gap-1" htmlFor="subHeaderText">
                  <h4 className="font-play-fair-display font-semibold mb-3">
                    Main Content
                  </h4>
                  <textarea
                    id="subHeaderText"
                    className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                    {...register("subheading_text", { required: true })}
                    rows={4}
                  />
                </label>
              </div>
            </div>
            {/* Body texts */}
            <div>
              <h3 className="font-play-fair-display font-semibold text-lg mb-1">
                Body content
              </h3>
              <div className="flex flex-col gap-4 rounded-lg p-4 bg-white">
                <label className="flex flex-col gap-1" htmlFor="bodyTitle">
                  <h4 className="font-play-fair-display font-semibold">
                    Title
                  </h4>
                  <input
                    id="bodyTitle"
                    type="text"
                    className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                    {...register("body.title", { required: true })}
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
                    {...register("body.content", { required: true })}
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
              <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
                <h4 className="font-play-fair-display font-semibold mb-1">
                  Add Image
                </h4>
                <label
                  className="flex flex-col gap-1 cursor-pointer justify-center items-center"
                  htmlFor="img_carousel"
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleSliderDrop(e.dataTransfer.files);
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="img_carousel"
                    onChange={uploadSliderImage}
                    multiple
                  />
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
                <div className="flex flex-wrap items-center gap-2 mt-2 justify-center mb-3">
                  {slidersPreview?.map((url: any) => (
                    <div key={url} className="w-[150px] h-[90px]">
                      <Image
                        src={url}
                        alt={url}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              icon={editing ? <BtnLoader /> : null}
              disabled={editing}
              label={editing ? "Updating" : "Update page settings"}
              type="submit"
              className="self-start py-3"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ChildrenMinistryPage;
