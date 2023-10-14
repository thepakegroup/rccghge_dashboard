import Image from "next/image";
import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { churchGroupI } from "@/util/interface/ministry";
import DeleteModal from "../DeleteModal";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import {
  setCatgeory,
  setDescription,
  setGroupInfo,
  setName,
} from "@/store/slice/churchGroup";
import GroupProfileModal from "./GroupProfileModal";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";
import ImageUpload from "../ImageUpload";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";

const ChurchGroup = ({ currentSection }: { currentSection: string }) => {
  const { id } = useAppSelector((state) => state.mediaItems);
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const {
    name,
    category,
    description,
    action,
    groupImg: file,
  } = useAppSelector((state) => state.churchGroup);

  const dispatch = useAppDispatch();

  const [groups, setGroups] = useState<churchGroupI[]>([]);
  const [loading, setloading] = useState(true);

  const getGroupByCategory = async (category: string) => {
    const res = await fetch("api/fetchGroup", {
      method: "POST",
      body: JSON.stringify({ category, page: 1 }),
    });

    const data = await res.json();

    if (data.error === false) setloading(false);

    setGroups(data.message.data);
  };

  useEffect(() => {
    getGroupByCategory(category);
  }, [category]);

  const removeGroup = async () => {
    const res = await fetch(`/api/removeGroup/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.error === false) {
      getGroupByCategory(category);
      updateToast({
        type: "delete",
      });
    }
  };

  const updateToast = useUpdateToast();

  const updateGroup = async (groupInfo: any) => {
    const form = new FormData();

    file && form.append("banner", file as Blob, file?.name);
    form.append("name", groupInfo.name);
    form.append("category", groupInfo.category);
    form.append("description", groupInfo.qualification);
    action === "edit" && form.append("id", `${id}`);

    const token = Cookies.get("token");

    const res = await axios.post(
      `${
        action == "edit" ? `${baseUrl}update-group` : `${baseUrl}create-group`
      }`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    if (data.error === false) {
      getGroupByCategory(category);
      updateToast({
        title: `Church group ${action === "edit" ? "updated" : "added"}`,
        info: groupInfo.name,
      });
      dispatch(
        setGroupInfo({
          name: "",
          category: "",
          description: "",
          id: null,
          action: "add",
          groupImg: null,
          groupImgName: "",
        })
      );
      dispatch(setFileName(""));
    }
  };

  const [cat, setCat] = useState("All");

  const catOptions = [
    { name: "All", value: "All" },
    { name: "Department", value: "Department" },
    { name: "Ministry", value: "Ministry" },
  ];

  useEffect(() => {
    dispatch(setCatgeory(cat));
  }, [cat, dispatch]);

  const groupInfo = {
    name,
    category,
    description,
  };

  // Sort Functionality

  const sortOptions = [{ name: "Most recent" }, { name: "Older" }];
  const [selected, setSelected] = useState("");

  return (
    <div
      className={`${
        currentSection === "church group" ? "block" : "hidden md:block"
      }`}
    >
      <div className="bg-white rounded-lg md:max-h-[40rem] py-6 px-7">
        <h2 className="text-lg font-bold mb-5">Add church groups</h2>
        <ImageUpload section="group" />
        <div className="flex flex-col gap-[1.19rem] min-h-[200px]">
          <label htmlFor="name" className="input-field">
            <span>Name</span>
            <input
              onChange={(e) => dispatch(setName(e.target.value))}
              value={name}
              name="name"
              type="text"
              className="input"
            />
          </label>
          <label htmlFor="category" className="input-field">
            <span>Category</span>
            <Listbox value={cat} onChange={setCat}>
              <div className="relative">
                <Listbox.Button className="relative w-full gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
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
                  <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md p-1 mt-[3px] bg-white text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    {catOptions.map((option, optionIdx) => (
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
          <label htmlFor="description" className="input-field">
            <span>Description</span>
            <textarea
              onChange={(e) => dispatch(setDescription(e.target.value))}
              value={description}
              name="description"
              rows={4}
              className="input"
            />
          </label>
          <button
            onClick={() => updateGroup(groupInfo)}
            className="flex-center gap-2 bg-secondary-02 rounded-md max-w-max text-white text-sm px-4 py-2"
          >
            <span>Upload</span>
            <Image
              src="icons/upload-btn.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex justify-end my-4">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="relative w-full min-w-[127px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                <span className="block truncate">{selected || "Sort by"}</span>
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
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {groups?.map((group) => {
              return (
                <ProfileCard
                  key={group.id}
                  id={group.id}
                  img={group.banner}
                  name={group.name}
                  category={group.category}
                  type="group"
                />
              );
            })}
          </div>
        )}
      </div>
      {type == "delete" && section === "group" && (
        <DeleteModal deleteFunc={removeGroup} />
      )}
      {type == "modify" && section === "group" && (
        <GroupProfileModal handleSubmit={updateGroup} />
      )}
    </div>
  );
};

export default ChurchGroup;
