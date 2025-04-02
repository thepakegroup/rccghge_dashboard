"use client";
import { remove } from "@/helper/apiFetch";
import { redirectLink } from "@/helper/redirectLink";
import useUpdateToast from "@/hooks/updateToast";
import { PenIcon } from "@/icons/pen-icon";
import { baseUrl } from "@/util/constants";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { MdDeleteOutline, MdOutlineDelete } from "react-icons/md";
import { Button } from "../base-components/button";
import { BtnLoader } from "../base-components/btn-loader";
import { QueryObserverResult } from "@tanstack/react-query";
interface selectedIdProp {
  id: string | number;
  name: string;
}
export const MinistryDepartmentListCard = ({
  group,
  isPageSettings,
  setShowEditMinistryModal,
  setSelectedMinistry,
  getGroups,
}: {
  group: any;
  isPageSettings?: boolean;
  setShowEditMinistryModal?: Dispatch<SetStateAction<boolean>>;
  setSelectedMinistry?: Dispatch<SetStateAction<any>>;
  getGroups: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  const updateToast = useUpdateToast();
  //
  const [selectedId, setSelectedId] = useState<selectedIdProp | null>();
  const [showDelModal, setShowDelModal] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  //
  const handleDeleteGroup = async () => {
    try {
      setDeleting(true);
      const res = await remove(`/group/${selectedId?.id}`);
      if (res.status === 200 || res.status === 201) {
        updateToast({
          type: "delete",
          title: "Deleted!",
          info: `${res.data?.message}`,
        });
        setSelectedId(null);
        setShowDelModal(false);
        await getGroups();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        updateToast({
          type: "error",
          title: "Error!",
          info: `${error.response?.data?.message}`,
        });
      } else {
        updateToast({
          type: "error",
          title: "Error!",
          info: `Something went wrong`,
        });
      }
    } finally {
      setDeleting(false);
    }
  };
  //
  return (
    <Fragment>
      <div className="relative rounded-lg overflow-hidden bg-white">
        <div
          className="absolute flex justify-center items-center rounded-full w-[34px] h-[34px] cursor-pointer right-2 top-2 bg-white"
          onClick={() => {
            setSelectedId({ id: group?.id, name: group?.name });
            setShowDelModal(true);
          }}
        >
          <MdDeleteOutline size={28} className="text-red-500" />
        </div>
        {/*  */}
        <div className="w-full h-[250px]">
          <Image
            className="w-full h-full object-cover"
            src={`${baseUrl}load-media/${group?.banner}`}
            alt={group?.name}
            width={200}
            height={200}
          />
        </div>
        <div className="py-5 px-2 flex flex-col gap-1">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-[10px] w-[10px] rounded-full bg-black" />
              <h3 className="text-sm font-bold font-play-fair-display">
                {group?.name}
              </h3>
            </div>
            <p className="line-clamp-2 my-1 text-[#454545] font-quicksand text-xs pl-4">
              {group?.description}
            </p>
          </div>
          {/*  */}
          <div className="flex justify-end items-center gap-2 my-2 px-4">
            {isPageSettings ? (
              <Link
                className="flex items-center gap-1 text-orange text-xs"
                // href={`${
                //   group?.ministry_code === "mens_ministry"
                //     ? "https://admin.rccghge.ministries.kouakoudomagni.com/men/settings"
                //     : group?.ministry_code === "young-adult-ministry"
                //     ? "https://admin.rccghge.ministries.kouakoudomagni.com/youth/settings"
                //     : redirectLink && redirectLink(group)
                // }`}
                href={`${
                  group?.ministry_code === "young-adult-ministry"
                    ? "https://admin.rccghge.ministries.kouakoudomagni.com/youth/settings"
                    : redirectLink && redirectLink(group)
                }`}
              >
                <PenIcon />
                <span>Edit Page</span>
              </Link>
            ) : (
              <div
                className="cursor-pointer select-none flex items-center gap-1 text-orange text-xs"
                onClick={() => {
                  setSelectedMinistry && setSelectedMinistry(group);
                  setShowEditMinistryModal && setShowEditMinistryModal(true);
                }}
              >
                <PenIcon />
                <span>Edit</span>
              </div>
            )}
            {/*  */}
          </div>
        </div>
      </div>
      <MotionPresence>
        {showDelModal && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed flex flex-col items-center justify-center z-50 bg-black/40 backdrop-blur-[2px] inset-0 top-0 left-0 right-0 bottom-0"
          >
            <div
              className="absolute z-10 left-0 right-0 top-0 bottom-0"
              onClick={() => {
                setSelectedId(null);
                setShowDelModal(false);
              }}
            />
            <MotionDiv
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="z-50 flex flex-col justify-center items-center gap-3 p-5 rounded-2xl bg-white w-[96%] min-[576px]:min-w-[500px] max-w-[500px]"
            >
              <MdOutlineDelete size={30} className="text-red-400" />
              <h4 className="font-semibold text-lg md:text-xl">
                Confirm Delete
              </h4>
              <p className="text-sm md:text-base text-gray-600">
                Are you sure you want to delete {selectedId?.name}?
              </p>
              <div className="flex items-center flex-wrap gap-4">
                <Button
                  label="Cancel"
                  className="bg-transparent border border-orange !text-gray-600"
                  onClick={() => {
                    setSelectedId(null);
                    setShowDelModal(false);
                  }}
                  disabled={deleting}
                />
                <Button
                  label={deleting ? "Deleting" : "Confirm"}
                  disabled={deleting}
                  icon={deleting ? <BtnLoader /> : null}
                  onClick={handleDeleteGroup}
                />
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </MotionPresence>
    </Fragment>
  );
};
