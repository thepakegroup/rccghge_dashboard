"use client";

import Image from "next/image";
import ModalWrappeer from "../ModalWrapper";
// import { setModalToggle } from "../../store/slice/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { setToast } from "../../store/slice/toast";
// import DragDrop from "../DragDrop";
import useCloseModal from "@/hooks/closeModal";
import {
  setFullStory,
  setLeaderInfo,
  setName,
  setPosition,
  setQualification,
  setTitle,
} from "@/store/slice/leader";
import { setDescription } from "@/store/slice/content";
import { leadersI } from "@/util/interface/ministry";
import { useEffect, useState } from "react";
import { setMediaFile } from "@/store/slice/mediaItems";
import ImageUpload from "../ImageUpload";

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
  onResetEditId: () => void;
  editItemData: any;
  editItemId: number | undefined;
}

const ProfileModification = ({
  handleSubmit,
  editItemData,
  editItemId,
  onResetEditId,
}: modalI) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCloseModal();
  // const { name, title, qualification, position, description, fullStory } =
  //   useAppSelector((state) => state.leader);
  const [img, setImg] = useState<File | any>("");

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // Data
  const [leadInfo, setLeadinfo] = useState({
    name: editItemData.name,
    title: editItemData.title,
    qualification: editItemData.qualification,
    position: editItemData.position,
    description: editItemData.short_description,
    fullStory: editItemData.full_story_about,
  });

  const handleSubmitForm = () => {
    const leaderInfo: leadersI = {
      name: leadInfo.name,
      title: leadInfo.title,
      qualification: leadInfo.qualification,
      position: leadInfo.position,
      profile_picture: img,
      short_description: leadInfo.description,
      full_story_about: leadInfo.fullStory,
    };

    handleSubmit(leaderInfo);
    handleCloseModal();
    onResetEditId();
  };

  useEffect(() => {
    editItemData &&
      dispatch(
        setLeaderInfo({
          name: "",
          title: "",
          qualification: "",
          position: "",
          description: "",
          fullStory: "",
          action: "edit",
        })
      );

    dispatch(setMediaFile(null));
  }, [dispatch, editItemData]);

  return (
    <div
      onClick={() => {
        handleCloseModal();
        onResetEditId();
      }}
      className="modal-wrapper"
    >
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-content !max-h-[500px]"
        >
          <div className="flex-center justify-end font-semibold text-base text-orange">
            <button
              onClick={() => {
                handleCloseModal();
                onResetEditId();
              }}
              className="flex-center gap-2"
            >
              <span>Close</span>
              <Image src="icons/close.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <ImageUpload handleImageChange={handleImageChange} />

          <form className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10">
            <label htmlFor="name" className="input-field">
              <span>Name</span>
              <input
                onChange={(e) =>
                  setLeadinfo((val) => ({
                    ...val,
                    name: e.target.value,
                  }))
                }
                defaultValue={editItemData.name}
                name="name"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="title" className="input-field">
              <span>Title</span>
              <input
                onChange={(e) =>
                  setLeadinfo((val) => ({
                    ...val,
                    title: e.target.value,
                  }))
                }
                defaultValue={editItemData.title}
                name="title"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="qualification" className="input-field">
              <span>Qualification</span>
              <input
                onChange={(e) =>
                  setLeadinfo((val) => ({
                    ...val,
                    qualification: e.target.value,
                  }))
                }
                defaultValue={editItemData.qualification}
                name="qualification"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="position" className="input-field">
              <span>Position</span>
              <input
                onChange={(e) =>
                  setLeadinfo((val) => ({
                    ...val,
                    position: e.target.value,
                  }))
                }
                defaultValue={editItemData.position}
                name="position"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="description" className="input-field">
              <span>Short description</span>
              <input
                onChange={(e) =>
                  setLeadinfo((val) => ({
                    ...val,
                    description: e.target.value,
                  }))
                }
                defaultValue={editItemData.short_description}
                name="description"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="fullStory" className="input-field">
              <span>Full story</span>
              <textarea
                onChange={(e) =>
                  setLeadinfo((val) => ({
                    ...val,
                    fullStory: e.target.value,
                  }))
                }
                defaultValue={editItemData.full_story_about}
                name="fullStory"
                rows={5}
                className="input"
              />
            </label>

            <div className="w-full flex justify-center items-center">
              <button onClick={handleSubmitForm} className="modal-btn">
                update
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default ProfileModification;
