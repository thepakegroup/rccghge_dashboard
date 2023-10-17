"use client";

import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setEditMediaId } from "@/store/slice/mediaItems";
import Image from "next/image";
import React from "react";

interface adminInfoI {
  email: string;
  level: number;
  id: number;
}

const AdminInfo = ({ email, id, level }: adminInfoI) => {
  const handleButton = useModalType();

  const dispatch = useAppDispatch();

  const handleEditAdmin = () => {
    handleButton("modify");
    dispatch(setEditMediaId(id));
  };

  const handleDeleteAdmin = () => {
    handleButton("delete");
    dispatch(setEditMediaId(id));
  };

  return (
    <div>
      <p className="col-span-2">{email}</p>
      <p>********</p>
      <p className="flex-center justify-center">
        <span className="text-xs text-white bg-[#EB5017] rounded-full px-2 py-1">
          {level === 1 ? "Super Admin" : "Admin"}
        </span>
      </p>
      <div>
        <div className="flex-center justify-end gap-6">
          <button onClick={handleEditAdmin}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={handleDeleteAdmin}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
