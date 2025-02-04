"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { post } from "@/helper/apiFetch";
import { CancelIcon } from "@/icons/cancel-icon";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

export const NewTeamMemberForm = ({
  setShowNewTeamForm,
  getBackPageInfo,
}: {
  setShowNewTeamForm: Dispatch<SetStateAction<boolean>>;
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  // states
  const [profile_image, setProfileImage] = useState<any>(null);
  const [profile_preview, setProfilePreview] = useState<any>(null);

  //
  const [creating, setCreating] = useState<boolean>(false);

  //
  const uploadNewProfileImg = (e: any) => {
    setProfilePreview(null);
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  //
  const newProfileImgDrop = (files: FileList) => {
    const file = files[0];
    if (!file) return;
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // form configs
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      office: "",
      profile_image: null,
    },
  });
  //
  const createNewTeamMember = async (data: any) => {
    setCreating(true);
    try {
      if (!profile_image) return;
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("office", data?.office);
      formData.append("profile_image", profile_image);
      const res = await post(
        "/ministry-page/youth/team-member",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        setShowNewTeamForm(false);
        await getBackPageInfo();
      }
    } catch (error: any) {
      console.log(error);
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
      className="bg-black/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-[887] flex flex-col justify-center items-center h-screen overflow-hidden"
    >
      <div className="flex flex-col gap-3 w-[95%] sm:w-[600px] mx-auto h-[90%] overflow-y-auto">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Church office categories
        </h3>
        <form
          className="relative rounded-lg p-4 bg-white flex flex-col gap-2"
          onSubmit={handleSubmit(createNewTeamMember)}
        >
          {/*  */}
          <label className="flex flex-col gap-1" htmlFor="new_team_name">
            <h4 className="font-play-fair-display font-semibold">
              Team member name
            </h4>
            <input
              id="new_team_name"
              type="text"
              className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
              {...register("name", { required: true })}
            />
          </label>
          {/*  */}
          <label className="flex flex-col gap-1" htmlFor="new_team_office">
            <h4 className="font-play-fair-display font-semibold">
              Team member office
            </h4>
            <input
              id="new_team_office"
              type="text"
              className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
              {...register("office", { required: true })}
            />
          </label>
          {/* image input */}
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
                newProfileImgDrop(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="new_category_img"
                {...register("profile_image")}
                onChange={uploadNewProfileImg}
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
              {profile_preview && (
                <div className="relative w-[150px] h-[90px]">
                  <Image
                    src={profile_preview}
                    alt={profile_preview}
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
              label={creating ? "Creating" : "Save Settings"}
              icon={creating ? <BtnLoader /> : null}
              disabled={creating}
              // onClick={createCategory}
              className="self-start"
              type="submit"
            />
            <Button
              label="Cancel"
              disabled={creating}
              onClick={() => setShowNewTeamForm(false)}
              className="self-start !bg-fade-ash/40 !text-gray-900"
              type="button"
            />
          </div>
        </form>
      </div>
    </MotionDiv>
  );
};
