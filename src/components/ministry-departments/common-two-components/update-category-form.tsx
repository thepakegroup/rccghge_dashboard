"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { formats, modules } from "@/components/quill-config/confiig";
import { post } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { CancelIcon } from "@/icons/cancel-icon";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

export const UpdateCategoryForm = ({
  page_name,
  setToEdit,
  getBackPageInfo,
  selectedCategory,
}: {
  page_name: string;
  setToEdit: Dispatch<SetStateAction<boolean>>;
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
  selectedCategory: any;
}) => {
  //
  const updateToast = useUpdateToast();
  //
  const [updating, setUpdating] = useState<boolean>(false);
  const [bgPreview, setBgPreview] = useState<any>(selectedCategory?.image_url);
  const [selectedImg, setSelectedImg] = useState<any>(null);
  //no state tracks
  const [noName, setNoName] = useState<boolean>(false);
  const [noDescription, setNoDescription] = useState<boolean>(false);
  //
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    values: {
      name: selectedCategory?.name,
      description: selectedCategory?.description,
    },
  });
  //
  const updateCategoryImgDrop = (files: FileList) => {
    const file = files[0];
    if (!file) return;
    setBgPreview(URL.createObjectURL(file) as any);
    setSelectedImg(file);
  };
  //
  const updateCategoryImgUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setBgPreview(URL.createObjectURL(file) as any);
    setSelectedImg(file);
  };
  //
  const updateCategory = async (data: any) => {
    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append("id", selectedCategory?.id);
      formData.append("page_name", page_name);
      if (selectedImg) formData.append("image", selectedImg);
      formData.append("description", data?.description);
      formData.append("name", data?.name);
      const res = await post(
        "/ministry-page/common-2/section",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        setToEdit(false);
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
      setUpdating(false);
    }
  };

  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="font-play-fair-display font-semibold mb-3 text-lg mt-3">
        Church office categories
      </h3>
      <form
        className="relative rounded-lg p-4 bg-white flex flex-col gap-2"
        onSubmit={handleSubmit(updateCategory)}
      >
        <CancelIcon
          onClick={() => setToEdit(false)}
          className="absolute top-4 right-4 cursor-pointer"
        />
        <label className="flex flex-col gap-1" htmlFor="category_name">
          <h4 className="font-play-fair-display font-semibold">
            Category name
          </h4>
          <input
            id="category_name"
            type="text"
            className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
            {...register("name", { required: "Please Name field is required" })}
          />

          <small className="text-sm text-red-400">
            {typeof errors.name?.message === "string" && errors.name?.message}
          </small>
        </label>
        {/*  */}
        <label className="flex flex-col gap-1" htmlFor="description">
          <h4 className="font-play-fair-display font-semibold">Description</h4>
          <QuillEditor
            className="write-editor"
            formats={formats}
            modules={modules}
            onChange={(event: any) => setValue("description", event)}
            defaultValue={selectedCategory?.description}
          />
          <small className="text-sm text-red-400">
            {typeof errors.description?.message === "string" &&
              errors.description?.message}
          </small>
        </label>
        {/*  */}
        <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
          <h4 className="font-play-fair-display font-semibold mb-1">
            Add Image
          </h4>
          <label
            className="flex flex-col gap-1 cursor-pointer justify-center items-center"
            htmlFor="new_category_img"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              updateCategoryImgDrop(e.dataTransfer.files);
            }}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              id="new_category_img"
              onChange={updateCategoryImgUpload}
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
            {bgPreview && (
              <div className="relative w-[150px] h-[90px]">
                <Image
                  src={bgPreview}
                  alt={bgPreview}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="self-start" onClick={updateCategory}>
          <Button
            label={updating ? "Updating" : "Update"}
            icon={updating ? <BtnLoader /> : null}
            disabled={updating}
            className="self-start"
            type="submit"
          />
        </div>
      </form>
    </MotionDiv>
  );
};
