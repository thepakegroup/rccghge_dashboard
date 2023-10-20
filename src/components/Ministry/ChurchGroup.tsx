import Image from "next/image";
import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, Fragment, useEffect, useMemo, useCallback } from "react";
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
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const { id } = useAppSelector((state) => state.mediaItems);
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const [groups, setGroups] = useState<churchGroupI[]>([]);
  const [loading, setloading] = useState(true);

  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<any | null>(null);
  const [currAction, setCurrAction] = useState(false);

  // Sort Functionality
  const sortOptions = useMemo(() => ["Older", "Most recent"] as const, []);
  const [sortKey, setSortKey] = useState(sortOptions[0]);

  const {
    name,
    category,
    description,
    action,
    groupImg: file,
  } = useAppSelector((state) => state.churchGroup);

  // Header and token
  const token = Cookies.get("token");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Fetch All Group
  const getGroupByCategory = useCallback(
    async (category: string) => {
      const res = await axios.post(
        `${baseUrl}groups`,
        JSON.stringify({ category, page: 1 }),
        {
          headers,
        }
      );

      const data = await res.data;
      if (data.error === false) {
        setloading(false);

        setGroups(data?.message?.data);
      }
    },
    [headers]
  );

  // Delete Group
  const removeGroup = async () => {
    const res = await axios.delete(`${baseUrl}group/${id}`, {
      headers,
    });

    const data = await res?.data;

    if (data.error === false) {
      getGroupByCategory(category);
      updateToast({
        type: "delete",
      });
    }
  };

  // Sort Functionality
  const sortGroup = useCallback(
    (a: any, b: any) => {
      if (sortKey === "Older") {
        return a.id - b.id;
      }

      return b.id - a.id;
    },
    [sortKey]
  );

  // Create and Update Group
  const updateGroup = async (groupInfo: any) => {
    const form = new FormData();

    file && form.append("banner", file as Blob, file?.name);
    form.append("name", groupInfo.name);
    form.append("category", groupInfo.category);
    form.append("description", groupInfo.description);
    currAction && form.append("id", `${id}`);

    const res = await axios.post(
      `${currAction ? `${baseUrl}update-group` : `${baseUrl}create-group`}`,
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
      setCurrAction(false);

      updateToast({
        title: `Church group ${currAction ? "updated" : "added"}`,
        info: groupInfo.name,
      });

      dispatch(setFileName(""));
      dispatch(
        setGroupInfo({
          name: "",
          category: "All",
          description: "",
          id: null,
          action: "add",
          groupImg: null,
          groupImgName: "",
        })
      );
      return;
    }

    if (data.error === true) {
      updateToast({
        title: `${data.message}`,
        info: data.message,
      });
    }
  };

  // Category
  const [cat, setCat] = useState("All");
  const catOptions = [
    { name: "All", value: "All" },
    { name: "Department", value: "Department" },
    { name: "Ministry", value: "Ministry" },
  ];

  const groupInfo = {
    name,
    category,
    description,
  };

  useEffect(() => {
    dispatch(setCatgeory(cat));
    getGroupByCategory(category);
  }, [cat, dispatch, category, getGroupByCategory]);

  return (
    <div
      className={`${
        currentSection === "church group"
          ? "block overflow-x-hidden"
          : "hidden md:block"
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
          <Listbox value={sortKey} onChange={setSortKey}>
            <div className="relative">
              <Listbox.Button className="relative w-full min-w-[127px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                <span className="block truncate">{sortKey || "Sort by"}</span>
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
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option}
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
            {groups?.sort(sortGroup).map((group) => {
              return (
                <ProfileCard
                  key={group.id}
                  id={group.id}
                  img={group.banner}
                  name={group.name}
                  category={group.category}
                  type="group"
                  onEditClick={() => {
                    setCurrEditItemID(group.id);
                    setCurrEditItem(group);
                    setCurrAction(true);
                  }}
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
        <GroupProfileModal
          onResetEditId={() => {
            setCurrEditItemID(null);
            setCurrEditItem(null);
          }}
          editItemData={currEditItem}
          editItemId={currEditItemID}
          handleSubmit={updateGroup}
        />
      )}
    </div>
  );
};

export default ChurchGroup;
