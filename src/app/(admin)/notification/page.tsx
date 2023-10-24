"use client";

import React, { useMemo } from "react";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";
import useUpdateToast from "@/hooks/updateToast";
import Loader from "@/components/Loader";

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

  // Header and token
  const token = Cookies.get("token");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Send Notification
  const handleSubmit = async (e: React.FormEvent) => {
    setLoader(true);
    e.preventDefault();
    const notice = {
      messageTitle: noticeInfo.title,
      messageBody: noticeInfo.content,
      type: noticeType,
    };

    const res = await axios.post(
      `${baseUrl}admin/send-notice`,
      JSON.stringify(notice),
      {
        headers,
      }
    );

    const data = await res.data;

    if (data.error === false) {
      updateToast({
        title: "Admin Notice Added!",
        info: data.message,
      });
      setNoticeType("");
      setNoticeInfo((info) => {
        return {
          ...info,
          title: "",
          content: "",
        };
      });
      setLoader(false);
    }
  };

  return (
    <section className="flex-center justify-center mt-9 md:mt-14">
      <div className="w-full ">
        <h1 className="font-bold text-lg text-center text-fade-ash mb-9">
          Send push notification
        </h1>
        <div className="modal py-9 md:max-w-[467px] mx-auto">
          {loader ? (
            <Loader />
          ) : (
            <form
              className="flex flex-col gap-[1.19rem] h-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="type" className="input-field">
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
              </label>
              <label htmlFor="title" className="input-field">
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
              </label>
              <label htmlFor="description" className="input-field">
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
              </label>
              <button
                className="w-full bg-[#1063C6] text-white rounded-md px-6 py-4"
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
