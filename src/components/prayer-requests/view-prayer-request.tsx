import Image from "next/image";
import React from "react";

interface Props {
  onClose: () => void;
  prayer: any;
}

const ViewPrayerRequestModal = ({ onClose, prayer }: Props) => {
  return (
    <div className="bg-black z-50 fixed top-0 w-full h-full left-0 flex flex-col justify-center items-center bg-opacity-30">
      <section className="bg-white px-[27px] flex flex-col gap-[18px] py-6 w-full max-w-[60%] lg:max-w-[40%] m-auto rounded-lg">
        {/* header */}
        <div
          onClick={onClose}
          className="flex-center mb-[2px] justify-between font-semibold text-base text-orange cursor-pointer"
        >
          <p className="text-black text-lg">{prayer?.id}</p>
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
            value={prayer?.prayer}
            className="input font-quicksand"
          />
        </label>

        <button className="text-white text-base bg-orange py-4 px-6 w-full max-w-[40%] mx-auto rounded-md">
          Add to seen requests
        </button>
      </section>
    </div>
  );
};

export default ViewPrayerRequestModal;
