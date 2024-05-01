"use client";
import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { post } from "@/helper/apiFetch";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

export const UpdateProgramForm = ({
  getBackPageInfo,
  setShowUpdateProgram,
  selectedProgram,
}: {
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
  setShowUpdateProgram: Dispatch<SetStateAction<boolean>>;
  selectedProgram: any;
}) => {
  // states
  const [updating, setUpdating] = useState<boolean>(false);
  const [selectedFlyer, setSelectedFlyer] = useState<any>(null);
  const [flyerPreview, setFlyerPreview] = useState<any>(
    selectedProgram?.flyer_url
  );

  // form configs
  const { register, handleSubmit } = useForm({
    values: {
      name: selectedProgram?.name,
      description: selectedProgram?.description,
      flyer: null,
    },
  });

  //
  const updateFlyerDrop = (files: FileList) => {
    const file = files[0];
    setFlyerPreview(URL.createObjectURL(file));
    setSelectedFlyer(file);
  };
  //
  const updateFlyerUpload = (event: any) => {
    const file = event.target.files[0];
    setFlyerPreview(URL.createObjectURL(file));
    setSelectedFlyer(file);
  };
  //
  const createNewProgram = async (data: any) => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedProgram?.id);
      formData.append("name", data?.name);
      formData.append("description", data?.description);
      if (selectedFlyer) {
        formData.append("flyer", selectedFlyer);
      }
      const res = await post(
        "/ministry-page/youth/programs",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        setShowUpdateProgram(false);
        await getBackPageInfo();
      }
    } catch (error: any) {
      console.log(error);
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
      className="bg-black/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-[887] flex flex-col justify-center items-center h-screen overflow-hidden"
    >
      <div className="flex flex-col gap-3 w-[95%] sm:w-[600px] mx-auto h-[90%] overflow-y-auto">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Add new Programs
        </h3>
        <form
          className="relative rounded-lg p-4 bg-white flex flex-col gap-2"
          onSubmit={handleSubmit(createNewProgram)}
        >
          {/*  */}
          <label className="flex flex-col gap-1" htmlFor="update_program_name">
            <h4 className="font-play-fair-display font-semibold">
              Program name
            </h4>
            <input
              id="update_program_name"
              type="text"
              className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
              {...register("name", { required: true })}
            />
          </label>
          {/*  */}
          <label
            className="flex flex-col gap-1"
            htmlFor="update_program_description"
          >
            <h4 className="font-play-fair-display font-semibold">
              Description
            </h4>
            <input
              id="update_program_description"
              type="text"
              className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
              {...register("description", { required: true })}
            />
          </label>
          {/* image input */}
          <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
            <h4 className="font-play-fair-display font-semibold mb-1">
              Add Image
            </h4>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="update_flyer_image"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                updateFlyerDrop(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="update_flyer_image"
                {...register("flyer")}
                onChange={updateFlyerUpload}
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
              {flyerPreview && (
                <div className="relative w-[150px] h-[90px]">
                  <Image
                    src={flyerPreview}
                    alt={flyerPreview}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          {/*  */}
          <div className="flex items-center gap-2">
            <Button
              label={updating ? "Updating" : "Save Settings"}
              icon={updating ? <BtnLoader /> : null}
              disabled={updating}
              className="self-start"
              type="submit"
            />
            <Button
              label="Cancel"
              disabled={updating}
              onClick={() => setShowUpdateProgram(false)}
              className="self-start !bg-fade-ash/40 !text-gray-900"
              type="button"
            />
          </div>
        </form>
      </div>
    </MotionDiv>
  );
};
