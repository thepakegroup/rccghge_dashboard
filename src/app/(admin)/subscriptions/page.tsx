import Image from "next/image";
import React from "react";

const Subscriptions = () => {
  return (
    <section className="relative min-h-[88vh]">
      {/* new sign ups */}
      <div className="flex flex-col gap-3 mt-11">
        <h3 className="text-lg font-semibold text-black">New Sign Ups</h3>

        {/*new sign ups card */}
        <div className="flex relative justify-between items-center bg-white px-6 py-4 rounded-[7px]">
          <p className="gap-5 flex items-center text-sm text-[#3D3D3D] font-semibold">
            <Image src="/icons/red-dot.svg" alt="" width={7} height={7} />
            Cherishnkem@yahoo.com
          </p>

          <button className="bg-[#E77400] px-[15px] py-[10px] rounded text-xs font-semibold text-[#F9FAFB]">
            Add to list
          </button>

          <p className="absolute top-1 left-1 flex gap-1 items-center text-[10px] text-[#4A4A4A]">
            <Image
              src="/icons/calendar-icon.svg"
              alt=""
              width={12}
              height={12}
            />
            10-06-2021
          </p>
        </div>
      </div>

      {/* subscribers */}
      <div className="flex flex-col gap-3 mt-11">
        <h3 className="text-lg font-semibold text-black">Subscribers</h3>

        {/*new sign ups card */}
        <div className="flex relative justify-between items-center bg-white px-6 py-4 rounded-[7px]">
          <p className="text-sm text-[#3D3D3D] font-semibold">
            Cherishnkem@yahoo.com
          </p>

          <Image src="/icons/green-check.svg" alt="" width={30} height={30} />

          <p className="absolute top-1 left-1 flex gap-1 items-center text-[10px] text-[#4A4A4A]">
            <Image
              src="/icons/calendar-icon.svg"
              alt=""
              width={12}
              height={12}
            />
            10-06-2021
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subscriptions;
