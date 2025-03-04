"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { DeletingImageLoader } from "@/components/ministry-departments/deleting-image-loader";
import { GoBack } from "@/components/ministry-departments/go-back";
import { PageLoader } from "@/components/ministry-departments/page-loader";
import { formats, modules } from "@/components/quill-config/confiig";
import { get, post, remove } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { CancelIcon } from "@/icons/cancel-icon";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

const WellnessMinistry = () => {
  const updateToast = useUpdateToast();
  // states
  const [selectedBgImages, setSelectedBgImages] = useState<any>([]);
  const [bgImgPreview, setBgImgPreview] = useState<any>([]);
  const [slidersSelected, setSlidersSelected] = useState<any>([]);
  const [slidersPreview, setSlidersPreview] = useState<any>([]);

  //
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  // get page info data function
  const {
    data: wellness_ministry,
    isLoading: loadingWellnessInfo,
    refetch: getBackPageInfo,
  } = useQuery({
    queryKey: ["wellness_ministry"],
    queryFn: async () => {
      const res = await get(`/ministry-page/wellness-page`);
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

  // form configs
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      heading_text: wellness_ministry?.settings?.settings?.heading_text,
      heading_description:
        wellness_ministry?.settings?.settings?.heading_description,
      body: {
        title: wellness_ministry?.settings?.settings?.body?.title,
        content: wellness_ministry?.settings?.settings?.body?.content,
      },
    },
  });
  // handles bg image drop upload
  const handleBgImageDrop = (files: FileList) => {
    setBgImgPreview(wellness_ministry?.sliders.map((url: any) => url.item_url));
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setBgImgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSelectedBgImages([...fileArray]);
  };
  // handle bg image upload
  const uploadBgImage = (event: any) => {
    setBgImgPreview(wellness_ministry?.sliders.map((url: any) => url.item_url));
    const files = event.target.files;
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setBgImgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSelectedBgImages([...fileArray]);
  };
  // handles sliders image drop upload
  const handleSliderDrop = (files: FileList) => {
    setSlidersPreview(
      wellness_ministry?.carousel.map((url: any) => url?.item_url)
    );
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setSlidersPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSlidersSelected([...fileArray]);
  };
  // handle sliders image upload
  const uploadSliderImage = (event: any) => {
    setSlidersPreview(
      wellness_ministry?.carousel.map((url: any) => url?.item_url)
    );
    const files = event.target.files;
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setSlidersPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSlidersSelected([...fileArray]);
  };

  //
  // edit page function here...
  const editPage = async (data: any) => {
    if (bgImgPreview?.length < 1) {
      updateToast({
        title: `Error`,
        type: "error",
        info: `Image field is required`,
      });
      return;
    }
    try {
      setEditing(true);
      const formData = new FormData();
      formData.append("heading_text", data.heading_text);
      formData.append("heading_description", data.heading_description);
      formData.append("body[title]", data.body.title);
      formData.append("body[content]", data.body.content);
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
      const res = await post(
        "/ministry-page/wellness/compose",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        await getBackPageInfo();
        updateToast({
          title: `Success`,
          type: "update",
          info: `${res.data?.message}`,
        });
      }
    } catch (error: any) {
      updateToast({
        title: `Error`,
        type: "error",
        info: `${error.response?.data?.message}`,
      });
    } finally {
      setEditing(false);
    }
  };
  // handle remove (delete) image
  const removeImage = async (id: number) => {
    setDeleting(true);
    try {
      const res = await remove(`/ministry-page/image/${id}`);
      if (res.statusText === "OK") {
        await getBackPageInfo();
        updateToast({
          title: `Success`,
          type: "update",
          info: `${res.data?.message}`,
        });
      }
    } catch (error: any) {
      updateToast({
        title: `Error`,
        type: "error",
        info: `${error.response?.data?.message}`,
      });
    } finally {
      setDeleting(false);
    }
  };

  //
  return (
    <section className="relative px-4 mb-8 mt-8">
      <GoBack header="HGE Wellness Ministry" />
      {/*  */}
      <div className="mt-8">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Manage header content
        </h3>
        {/* form */}
        {loadingWellnessInfo && <PageLoader />}
        {wellness_ministry && (
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
                  <div key={url} className="relative w-[150px] h-[90px]">
                    <Image
                      src={url}
                      alt={url}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div
                      className="absolute top-[5px] right-[5px] flex items-center h-[26px] w-[26px] justify-center cursor-pointer bg-black/20 backdrop-blur-sm rounded-full"
                      onClick={(event: any) => {
                        const imgId = wellness_ministry?.sliders?.find(
                          (item: any) => item.item_url === url
                        );
                        removeImage(imgId?.id);
                      }}
                    >
                      <CancelIcon />
                    </div>
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
                <input
                  id="heading_description"
                  type="text"
                  className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                  {...register("heading_description")}
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
                  <QuillEditor
                    className="write-editor"
                    formats={formats}
                    modules={modules}
                    defaultValue={
                      wellness_ministry?.settings?.settings?.body?.content
                    }
                    onChange={(event: any) => setValue("body.content", event)}
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
                    <div key={url} className="relative w-[150px] h-[90px]">
                      <Image
                        src={url}
                        alt={url}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div
                        className="absolute top-[5px] right-[5px] flex items-center h-[26px] w-[26px] justify-center cursor-pointer bg-black/20 backdrop-blur-sm rounded-full"
                        onClick={(event: any) => {
                          const imgId = wellness_ministry?.carousel?.find(
                            (item: any) => item.item_url === url
                          );
                          removeImage(imgId?.id);
                        }}
                      >
                        <CancelIcon />
                      </div>
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
      <DeletingImageLoader deleting={deleting} />
    </section>
  );
};

export default WellnessMinistry;
