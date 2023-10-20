"use client";

import { useFetchData } from "@/hooks/fetchData";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import OurMissionInfo from "./OurMissionInfo";
import { ourMissionI } from "@/util/interface/writeup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DeleteModal from "../DeleteModal";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import {
  setCategory,
  setDiscription,
  setMission,
  setTitle,
} from "@/store/slice/mission";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import Cookies from "js-cookie";
import axios from "axios";
import { baseUrl } from "@/util/constants";

const OurMission = ({ currentSection }: { currentSection: string }) => {
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const { title, category, description, btnType } = useAppSelector(
    (state) => state.mission
  );

  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();

  const { id } = useAppSelector((state) => state.mediaItems);
  const { data, loading, fetchData } = useFetchData({
    url: `/api/getOurMission/all`,
  });

  const ourMissions: ourMissionI[] = data?.message;

  const token = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Delete
  const deleteMission = async () => {
    const res = await axios.delete(`${baseUrl}om/${id}`, {
      headers,
    });

    const data = await res?.data;

    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
      });
      return;
    }
  };

  // Update and Create

  const updateMission = async () => {
    const serviceData = {
      title,
      description,
      category,
      ...(btnType == "edit" && id !== undefined ? { id } : {}),
    };

    const res = await axios.post(
      `${btnType == "edit" ? `${baseUrl}update-om` : `${baseUrl}create-om`}`,
      serviceData,
      {
        headers,
      }
    );

    const data = await res.data;

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Our Mission/Belief ${
          btnType === "edit" ? "updated" : "added!"
        }`,
        info: title,
      });

      dispatch(
        setMission({
          title: "",
          description: "",
          category: "all",
          id: null,
          btnType: "add",
        })
      );

      return;
    }
  };

  const [cat, setCat] = useState("all");
  const sortOptions = [
    { name: "All", value: "all" },
    { name: "Our Mission", value: "our-mission" },
    { name: "Our Belief", value: "our-belief" },
  ];

  useEffect(() => {
    // fetchData();
    dispatch(setCategory(cat));
  }, [cat, dispatch]);

  return (
    <div
      className={`bg-white rounded-lg py-6 px-7 md:overflow-y-scroll md:h-[34.75rem] ${
        currentSection === "mission" ? "block" : "hidden md:block"
      }`}
    >
      <h2 className="font-bold text-lg">Our Mission/Belief</h2>
      <div className="flex flex-col gap-[1.12rem] mt-4">
        <label htmlFor="title" className="input-field">
          <span>Event title</span>
          <input
            onChange={(e) => dispatch(setTitle(e.target.value))}
            value={title}
            type="text"
            name="location"
            className="input"
          />
        </label>
        <label htmlFor="description" className="input-field">
          <span>Description</span>
          <textarea
            onChange={(e) => dispatch(setDiscription(e.target.value))}
            value={description}
            rows={10}
            className="input"
          />
        </label>
        <label htmlFor="name" className="input-field">
          <span>Page Category</span>

          <Listbox value={cat} onChange={setCat}>
            <div className="relative">
              <Listbox.Button className="relative w-full max-w-[187px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                <span className="block truncate capitalize">
                  {cat === "our-mission"
                    ? "Our Mission"
                    : cat === "our-belief"
                    ? "Our Belief"
                    : cat}
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
                <Listbox.Options className="absolute max-h-60 w-full max-w-[187px] overflow-auto rounded-md p-1 mt-[3px] bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
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
        <button
          onClick={updateMission}
          className="flex-center gap-1 p-2 capitalize rounded-md bg-gray-300 max-w-max text-sm font-semibold"
        >
          {btnType}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.8333 3.33333C10.8333 2.8731 10.4602 2.5 10 2.5C9.53976 2.5 9.16667 2.8731 9.16667 3.33333V9.16667H3.33333C2.8731 9.16667 2.5 9.53976 2.5 10C2.5 10.4602 2.8731 10.8333 3.33333 10.8333H9.16667V16.6667C9.16667 17.1269 9.53976 17.5 10 17.5C10.4602 17.5 10.8333 17.1269 10.8333 16.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H10.8333V3.33333Z"
                fill="#686868"
              />
            </svg>
          </span>
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2 mt-3">
          {ourMissions?.map((ourMission) => {
            return (
              <OurMissionInfo
                key={ourMission.id}
                title={ourMission.title}
                description={ourMission.description}
                id={ourMission.id}
              />
            );
          })}
        </div>
      )}
      {type == "delete" && section === "mission" && (
        <DeleteModal deleteFunc={deleteMission} />
      )}
    </div>
  );
};

export default OurMission;
