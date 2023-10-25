"use client";

import Image from "next/image";
import { leadersI } from "@/util/interface/ministry";
import { useFetchData } from "@/hooks/fetchData";
import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DeleteModal from "../DeleteModal";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import { setLeaderInfo } from "@/store/slice/leader";
import ProfileModification from "./ProfileModification";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/util/constants";
import ImageUpload from "../ImageUpload";
import { setFileName } from "@/store/slice/mediaItems";
import { useEffect, useState } from "react";
import { post, remove } from "@/helper/apiFetch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { leaderSchema } from "@/helper/schema";

const Leaders = ({ currentSection }: { currentSection: string }) => {
  const type = useGetTypeOfModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const { section } = useAppSelector((state) => state.content);
  const { id } = useAppSelector((state) => state.mediaItems);
  const {
    name,
    title,
    qualification,
    position,
    description,
    fullStory,
    action,
    leaderImg: file,
  } = useAppSelector((state) => state.leader);

  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(leaderSchema),
  });

  const [currEditItemID, setCurrEditItemID] = useState<number | undefined>(
    undefined
  );
  const [currEditItem, setCurrEditItem] = useState<any | null>(null);
  const [currAction, setCurrAction] = useState(false);
  const [img, setImg] = useState<File | any>("");
  const [loader, setLoader] = useState(false);

  // Fetch All leaders
  const { data, loading, fetchData } = useFetchData({
    url: `leaders`,
    method: "client",
  });
  const leaders: leadersI[] = data?.message;

  // Delete A leader
  const removeLeader = async () => {
    setLoader(true);

    try {
      const res = await remove(`leader/${id}`);

      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
    } catch (error) {
      setLoader(false);
      updateToast({
        type: "error",
        title: "Error!",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // Create and Update
  const updateLeader = async (leaderInfo: any) => {
    setLoader(true);
    const form = new FormData();

    img && form.append("profile_picture", img as Blob, img?.name as string);
    leaderInfo.profile_picture &&
      form.append(
        "profile_picture",
        leaderInfo.profile_picture as Blob,
        leaderInfo.profile_picture?.name as string
      );
    form.append("name", leaderInfo.name);
    form.append("title", leaderInfo.title);
    form.append("qualification", leaderInfo.qualification);
    form.append("position", leaderInfo.position);
    form.append("short_description", leaderInfo.short_description);
    form.append("full_story_about", leaderInfo.full_story_about);
    action === "edit" && form.append("id", `${id}`);

    try {
      const res = await post(
        `${currAction ? `${baseUrl}update-leader` : `${baseUrl}create-leader`}`,
        form,
        "multipart/form-data"
      );

      fetchData();
      setCurrAction(false);
      setImg("");

      if (res.data?.error) {
        updateToast({
          title: `Church leader ${
            currAction ? "update error" : "create error"
          }`,
          info: `${res.data?.message}`,
        });
        return;
      }

      updateToast({
        title: `Church leader ${currAction ? "updated" : "added"}`,
        info: leaderInfo.name,
      });

      dispatch(
        setLeaderInfo({
          name: "",
          title: "",
          qualification: "",
          position: "",
          description: "",
          fullStory: "",
          action: "add",
          leaderImg: null,
          leaderImgName: "",
        })
      );

      dispatch(setFileName(""));

      setLoader(false);
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  const handleCreateLeader = (data: any) => {
    if (img === "") {
      updateToast({
        title: "Image cannot be empty",
        info: "Please select an image!",
      });
      return;
    }

    const leaderInfo: leadersI = {
      name: data.name,
      title: data.title,
      qualification: data.qualification,
      position: data.position,
      short_description: data.description,
      full_story_about: data.fullStory,
    };

    updateLeader(leaderInfo);

    if (formState.isSubmitSuccessful) {
      reset();
    }
  };

  useEffect(() => {
    dispatch(setFileName(""));
  }, [dispatch]);

  return (
    <div
      className={`${
        currentSection === "church leader" ? "block" : "hidden md:block"
      }`}
    >
      <div className="bg-white rounded-lg py-6 px-7 md:max-h-[40rem] md:overflow-y-auto overflow-x-hidden">
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

          <button
            type="submit"
            className="flex-center gap-2 bg-secondary-02 rounded-md max-w-max text-white text-sm px-4 py-2"
          >
            <span>Upload</span>
            <Image
              src="icons/upload-btn.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </form>
      </div>
      {loading || loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {leaders?.map((leader) => {
            return (
              <ProfileCard
                key={leader.id}
                name={leader.name}
                title={leader.title}
                qualification={leader.qualification}
                position={leader.position}
                id={leader.id as number}
                img={leader.profile_picture as string}
                type="leader"
                slug={leader.slug as string}
                onEditClick={() => {
                  setCurrEditItemID(leader?.id);
                  setCurrEditItem(leader);
                  setCurrAction(true);
                }}
              />
            );
          })}
        </div>
      )}
      {type == "delete" && section === "leader" && (
        <DeleteModal deleteFunc={removeLeader} />
      )}
      {type == "modify" && section === "leader" && (
        <ProfileModification
          onResetEditId={() => {
            setCurrEditItemID(undefined);
            setCurrEditItem(null);
          }}
          editItemData={currEditItem}
          editItemId={currEditItemID}
          handleSubmit={updateLeader}
        />
      )}
    </div>
  );
};

export default Leaders;
