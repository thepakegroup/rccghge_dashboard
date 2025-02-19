"use client";

import React, { useMemo } from "react";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import axios, { AxiosError } from "axios";
import useUpdateToast from "@/hooks/updateToast";
import Loader from "@/components/Loader";
import { post } from "@/helper/apiFetch";

const NotificationPage = () => {
  const updateToast = useUpdateToast();
  const sortOptions = [
    { name: "Emergency Notice", value: "emergency_notice" },
    { name: "General Notice", value: "general_event_notice" },
  ];
  const [noticeType, setNoticeType] = useState("");
  const [loader, setLoader] = useState(false);
  const [noticeInfo, setNoticeInfo] = useState({
    title: "",
    content: "",
  });
  const [errorTxt, setErrorTxt] = useState(false);

  // Send Notification
  const handleSubmit = async (e: React.FormEvent) => {
    if (
      noticeType === "" ||
      noticeInfo.content === "" ||
      noticeInfo.title === ""
    ) {
      setErrorTxt(true);
      return;
    }

    setLoader(true);
    e.preventDefault();

    const notice = {
      messageTitle: noticeInfo.title,
      messageBody: noticeInfo.content,
      type: noticeType,
    };

    try {
      const res = await post(`admin/send-notice`, notice);

      updateToast({
        title: "Admin Notice Added!",
        info: noticeInfo.title,
      });

      setErrorTxt(false);
      setNoticeType("");
      setNoticeInfo((info) => {
        return {
          ...info,
          title: "",
          content: "",
        };
      });

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
    <section className="flex-center justify-center mt-9 md:mt-14">
      <div className="w-full ">
        <h1 className="text-[#030229] text-[22px] font-semibold font-play-fair-display mb-[19px]">
          Add push notification
        </h1>

        <div className="w-full py-9 md:max-w-[45%]">
          {loader ? (
            <Loader />
          ) : (
            <form
              className="flex flex-col gap-[1.19rem] h-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="type"
                className="input-field text-sm font-play-fair-display font-medium"
              >
                <span>Notice type</span>

                <Listbox value={noticeType} onChange={setNoticeType}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full min-w-[127px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                      <span className="block truncate text-base">
                        {noticeType === "emergency_notice"
                          ? "Emergency Notice"
                          : noticeType === "general_event_notice"
                          ? "General Notice"
                          : "Select Type"}
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
                {errorTxt && noticeType === "" ? (
                  <p className="text-xs text-red-600">Select notice type </p>
                ) : (
                  ""
                )}
              </label>

              <label
                htmlFor="title"
                className="input-field  text-sm font-play-fair-display font-medium"
              >
                <span>Notice title</span>
                <input
                  type="text"
                  className="input"
                  required
                  onChange={(e) => {
                    setNoticeInfo((info) => {
                      return {
                        ...info,
                        title: e.target.value,
                      };
                    });
                  }}
                />
                {errorTxt && noticeInfo.title === "" ? (
                  <p className="text-xs text-red-600">
                    {" "}
                    Notice title is required
                  </p>
                ) : (
                  ""
                )}
              </label>

              <label
                htmlFor="description"
                className="input-field  text-sm font-play-fair-display font-medium"
              >
                <span>Notice content</span>
                <textarea
                  onChange={(e) => {
                    setNoticeInfo((info) => {
                      return {
                        ...info,
                        content: e.target.value,
                      };
                    });
                  }}
                  rows={10}
                  className="input"
                />
                {errorTxt && noticeInfo.content === "" ? (
                  <p className="text-xs text-red-600">
                    {" "}
                    Notice content is required{" "}
                  </p>
                ) : (
                  ""
                )}
              </label>

              <button
                className="w-full max-w-[30%] bg-[#e77400] text-white rounded-md px-6 py-4"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;
