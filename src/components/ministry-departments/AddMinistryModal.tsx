import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../base-components/button";
import { MForm, MotionDiv } from "@/util/motion-exports";
import Image from "next/image";
import { BtnLoader } from "../base-components/btn-loader";
import { Controller, useForm } from "react-hook-form";
import { CancelIcon } from "@/icons/cancel-icon";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdateToast from "@/hooks/updateToast";
import { post } from "@/helper/apiFetch";
import { QueryObserverResult } from "@tanstack/react-query";
import { Select } from "../base-components/Select";
//
const schema = yup.object().shape({
  name: yup.string().required("Ministry name is required"),
  category: yup.string().required("Category is required"),
  ministry_code: yup.string().required("Ministry code is required"),
  description: yup.string().required("Description is required"),
  group_template: yup.string().required("Please select template"),
});
//
export const AddMinistryModal = ({
  setShowModal,
  tab,
  getGroups,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  tab: string;
  getGroups: () => Promise<QueryObserverResult<Error, any>>;
}) => {
  const updateToast = useUpdateToast();
  //
  // states
  const [sliderPreview, setSliderPreview] = useState<string | null>(null);
  const [sliderSelected, setSliderSelected] = useState<File | null>(null);

  //
  const [creating, setCreating] = useState<boolean>(false);
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      category: tab || "",
      description: "",
      ministry_code: "",
      group_template: "",
    },
    resolver: yupResolver(schema),
  });
  //
  // handles sliders image drop upload
  const handleSliderDrop = (files: FileList) => {
    const file = files[0]; // Get the first file
    if (file) {
      setSliderPreview(URL.createObjectURL(file));
      setSliderSelected(file);
    }
  };

  // Handle single image upload
  const uploadSliderImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file
    if (file) {
      setSliderPreview(URL.createObjectURL(file));
      setSliderSelected(file);
    }
  };

  //
  const createMinistry = async (data: any) => {
    if (sliderPreview === "" || sliderPreview === null) {
      updateToast({
        type: "error",
        title: "Error!",
        info: "Ministry Image field cannot be empty!",
      });
      return;
    }

    try {
      setCreating(true);
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("category", data?.category);
      formData.append("description", data?.description);
      formData.append("ministry_code", data?.ministry_code);
      formData.append("group_template", data?.group_template);
      formData.append("banner", sliderSelected as any);
      const res = await post(`create-group`, formData, "multipart/form-data");
      if (res.status === 200 || res.status === 201 || res.statusText === "OK") {
        updateToast({
          type: "update",
          title: "Successful!",
          info: `${res.data?.message}`,
        });
        reset();
        setSliderPreview(null);
        setSliderSelected(null);
        setShowModal(false);
        await getGroups();
      }
    } catch (error: any) {
      updateToast({
        type: "error",
        title: "Error!",
        info: `${error.response.data?.message}`,
      });
    } finally {
      setCreating(false);
    }
  };
  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black z-50 fixed inset-0 top-0 w-full h-full left-0 flex flex-col justify-center items-center bg-opacity-30"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-30"
        onClick={() => {
          setShowModal(false);
        }}
      />
      <MForm
        onSubmit={handleSubmit(createMinistry)}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="z-50 relative bg-white px-[27px] flex flex-col gap-[18px] py-6 w-full max-w-[60%] lg:max-w-[40%] m-auto rounded-lg max-h-[500px] overflow-y-auto"
      >
        {/* header */}
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className="flex-center mb-[2px] justify-between font-semibold text-base text-orange cursor-pointer"
        >
          <div className="flex gap-1 ml-auto">
            <span>Close</span>
            <Image
              src="icons/close.svg"
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>
        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
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
            {sliderPreview && (
              <div className="flex justify-center mt-2 mb-3">
                <div className="relative w-[150px] h-[90px]">
                  <Image
                    src={sliderPreview}
                    alt="Uploaded image"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div
                    className="absolute top-[5px] right-[5px] flex items-center h-[26px] w-[26px] justify-center cursor-pointer bg-black/20 backdrop-blur-sm rounded-full"
                    onClick={() => {
                      setSliderPreview(null);
                      setSliderSelected(null);
                    }}
                  >
                    <CancelIcon />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* content */}
        <label
          htmlFor="name"
          className="input-field font-quicksand font-semibold"
        >
          <span className="!font-semibold font-quicksand text-[#101928]">
            {tab === "Ministry" ? "Ministry name" : "Department name"}
          </span>
          <input
            type="text"
            id="name"
            className="input font-quicksand focus-within:ring-transparent"
            {...register("name")}
          />
          <small className="text-red-400">{errors.name?.message}</small>
        </label>
        <label htmlFor="category" className="input-field font-quicksand">
          <span>Category</span>
          <select
            id="category"
            {...register("category")}
            className="input focus-within:ring-transparent"
          >
            <option value="">Select Category</option>
            <option value="Ministry">Ministry</option>
            <option value="Department">Department</option>
          </select>
          <small className="text-red-400">{errors.category?.message}</small>
        </label>
        <label htmlFor="ministry_code" className="input-field font-quicksand">
          <span className="!font-semibold font-quicksand text-[#101928]">
            {tab === "Ministry" ? "Ministry code" : "Department code"}
          </span>
          <input
            type="text"
            id="ministry_code"
            className="input font-quicksand focus-within:ring-transparent"
            {...register("ministry_code")}
          />
          <small className="text-red-400">
            {errors.ministry_code?.message}
          </small>
          <small>
            {tab === "Ministry"
              ? "NB: e.g for youth ministry, type youth_ministry"
              : "NB: e.g for youth department, type youth_department"}
          </small>
        </label>
        <label
          htmlFor="ministry_template"
          className="input-field font-quicksand"
        >
          <span className="!font-semibold font-quicksand text-[#101928]">
            {tab === "Ministry" ? "Ministry Template" : "Department Template"}
          </span>
          <Controller
            name="group_template"
            control={control}
            render={({ field }) => (
              <Select
                id="ministry_template"
                value={field.value}
                options={[
                  { label: "Common 1", value: "common-1" },
                  { label: "Common 2", value: "common-2" },
                  // { label: "Standalone", value: "standalone" },
                ]}
                onChange={field.onChange}
                className="!w-full"
                btnClass="py-4"
              />
            )}
          />
          <small className="text-red-400">
            {errors.group_template?.message}
          </small>
        </label>
        <label htmlFor="subtext" className="input-field font-quicksand">
          <span className="!font-semibold font-quicksand text-[#101928]">
            Subtext
          </span>
          <textarea
            id="subtext"
            {...register("description")}
            rows={4}
            className="input focus-within:ring-transparent"
          />
          <small className="text-red-400">{errors.description?.message}</small>
        </label>

        <Button
          disabled={creating}
          label={creating ? "Creating" : "Create"}
          icon={creating ? <BtnLoader /> : null}
          className="w-[97%] sm:w-[268px] rounded-sm h-[55px] py-4 px-6 flex justify-center text-base items-center mx-auto font-quicksand"
          type="submit"
        />
      </MForm>
    </MotionDiv>
  );
};
