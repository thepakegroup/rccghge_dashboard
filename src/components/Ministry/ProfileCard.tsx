"use client";

import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setDeleteFunc } from "@/store/slice/content";
import { setAction } from "@/store/slice/leader";
import { setEditMediaId, setFileName } from "@/store/slice/mediaItems";
import { baseUrl } from "@/util/constants";
import Image from "next/image";

interface profileI {
  name: string;
  title?: string;
  position?: string;
  qualification?: string;
  img: string;
  category?: string;
  type: string;
  id: number;
  onEditClick?: () => void;
  slug?: string;
}

const ProfileCard = ({
  name,
  position,
  qualification,
  title,
  img,
  category,
  type,
  id,
  onEditClick = () => {},
  slug,
}: profileI) => {
  const handleButton = useModalType();

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    handleButton("delete");
    dispatch(setDeleteFunc(type));
    title
      ? dispatch(setEditMediaId(slug as string))
      : dispatch(setEditMediaId(id));
  };

  const handleEdit = () => {
    handleButton("modify");
    onEditClick();

    dispatch(setAction("edit"));
    dispatch(setDeleteFunc(type));
    dispatch(setFileName(img));
    dispatch(setEditMediaId(id));
  };

  return (
    <div className="bg-white rounded-lg p-3">
      <div className="hidden md:flex md:justify-end md:gap-6">
        <button onClick={handleEdit}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={handleDelete}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
        <button>
          <Image src="icons/options.svg" alt="" width={24} height={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        <div className="flex justify-between flex-col gap-6">
          <Image
            src={`${baseUrl}load-media/${img}`}
            alt=""
            height={220}
            width={400}
            className="md:my-4 rounded-lg"
          />

          {/* mobile */}
          <div className="md:hidden flex gap-6">
            <button onClick={handleEdit}>
              <Image src="icons/edit.svg" alt="" width={24} height={24} />
            </button>
            <button onClick={handleDelete}>
              <Image src="icons/delete.svg" alt="" width={24} height={24} />
            </button>
            <button>
              <Image src="icons/options.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-3">
          <div>
            <p className="font-medium">Name</p>
            <p className="font-bold">{name}</p>
          </div>
          {title && (
            <div>
              <p className="font-medium">Title</p>
              <p className="font-bold">{title}</p>
            </div>
          )}
          {qualification && (
            <div>
              <p className="font-medium">Qualification</p>
              <p className="font-bold">{qualification}</p>
            </div>
          )}
          {position && (
            <div>
              <p className="font-medium">Position</p>
              <p className="font-bold">{position}</p>
            </div>
          )}
          {category && (
            <div>
              <p className="font-medium">Category</p>
              <p className="font-bold">{category}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
