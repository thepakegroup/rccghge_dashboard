"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { formats, modules } from "@/components/quill-config/confiig";
import { post } from "@/helper/apiFetch";
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

export const OurMission = ({
  ourMission,
  getBackPageInfo,
  setShowOurMission,
}: {
  ourMission: any;
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
  setShowOurMission: Dispatch<SetStateAction<boolean>>;
}) => {
  // states
  const [ourMissionImg, setOurMissionImg] = useState<any>(
    ourMission?.media_url
  );
  const [selectedImg, setSelectedImg] = useState<any>([]);

  //
  const [saving, setSaving] = useState<boolean>(false);

  // handle our mission image drag and drop
  const ourMissionImageDrop = (files: FileList) => {
    const file = files[0];
    setOurMissionImg(URL.createObjectURL(file));
    setSelectedImg(file);
  };
  //uploadOurMissionImage
  const uploadOurMissionImage = (event: any) => {
    setOurMissionImg(ourMission?.media_url);
    const file = event.target.files[0];
    if (!file) return;
    setOurMissionImg(URL.createObjectURL(file));
    setSelectedImg(file);
  };
  // form config
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      mission_vision_media: ourMission?.media_url,
      our_mission: {
        title: ourMission?.our_mission?.title,
        content: ourMission?.our_mission?.content,
      },
      our_vision: {
        title: ourMission?.our_vision?.title,
        content: ourMission?.our_vision?.content,
      },
      our_events: {
        title: ourMission?.our_events?.title,
        content: ourMission?.our_events?.content,
      },
    },
  });
  //
  const updateOurMissions = async (data: any) => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("our_mission[title]", data?.our_mission?.title);
      formData.append("our_vision[title]", data?.our_vision?.title);
      formData.append("our_events[title]", data?.our_events?.title);
      formData.append("our_mission[content]", data?.our_mission?.content);
      formData.append("our_vision[content]", data?.our_vision?.content);
      formData.append("our_events[content]", data?.our_events?.content);
      if (selectedImg) {
        formData.append("mission_vision_media", selectedImg);
      }
      const res = await post(
        "/ministry-page/youth/compose",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        await getBackPageInfo();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-5"
    >
      <form
        className="w-[95%] sm:w-[600px] mx-auto flex flex-col gap-3"
        onSubmit={handleSubmit(updateOurMissions)}
      >
        <div className="relative flex flex-col gap-3 bg-[#F1F1F6] rounded-lg p-4">
          {/* Image input */}
          <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
            <h4 className="font-play-fair-display font-semibold mb-3">
              Add Background Image
            </h4>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="our_mission_img"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                ourMissionImageDrop(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="our_mission_img"
                multiple
                onChange={uploadOurMissionImage}
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
              {ourMissionImg && (
                <div className="relative w-[150px] h-[90px]">
                  <Image
                    src={ourMissionImg}
                    alt={ourMissionImg}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {/* <div
                    className="absolute top-[5px] right-[5px] flex items-center h-[26px] w-[26px] justify-center cursor-pointer bg-black/20 backdrop-blur-sm rounded-full"
                    onClick={(event: any) => {
                      const imgId = youth_ministry?.sliders?.find(
                        (item: any) => item.item_url === url
                      );
                      removeImage(imgId?.id);
                    }}
                  >
                    <CancelIcon />
                  </div> */}
                </div>
              )}
            </div>
          </div>
          {/* Header text */}
          <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
            <h4 className="font-play-fair-display font-semibold mb-3">
              Our Mission
            </h4>
            <label className="flex flex-col gap-1" htmlFor="ourMissionTitle">
              <p className="font-play-fair-display font-normal  text-base mb-3">
                Title
              </p>
              <input
                id="ourMissionTitle"
                type="text"
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                {...register("our_mission.title")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="ourMissionContent">
              <p className="font-play-fair-display font-normal  text-base mb-3">
                Content
              </p>
              <textarea
                id="ourMissionContent"
                rows={4}
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                {...register("our_mission.content")}
              />
            </label>
          </div>
          {/*  */}
          <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
            <h4 className="font-play-fair-display font-semibold mb-3">
              Our Vision
            </h4>
            <label className="flex flex-col gap-1" htmlFor="ourVisionTitle">
              <p className="font-play-fair-display font-normal  text-base mb-3">
                Title
              </p>
              <input
                id="ourVisionTitle"
                type="text"
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                {...register("our_vision.title")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="ourVisionContent">
              <p className="font-play-fair-display font-normal  text-base mb-3">
                Content
              </p>
              <textarea
                id="ourVisionContent"
                rows={4}
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                {...register("our_vision.content")}
              />
            </label>
          </div>
          {/*  */}
          <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
            <h4 className="font-play-fair-display font-semibold mb-3">
              Our Events
            </h4>
            <label className="flex flex-col gap-1" htmlFor="ourEventsTitle">
              <p className="font-play-fair-display font-normal  text-base mb-3">
                Title
              </p>
              <input
                id="ourEventsTitle"
                type="text"
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                {...register("our_events.title")}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="ourEventsContent">
              <p className="font-play-fair-display font-normal  text-base mb-3">
                Content
              </p>
              <textarea
                id="ourEventsContent"
                rows={4}
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                {...register("our_events.content")}
              />
            </label>
          </div>
          {/*  */}
          <CancelIcon
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowOurMission(false)}
          />
          <Button
            className="self-start"
            label={saving ? "Saving" : "Save Settings"}
            disabled={saving}
            icon={saving ? <BtnLoader /> : null}
          />
        </div>
      </form>
    </MotionDiv>
  );
};
