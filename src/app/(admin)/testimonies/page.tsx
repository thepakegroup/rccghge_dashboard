"use client";

import AddItemButton from "@/components/AddItemButton";
import DeleteModal from "@/components/DeleteModal";
import Loader from "@/components/Loader";
import Card from "@/components/Testimonies/Card";
import TestimonyModal from "@/components/Testimonies/TestimonyModal";
import { useFetchData } from "@/hooks/fetchData";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import useUpdateToast from "@/hooks/updateToast";
import { useAppSelector } from "@/store/hooks";
import { testimonyI } from "@/util/interface/testimony";
import Image from "next/image";
import { useEffect, useState, Fragment, useMemo, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import UpdateTestimonyModal from "@/components/Testimonies/UpdateTestimonyModal";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { post, remove } from "@/helper/apiFetch";
import PaginationButtons from "@/components/PaginationButtons";

export interface EditItem {
  id: number;
  name: string;
  image_url: string;
  link: string;
  short_description: string;
  type: string;
  created_at: Date;
  updated_at: Date;
}

const Testimonials = () => {
  const type = useGetTypeOfModal();
  const updateToast = useUpdateToast();
  const { id } = useAppSelector((state) => state.testimony);
  const [currentPage, setCurrentPage] = useState(1);

  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<testimonyI | null>(null);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data, loading, fetchData, metadata } = useFetchData({
    url: `testimonies/${currentPage}`,
    method: "client",
  });

  const testimonies: testimonyI[] = data?.message?.data;

  // Search Functionality
  const testimonyData = useMemo(() => {
    if (searchValue) {
      return testimonies?.filter((item) => {
        return item?.title.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    return testimonies;
  }, [searchValue, testimonies]);

  useEffect(() => {
    if (currEditItemID) {
      const EditItem = testimonyData?.filter(
        (item: any) => item.id === currEditItemID
      )[0];

      setCurrEditItem(EditItem);
    }
  }, [currEditItemID, testimonyData]);

  // Sort Functionality
  const sortOptions = [{ name: "Most recent" }, { name: "Older" }];
  const [selected, setSelected] = useState("Most recent");

  const sortGroup = useCallback(
    (a: any, b: any) => {
      if (selected === "Older") {
        return a.id - b.id;
      }

      return b.id - a.id;
    },
    [selected]
  );

  // Delete Testimony
  const deleteTestimony = async () => {
    setLoader(true);

    try {
      const res = await remove(`testimonies/${id}`);

      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
    } catch (error) {
      setLoader(false);
      updateToast({
        type: "error",
        title: "Error 404 Not Found",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // Update Testimony
  const updateTestimony = async ({
    title,
    content,
    editItemId,
  }: {
    title: string;
    content: string;
    editItemId: number;
  }) => {
    setLoader(true);

    const updateData = {
      title,
      content,
      id: editItemId,
    };

    try {
      const res = await post(`testimonies/update`, updateData);

      setLoader(false);
      fetchData();

      updateToast({
        title: `Testimony updated!`,
        info: title,
      });
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error! Testimony not updated`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // Publish Testimony
  const publishTestimony = async (published: boolean, id: number) => {
    setLoader(true);

    try {
      const res = await post(`testimonies/publish`, {
        id,
        published: !published,
      });

      fetchData();
      updateToast({
        title: `${published ? "Unpublished" : "Published"}`,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error! Testimony not published`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // Pagination
  const totalPages = metadata?.last_page;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <section className="relative min-h-[88vh]">
      {/* <div className="flex justify-end mt-2">
        <AddItemButton title="Add testimony" />
      </div> */}
      <section className="mt-4">
        <div className="text-ash-100 flex flex-col gap-[17px] md:flex-row">
          <label
            htmlFor="search"
            className="relative px-3 py-2 bg-white border border-[#D0D5DD] rounded-md flex items-center"
          >
            <Image
              src="icons/search.svg"
              alt=""
              width={18}
              height={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
            />
            <input
              type="text"
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              id="search"
              placeholder="Search testimonies"
              className="pl-7 rounded-md border-none outline-none w-full"
            />
          </label>

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

        {loading || loader ? (
          <Loader />
        ) : (
          <section className="mt-4 card-wrapper">
            {testimonyData?.sort(sortGroup)?.map((testimony) => {
              const { title, published, content, created_at } = testimony;
              return (
                <Card
                  key={testimony?.id}
                  title={title}
                  published={published}
                  content={content}
                  createdAt={created_at}
                  id={testimony.id}
                  onEditClick={() => setCurrEditItemID(testimony?.id)}
                  publishTestimony={publishTestimony}
                />
              );
            })}
          </section>
        )}
      </section>

      {testimonyData && !testimonyData?.length ? (
        <p className="w-full text-center pt-10">No Testimonies Found!</p>
      ) : null}

      {/* Pagination */}
      {testimonyData?.length > 0 && (
        <div className="absolute bottom-0 right-[45%]">
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {currEditItemID && (
        <UpdateTestimonyModal
          editItemId={currEditItemID}
          onResetEditId={() => {
            setCurrEditItemID(null);
            setCurrEditItem(null);
          }}
          handleSubmit={updateTestimony}
          buttonText="Update"
          editItemData={currEditItem}
        />
      )}

      {type == "delete" && <DeleteModal deleteFunc={deleteTestimony} />}

      {/* {type === "add" && (
        <TestimonyModal
          handleSubmit={updateTestimony}
          buttonText="Add Testimony"
        />
      )} */}
    </section>
  );
};

export default Testimonials;
