import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setDeleteFunc } from "@/store/slice/content";
import { setEditMediaId } from "@/store/slice/mediaItems";
import { setService } from "@/store/slice/service";
import Image from "next/image";
import React from "react";

interface infoI {
  name: string;
  serviceTime: string;
  id: number;
  description: string;
  image: string;
}

const ServiceInfo = ({ name, serviceTime, id, description, image }: infoI) => {
  const handleButton = useModalType();

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    handleButton("delete");
    dispatch(setEditMediaId(id));
    dispatch(setDeleteFunc("service times"));
  };

  const handleEdit = () => {
    handleButton("modify");
    dispatch(setService({ name, description, id, btnType: "edit" }));
  };

  return (
    <section className="flex flex-col gap-3 border border-gray-300 p-4 rounded">
      {image && (
        <div className=" relative max-h-[225px]">
          <Image
            src={image}
            alt=""
            width={305}
            height={225}
            className="rounded-[10px] !w-full !h-[225px]"
          />
        </div>
      )}
      <div className="flex-center justify-between bg-[#F2F2F2] rounded-lg p-4">
        <div className="font-semibold md:max-w-[70%] max-w-full">
          <h2 className="text-base">{name}</h2>
          <span className="text-sm text-ash-300">{serviceTime}</span>
        </div>
        <div className="flex-center justify-end gap-6 flex-[30%]">
          <button onClick={handleEdit}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={handleDelete}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
