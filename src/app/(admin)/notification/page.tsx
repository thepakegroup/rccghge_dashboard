"use client";

import React from "react";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const NotificationPage = () => {
  const sortOptions = [{ name: "Notification 1" }, { name: "Notification 2" }];
  const [selected, setSelected] = useState("");

  return (
    <section className="flex-center justify-center mt-9 md:mt-14">
      <div className="w-full ">
        <h1 className="font-bold text-lg text-center text-fade-ash mb-9">
          Send push notification
        </h1>
        <div className="modal py-9 md:max-w-[467px] mx-auto">
          <form className="flex flex-col gap-[1.19rem] h-auto">
            <label htmlFor="type" className="input-field">
              <span>Notice type</span>

              <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                  <Listbox.Button className="relative w-full min-w-[127px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                    <span className="block truncate text-base">
                      {selected || "Select Type"}
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
                            stroke-width="2.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
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
                          value={option.name}
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
            </label>
            <label htmlFor="title" className="input-field">
              <span>Notice title</span>
              <input type="text" className="input" />
            </label>
            <label htmlFor="description" className="input-field">
              <span>Notice content</span>
              <textarea rows={10} className="input" />
            </label>
            <button className="w-full bg-[#1063C6] text-white rounded-md px-6 py-4">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
