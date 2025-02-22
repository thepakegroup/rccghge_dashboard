"use client";

import { remove } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";

interface deleteI {
  selectedId: number;
  onClose: () => void;
  fetchData: any;
}

const ConfirmDeletePrayerRequest = ({
  selectedId,
  onClose,
  fetchData,
}: deleteI) => {
  const updateToast = useUpdateToast();
  const [loading, setLoading] = useState(false);

  // delete social connect
  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await remove(`prayer-request/${selectedId}`);

      updateToast({
        title: `${"Deleted Successfully."}`,
      });

      setLoading(false);
      fetchData();

      onClose();
    } catch (error) {
      setLoading(false);

      updateToast({
        title: `Error! Image not deleted.`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  return (
    <>
      <div onClick={onClose} className="modal-wrapper">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-red w-full flex flex-col justify-center items-center "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="delete-modal flex-center flex-col justify-center"
          >
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
            <div className="text-base font-medium text-center mt-3 mb-6">
              Are you sure you want to delete this prayer request
            </div>
            <div className="flex-center gap-3 text-sm [&>button]:px-8 [&>button]:py-2 [&>button]:rounded-md">
              <button onClick={onClose} className="border-2 border-[#D0D5DD]">
                No
              </button>
              <button
                onClick={handleDelete}
                className={`bg-[#CB1A14] text-white ${
                  loading && "animate-pulse"
                }`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeletePrayerRequest;
