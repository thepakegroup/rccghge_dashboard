"use client";

import Image from "next/image";
import React, { useState } from "react";
import GetInTouch from "./GetInTouch";
import NeedARide from "./NeedARide";
import PrayerRequest from "./PrayerRequest";

const Connect = () => {
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <section className="flex flex-col gap-[27px]">
      <h1 className="text-lg font-semibold text-[#030229]">
        Connect drop down list
      </h1>

      {/* Dropdowns */}
      {sections?.map((s) => (
        <>
          <div
            key={s?.title}
            onClick={() =>
              selectedSection === s?.title
                ? setSelectedSection("")
                : setSelectedSection(s?.title)
            }
            className="bg-white cursor-pointer rounded-[10px] p-6 text-lg text-[#030229] flex justify-between gap-3"
          >
            {s?.title}

            {selectedSection === s?.title ? (
              <Image src="/icons/arrow-up.svg" alt="" width={20} height={20} />
            ) : (
              <Image src="/icons/arrowdown.svg" alt="" width={20} height={20} />
            )}
          </div>
          {selectedSection === s?.title && s?.display}
        </>
      ))}
    </section>
  );
};

export default Connect;

const sections = [
  {
    title: "Get In Touch",
    display: <GetInTouch />,
  },
  {
    title: "Need A Ride",
    display: <NeedARide />,
  },
  {
    title: "Prayer Requests",
    display: <PrayerRequest />,
  },
];
