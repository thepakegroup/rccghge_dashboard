"use client";

import Image from "next/image";
import { leadersI } from "@/util/interface/ministry";
import { useFetchData } from "@/hooks/fetchData";
import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DeleteModal from "../DeleteModal";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import {
  setDescription,
  setFullStory,
  setLeaderInfo,
  setName,
  setPosition,
  setQualification,
  setTitle,
} from "@/store/slice/leader";
import ProfileModification from "./ProfileModification";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";
import ImageUpload from "../ImageUpload";
import { setFileName } from "@/store/slice/mediaItems";
import { useEffect, useState } from "react";

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

  const [currEditItemID, setCurrEditItemID] = useState<number | undefined>(
    undefined
  );
  const [currEditItem, setCurrEditItem] = useState<any | null>(null);
  const [currAction, setCurrAction] = useState(false);
  const [img, setImg] = useState<File | any>("");
  const [loader, setLoader] = useState(false);

  // Fetch All leaders
  const { data, loading, fetchData } = useFetchData({
    url: `${baseUrl}leaders`,
    method: "client",
  });
  const leaders: leadersI[] = data?.message;

  const token = Cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const removeLeader = async () => {
    setLoader(true);
    const res = await axios.delete(`${baseUrl}leader/${id}`, {
      headers,
    });

    const data = await res?.data;

    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
    }
  };

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // console.log(img);

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

    const token = Cookies.get("token");

    const res = await axios.post(
      `${currAction ? `${baseUrl}update-leader` : `${baseUrl}create-leader`}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    if (data.error === false) {
      fetchData();
      setCurrAction(false);
      setImg("");
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
    }
  };

  const leaderInfo: leadersI = {
    name,
    title,
    qualification,
    position,
    short_description: description,
    full_story_about: fullStory,
  };

  useEffect(() => {
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
        <div className="flex flex-col gap-[1.19rem]">
          <label htmlFor="name" className="input-field">
            <span>Name</span>
            <input
              onChange={(e) => dispatch(setName(e.target.value))}
              // value={name}
              required
              name="name"
              type="text"
              className="input"
            />
          </label>

          <label htmlFor="title" className="input-field">
            <span>Title</span>
            <input
              onChange={(e) => dispatch(setTitle(e.target.value))}
              // value={title}
              name="title"
              required
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="qualification" className="input-field">
            <span>Qualification</span>
            <input
              onChange={(e) => dispatch(setQualification(e.target.value))}
              // value={qualification}
              name="qualification"
              type="text"
              required
              className="input"
            />
          </label>
          <label htmlFor="position" className="input-field">
            <span>Position</span>
            <input
              onChange={(e) => dispatch(setPosition(e.target.value))}
              // value={position}
              name="position"
              type="text"
              required
              className="input"
            />
          </label>
          <label htmlFor="description" className="input-field">
            <span>Short description</span>
            <input
              onChange={(e) => dispatch(setDescription(e.target.value))}
              // value={description}
              name="description"
              type="text"
              required
              className="input"
            />
          </label>
          <label htmlFor="fullStory" className="input-field">
            <span>Full story</span>
            <textarea
              onChange={(e) => dispatch(setFullStory(e.target.value))}
              // value={fullStory}
              name="fullStory"
              rows={5}
              required
              className="input"
            />
          </label>

          <button
            onClick={() => updateLeader(leaderInfo)}
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
        </div>
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
