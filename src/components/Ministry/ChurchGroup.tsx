"use client";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState, Fragment, useEffect, useMemo, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { churchGroupI } from "@/util/interface/ministry";
import DeleteModal from "../DeleteModal";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import { setCatgeory, setGroupInfo } from "@/store/slice/churchGroup";
import GroupProfileModal from "./GroupProfileModal";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import axios, { AxiosError } from "axios";
import { baseUrl } from "@/util/constants";
import ImageUpload from "../ImageUpload";
import { setFileName, setMediaFile } from "@/store/slice/mediaItems";
import { get, post, remove } from "@/helper/apiFetch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { groupSchema } from "@/helper/schema";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { BsChevronDown } from "react-icons/bs";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";

const ChurchGroup = ({ currentSection }: { currentSection: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const { id } = useAppSelector((state) => state.mediaItems);
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const [groups, setGroups] = useState<churchGroupI[]>([]);
  const [meta_info, setMetaInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<any | null>(null);
  const [currAction, setCurrAction] = useState(false);
  const [img, setImg] = useState<File | any>("");

  //
  const [showCategories, setShowCategories] = useState<boolean>(false);

  // page param var
  const page = searchParams.get("page") || 1;
  const selected_category = searchParams.get("selected_category") || "Ministry";

  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(groupSchema),
  });

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

  // Fetch All Group
  const getGroupByCategory = useCallback(
    async (category: string) => {
      try {
        const res = await get(
          `groups?category=${selected_category}&page=${page}&perPage=6`
        );
        setLoading(false);

        const data = await res.data;
        if (data.error) {
          updateToast({
            title: `Error!`,
            info: `${res.data?.message}`,
          });
          return;
        }

        setGroups(data?.message?.data);
        setMetaInfo(data?.message?.meta);
      } catch (error) {
        setLoading(false);

        updateToast({
          type: "error",
          title: "Error!",
          info: `${(error as AxiosError)?.message}`,
        });
      }
    },
    [page, selected_category]
  );
  // This functions handles the page click change
  const handlePageClick = ({ selected }: { selected: number }) => {
    const page = selected + 1;
    router.push(
      `/ministry?page=${page}&selected_category=${selected_category}`
    );
  };

  // Delete Group
  const removeGroup = async () => {
    setLoading(true);

    try {
      const res = await remove(`group/${id}`);
      getGroupByCategory(category);
      updateToast({
        type: "delete",
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);

      updateToast({
        type: "error",
        title: "Error!",
        info: `${(error as AxiosError)?.message}`,
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

  // HandleImage
  const handleImageChange = (file: File) => {
    setImg(file);
  };

  // Create and Update Group
  const updateGroup = async (groupInfo: any) => {
    setLoading(true);
    const form = new FormData();

    img && form.append("banner", img as Blob, img?.name as string);
    groupInfo.banner &&
      form.append(
        "banner",
        groupInfo.banner as Blob,
        groupInfo.banner?.name as string
      );
    form.append("name", groupInfo.name);
    form.append("category", groupInfo.category);
    form.append("description", groupInfo.description);
    currAction && form.append("id", `${id}`);
    form.append("ministry_code", groupInfo.ministry_code);

    try {
      const res = await post(
        `${currAction ? `${baseUrl}update-group` : `${baseUrl}create-group`}`,
        form,
        "multipart/form-data"
      );

      setLoading(false);
      getGroupByCategory(category);
      setCurrAction(false);
      setImg("");

      if (res.data?.error) {
        updateToast({
          title: `Church group ${currAction ? "update error" : "create error"}`,
          info: `${res.data?.message}`,
        });
        return;
      }

      updateToast({
        title: `Church group ${currAction ? "updated" : "added"}`,
        info: groupInfo.name,
      });

      setLoading(false);

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
    } catch (error) {
      setLoading(false);

      updateToast({
        title: `Error`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
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

  // Onsubmit of the form
  const handleCreateGroup = (data: any) => {
    if (img === "") {
      updateToast({
        title: "Image cannot be empty",
        info: "Please select an image!",
      });
      return;
    }

    const groupInfo = {
      name: data.name,
      category: cat,
      description: data.description,
      ministry_code: data.ministry_code,
    };

    updateGroup(groupInfo);

    if (formState.isSubmitSuccessful) {
      reset();
    }
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
      <div className="overflow-auto bg-white rounded-lg md:max-h-[40rem] py-6 px-7">
        <h2 className="text-lg font-bold mb-5">Add church groups</h2>
        <ImageUpload handleImageChange={handleImageChange} section="group" />
        <form
          className="flex flex-col gap-[1.19rem] min-h-[200px]"
          onSubmit={handleSubmit(handleCreateGroup)}
        >
          <label htmlFor="name" className="input-field">
            <span>Name</span>
            <input {...register("name")} type="text" className="input" />
            <p className="text-xs text-red-600">{errors.name?.message}</p>
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
          <label htmlFor="ministry_code">
            <span>Ministry Code</span>
            <input
              type="text"
              className="input"
              {...register("ministry_code")}
            />
            <span className="text-sm text-fade-ash">
              e.g for youth ministry, type youth_ministry
            </span>
            <br />
            <small className="text-xs text-red-600">
              {errors.ministry_code?.message}
            </small>
          </label>
          <label htmlFor="description" className="input-field">
            <span>Description</span>
            <textarea {...register("description")} rows={4} className="input" />
            <p className="text-xs text-red-600">
              {errors.description?.message}
            </p>
          </label>
          <button
            type="submit"
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
        </form>
      </div>
      <div className="">
        <div className="px-4 flex justify-between my-4 items-start">
          {/* category select */}
          <div>
            <div
              className="flex items-center justify-between gap-3 text-sm text-fade-ash bg-white border border-[#d0d5dd] rounded-md py-[14px] px-4 cursor-pointer"
              onClick={() => setShowCategories(!showCategories)}
            >
              <span>{selected_category}</span>
              <BsChevronDown />
            </div>
            {/*  */}
            <MotionPresence>
              {showCategories && (
                <MotionDiv
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden bg-white border border-[#d0d5dd] rounded-md text-fade-ash"
                >
                  <p
                    className="py-2 px-3 border-b last:border-b-0 cursor-pointer"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append("selected_category", "All");
                      router.push(
                        `/ministry?page=${page}&selected_category=All`
                      );
                      setShowCategories(false);
                    }}
                  >
                    All
                  </p>
                  <p
                    className="py-2 px-3 border-b last:border-b-0 cursor-pointer"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append("selected_category", "Ministry");
                      router.push(
                        `/ministry?page=${page}&selected_category=Ministry`
                      );
                      setShowCategories(false);
                    }}
                  >
                    Ministry
                  </p>
                  <p
                    className="py-2 px-3 border-b last:border-b-0 cursor-pointer"
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append("selected_category", "Department");
                      router.push(
                        `/ministry?page=${page}&selected_category=Department`
                      );
                      setShowCategories(false);
                    }}
                  >
                    Department
                  </p>
                </MotionDiv>
              )}
            </MotionPresence>
          </div>

          {/* sort by recent or oldest */}
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
      {groups && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={meta_info?.last_page}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="ministry-departments-pagination flex flex-wrap gap-2 justify-center my-5"
          activeLinkClassName="text-white bg-orange"
        />
      )}
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
