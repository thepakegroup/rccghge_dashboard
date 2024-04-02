"use client";

import Give from "@/components/PageSettings/Give";
import IAmNew from "@/components/PageSettings/IAmNew";
import LandingPage from "@/components/PageSettings/LandingPage";
import Ministries from "@/components/PageSettings/Ministries";
import Services from "@/components/PageSettings/Services";
import React, { useState } from "react";

const PageSettings = () => {
  const [selectedPage, setSelectedPage] = useState(pages[0]?.title);

  return (
    <section className="relative min-h-[88vh] w-full ">
      <div className="flex justify-between items-center pt-[51px]">
        {pages.map((p) => {
          return (
            <li
              className={`list-none cursor-pointer font-medium text-xl text-[#030229] ${
                selectedPage === p.title
                  ? "border-b-[2px] border-[#E77400]"
                  : null
              }`}
              onClick={() => setSelectedPage(p.title)}
              key={p.title}
            >
              {p.title}
            </li>
          );
        })}
      </div>

      {/* Components */}
      <div className="py-[35px]">
        {selectedPage === "Landing Page" && <LandingPage />}
        {selectedPage === "About Us" && <LandingPage />}
        {selectedPage === "I'm New" && <IAmNew />}
        {selectedPage === "Services" && <Services />}
        {selectedPage === "Give" && <Give />}
        {selectedPage === "Our Ministries" && <Ministries />}
        {selectedPage === "Connect" && <LandingPage />}
      </div>
    </section>
  );
};

export default PageSettings;

const pages = [
  {
    title: "Landing Page",
  },
  {
    title: "About Us",
  },
  {
    title: "I'm New",
  },
  {
    title: "Services",
  },
  {
    title: "Give",
  },
  {
    title: "Our Ministries",
  },
  {
    title: "Connect",
  },
];
