"use client";

import Image from "next/image";
import React, { useState } from "react";
import OurStory from "./OurStory";
import OurPastors from "./OurPastors";
import OurMission from "./OurMission";
import OurBelief from "./OurBelief";

const AboutUs = () => {
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <section className="flex flex-col gap-[27px]">
      <h1 className="text-lg font-semibold text-[#030229]">
        About us drop down list
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
            className="bg-white rounded-[10px] p-6 text-lg text-[#030229] flex justify-between gap-3"
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

export default AboutUs;

const sections = [
  {
    title: "Our Story",
    display: <OurStory />,
  },
  {
    title: "Our Pastors",
    display: <OurPastors />,
  },
  {
    title: "Our Mission",
    display: <OurMission />,
  },
  {
    title: "Our Beliefs",
    display: <OurBelief />,
  },
  {
    title: "RCCG Worldwide",
    display: <OurStory />,
  },
];
