"use client";

import OurMission from "@/components/PageWriteUp/OurMission";
import WriteUpSection from "@/components/PageWriteUp/WriteUpSection";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const PageWriteUp = () => {
  const [currentSection, setCurrentSection] = useState("mission");
  const sortOptions = [
    { name: "Our Mission/Belief", value: "mission" },
    { name: "Edit Content", value: "edit content" },
  ];

  return (
    <section className="mt-4">
      <div className="flex justify-center mb-3 md:hidden">
        <Listbox value={currentSection} onChange={setCurrentSection}>
          <div className="relative">
            <Listbox.Button className="relative w-full min-w-[187px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
              <span className="block truncate capitalize">
                {currentSection}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="button-icon">
                    <path
                      id="Vector"
                      d="M4.375 7.1875L10 12.8125L15.625 7.1875"
                      stroke="#686868"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md p-1 mt-[3px] bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                {sortOptions.map((option, optionIdx) => (
                  <Listbox.Option
                    key={optionIdx}
                    className={({ active }) =>
                      `relative select-none py-2 px-4 cursor-pointer ${
                        active
                          ? "bg-gray-2 rounded-md w-full text-black"
                          : "text-black"
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <OurMission currentSection={currentSection} />
      </div>
      <WriteUpSection currentSection={currentSection} />
    </section>
  );
};

export default PageWriteUp;
