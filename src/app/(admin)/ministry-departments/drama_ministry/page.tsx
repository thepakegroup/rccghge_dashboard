"use client";
import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import ImageUpload from "@/components/ImageUpload";
import { DeletingImageLoader } from "@/components/ministry-departments/deleting-image-loader";
import { GoBack } from "@/components/ministry-departments/go-back";
import { PageLoader } from "@/components/ministry-departments/page-loader";
import { MultipleImageUploader } from "@/components/MultipleFilesUploader";
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

const DramaMinistryPage = () => {
  const updateToast = useUpdateToast();
  // states
  // const [bgImages, setBgImages] = useState<File[]>([]);
  const [sliderImages, setSliderImages] = useState<File[]>([]);
  // const [bgImgPreview, setBgImgPreview] = useState<any>([]);
  const [slidersPreview, setSlidersPreview] = useState<any>([]);
  //
  const [bgImage, setBgImage] = useState<File | any>("");
  const [bgPreview, setBgPreview] = useState<string>("");
  const handleImageChange = (file: File) => {
    setBgImage(file);
  };

  //
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  // get page data info
  const {
    data: drama_ministry,
    isLoading: loadingDramaInfo,
    refetch: getBackPageInfo,
  } = useQuery({
    queryKey: ["drama_ministry"],
    queryFn: async () => {
      const res = await get(`/ministry-page/drama-page`);
      // const bgImages = res.data?.data.sliders.map((url: any) => url?.item_url);
      setBgPreview(res.data?.data.sliders[0]?.item_url);
      const carousels = res.data?.data.carousel.map(
        (url: any) => url?.item_url
      );
      setSlidersPreview(carousels);
      // setBgImgPreview(bgImages);
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
      heading_text: drama_ministry?.settings?.settings?.heading_text,
      heading_description:
        drama_ministry?.settings?.settings?.heading_description,
      body: {
        title: drama_ministry?.settings?.settings?.body?.title,
        content: drama_ministry?.settings?.settings?.body?.content,
      },
    },
  });

  //
  // edit page function here...
  const editPage = async (data: any) => {
    // if (bgImgPreview?.length < 1 && bgImages?.length < 1) {
    //   updateToast({
    //     title: `Error`,
    //     type: "error",
    //     info: `Hero  Bg Image field is required`,
    //   });
    //   return;
    // }
    if (!bgPreview && !bgImage) {
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
      if (bgImage) formData.append("background_images", bgImage);
      // bgImages.forEach((file: any) => {
      //   formData.append("background_images", file);
      // });

      sliderImages.forEach((file: any) => {
        formData.append("carousel_images", file);
      });

      const res = await post(
        "/ministry-page/drama/compose",
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
      <GoBack header="Drama Ministry" />
      {/*  */}
      <div className="mt-8">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Manage header content
        </h3>
        {/* form */}
        {loadingDramaInfo && <PageLoader />}
        {drama_ministry && (
          <form
            className="mt-5 flex flex-col gap-3"
            onSubmit={handleSubmit(editPage)}
          >
            {/* Image input */}
            <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
              <h4 className="font-play-fair-display font-semibold mb-3">
                Add Background Image
              </h4>
              <div className="md:max-w-[60%] mx-auto">
                {/* <MultipleImageUploader
                  isPage
                  files={bgImages}
                  setFiles={setBgImages}
                /> */}
                <ImageUpload isPage handleImageChange={handleImageChange} />
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 justify-center mb-3">
                {/* {bgImgPreview?.map((url: any) => (
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
                        const imgId = children_ministry?.sliders?.find(
                          (item: any) => item.item_url === url
                        );
                        removeImage(imgId?.id);
                      }}
                    >
                      <CancelIcon />
                    </div>
                  </div>
                ))} */}
                {bgPreview && (
                  <div className="relative w-[150px] h-[90px]">
                    <Image
                      src={bgPreview}
                      alt={bgPreview}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div
                      className="absolute top-[5px] right-[5px] flex items-center h-[26px] w-[26px] justify-center cursor-pointer bg-black/20 backdrop-blur-sm rounded-full"
                      onClick={(event: any) => {
                        const imgId = drama_ministry?.sliders?.find(
                          (item: any) => item.item_url === bgPreview
                        );
                        removeImage(imgId?.id);
                      }}
                    >
                      <CancelIcon />
                    </div>
                  </div>
                )}
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
                  {...register("heading_text", {
                    required: "Heading text field is required",
                  })}
                />
                <small className="text-sm text-red-400">
                  {typeof errors.heading_text?.message === "string" &&
                    errors.heading_text?.message}
                </small>
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
                  {...register("heading_description", {
                    required: "Heading description field is required",
                  })}
                />
                <small className="text-sm text-red-400">
                  {typeof errors.heading_description?.message === "string" &&
                    errors.heading_description?.message}
                </small>
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
                    {...register("body.title", {
                      required: "Body title field is required",
                    })}
                  />
                  <small className="text-sm text-red-400">
                    {typeof errors.body?.title?.message === "string" &&
                      errors.body?.title?.message}
                  </small>
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
                      drama_ministry?.settings?.settings?.body?.content
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
                <div className="md:max-w-[60%] mx-auto">
                  <MultipleImageUploader
                    isPage
                    files={sliderImages}
                    setFiles={setSliderImages}
                  />
                </div>
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
                          const imgId = drama_ministry?.carousel?.find(
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

export default DramaMinistryPage;
