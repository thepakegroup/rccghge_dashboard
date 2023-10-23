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
import { baseUrl } from "@/util/constants";
import { testimonyI } from "@/util/interface/testimony";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import UpdateTestimonyModal from "@/components/Testimonies/UpdateTestimonyModal";
import axios from "axios";
import Cookies from "js-cookie";

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

  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<testimonyI | null>(null);

  const { data, loading, fetchData } = useFetchData({
    url: `${baseUrl}testimonies/{sort}/{page}`,
    method: "client",
  });

  const testimonies: testimonyI[] = data?.message.data;

  const [testimoniesData, setTestimoniesData] =
    useState<testimonyI[]>(testimonies);

  useEffect(() => {
    setTestimoniesData(testimonies);

    if (currEditItemID) {
      const EditItem = testimoniesData?.filter(
        (item: any) => item.id === currEditItemID
      )[0];

      setCurrEditItem(EditItem);
    }
  }, [testimonies, currEditItemID, testimoniesData]);

  // Delete Testimony
  const deleteTestimony = async () => {
    const token = Cookies.get("token");
    const res = await axios.delete(`${baseUrl}testimonies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res?.data;
    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
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
    const updateData = {
      title,
      content,
      id: editItemId,
    };

    const token = Cookies.get("token");
    const res = await axios.post(`${baseUrl}testimonies/update`, updateData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res?.data;
    if (data?.error === false) {
      fetchData();
      updateToast({
        title: `Testimony updated!`,
        info: title,
      });
    }
  };

  // Publish Testimony
  const publishTestimony = async (published: boolean, id: number) => {
    const token = Cookies.get("token");
    const res = await axios.post(
      `${baseUrl}testimonies/publish`,
      JSON.stringify({ id, published: !published }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res?.data;
    updateToast({
      title: `${published ? "Unpublished" : "Published"}`,
    });

    if (data.error === false) {
      fetchData();
    }
  };

  // Search Functionality
  const searchTestimonies = (title: string) => {
    if (!title) {
      setTestimoniesData(testimonies);
      return;
    }

    const filteredTestimonies = testimonies.filter((item) => {
      return item.title.toLowerCase().includes(title.toLowerCase());
    });
    setTestimoniesData(filteredTestimonies);
  };

  // Sort Functionality
  const sortOptions = [{ name: "Most recent" }, { name: "Older" }];
  const [selected, setSelected] = useState("");

  return (
    <section>
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
              onChange={(e) => searchTestimonies(e.target.value)}
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
                        stroke-width="2.25"
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

        {loading ? (
          <Loader />
        ) : (
          <section className="mt-4 card-wrapper">
            {testimoniesData?.map((testimony) => {
              const { title, published, content, created_at } = testimony;
              return (
                <Card
                  key={testimony.id}
                  title={title}
                  published={published}
                  content={content}
                  createdAt={created_at}
                  id={testimony.id}
                  onEditClick={() => setCurrEditItemID(testimony.id)}
                  publishTestimony={publishTestimony}
                />
              );
            })}
          </section>
        )}
      </section>

      {testimoniesData && !testimoniesData.length ? (
        <p className="w-full text-center pt-10">No Testimonies Found!</p>
      ) : null}

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
