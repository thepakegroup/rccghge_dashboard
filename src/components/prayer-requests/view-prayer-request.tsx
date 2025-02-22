import { PrayerRequests } from "@/app/(admin)/prayer-requests/page";
import { patch, post } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { AxiosError } from "axios";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  onClose: () => void;
  prayer: PrayerRequests;
  fetchData: any;
}

const ViewPrayerRequestModal = ({ onClose, prayer, fetchData }: Props) => {
  const [loader, setLoader] = useState(false);
  const updateToast = useUpdateToast();

  // Update Prayer Request
  const updateMedia = async (prayer: PrayerRequests) => {
    setLoader(true);
    const form = new FormData();

    form.append("seen", true as unknown as string);
    form.append("id", prayer?.id as unknown as string);

    try {
      const res = await patch(`prayer-request`, form, "multipart/form-data");

      fetchData();

      updateToast({
        title: `Prayer request updated. `,
        info: "Marked as seen!",
      });

      onClose();

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

  return (
    <div className="bg-black z-50 fixed top-0 w-full h-full left-0 flex flex-col justify-center items-center bg-opacity-30">
      <section className="bg-white px-[27px] flex flex-col gap-[18px] py-6 w-full max-w-[60%] lg:max-w-[40%] m-auto rounded-lg">
        {/* header */}
        <div
          onClick={onClose}
          className="flex-center mb-[2px] justify-between font-semibold text-base text-orange cursor-pointer"
        >
          <p className="text-black text-lg">#{prayer?.id}</p>
          <div className="flex gap-1">
            <span>Close</span>
            <Image
              src="icons/close.svg"
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* content */}
        <label htmlFor="location" className="input-field font-quicksand">
          <span>Member&apos;s name</span>
          <input
            type="text"
            id="location"
            value={prayer?.name}
            className="input font-quicksand"
          />
        </label>

        <label htmlFor="type" className="input-field font-quicksand">
          <span>Prayer Request</span>
          <textarea
            id="type"
            rows={10}
            value={prayer?.content}
            className="input font-quicksand"
          />
        </label>

        <button
          onClick={() => updateMedia(prayer)}
          className={`text-white text-base bg-orange py-4 px-6 w-full max-w-[40%] mx-auto rounded-md ${
            loader && "animate-pulse"
          }`}
        >
          {loader ? "Adding..." : " Add to seen requests"}
        </button>
      </section>
    </div>
  );
};

export default ViewPrayerRequestModal;
