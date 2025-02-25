import { MotionDiv } from "@/util/motion-exports";
import React from "react";
import ImageUpload from "../ImageUpload";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";

export const AddLeaderModal = ({
  register,
  errors,
  handleSubmit,
  handleCreateLeader,
  handleImageChange,
  onClose,
}: any) => {
  const dispatch = useAppDispatch();

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black z-50 fixed top-0 w-full h-full left-0 flex flex-col justify-center items-center bg-opacity-30"
    >
      <MotionDiv
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="min-w-[500px] bg-white rounded-lg py-6 px-7 md:max-h-[500px] md:overflow-y-auto overflow-x-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-5">Add Church Leader</h2>
        <ImageUpload handleImageChange={handleImageChange} section="leader" />
        <form
          className="flex flex-col gap-[1.19rem]"
          onSubmit={handleSubmit(handleCreateLeader)}
        >
          <label htmlFor="name" className="input-field">
            <span>Name</span>
            <input {...register("name")} type="text" className="input" />
            <p className="text-xs text-red-600">{errors.name?.message}</p>
          </label>

          <label htmlFor="title" className="input-field">
            <span>Title</span>
            <input {...register("title")} type="text" className="input" />
            <p className="text-xs text-red-600">{errors.title?.message}</p>
          </label>
          <label htmlFor="qualification" className="input-field">
            <span>Qualification</span>
            <input
              {...register("qualification")}
              type="text"
              className="input"
            />
            <p className="text-xs text-red-600">
              {errors.qualification?.message}
            </p>
          </label>
          <label htmlFor="position" className="input-field">
            <span>Position</span>
            <input {...register("position")} type="text" className="input" />
            <p className="text-xs text-red-600">{errors.position?.message}</p>
          </label>
          <label htmlFor="description" className="input-field">
            <span>Short description</span>
            <input {...register("description")} type="text" className="input" />
            <p className="text-xs text-red-600">
              {errors.description?.message}
            </p>
          </label>
          <label htmlFor="fullStory" className="input-field">
            <span>Full story</span>
            <textarea {...register("fullStory")} rows={5} className="input" />
            <p className="text-xs text-red-600">{errors.fullStory?.message}</p>
          </label>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-center gap-2 bg-[#e77400] rounded-md max-w-max text-white text-sm px-4 py-2"
            >
              <span>Upload</span>
              <Image
                src="/icons/upload-btn.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-center gap-2 bg-gray-200 rounded-md max-w-max text-gray-800 text-sm px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </MotionDiv>
    </MotionDiv>
  );
};
