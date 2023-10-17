"use client";

import AdminInfo from "@/components/Admin/AdminInfo";
import EditAdmin from "@/components/Admin/EditAdmin";
import DeleteModal from "@/components/DeleteModal";
import Loader from "@/components/Loader";
import { useFetchData } from "@/hooks/fetchData";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import useUpdateToast from "@/hooks/updateToast";
import { useAppSelector } from "@/store/hooks";
import { baseUrl } from "@/util/constants";
import { adminI } from "@/util/interface/admin";
import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const Admin = () => {
  const type = useGetTypeOfModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("admin");

  const { id } = useAppSelector((state) => state.mediaItems);
  const { data, loading, fetchData } = useFetchData({
    url: `${baseUrl}admins`,
    method: "client",
  });
  const admins: adminI[] = data?.message;

  const updateToast = useUpdateToast();

  const createAdmin = async (e: any) => {
    e.preventDefault();
    const adminLevel = level === "admin" ? "2" : "1";

    const res = await fetch("/api/createAdmin", {
      method: "POST",
      body: JSON.stringify({ email, password, level: adminLevel }),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: "Admin added!",
        info: email,
      });
      setPassword("");
      setLevel("");
      setEmail("");
    }
  };

  const deleteAdmin = async () => {
    const res = await fetch(`/api/deleteAdmin/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
      });
    }
  };

  const updateMedia = async (adminInfo: any) => {
    const adminData = {
      ...adminInfo,
      id,
    };

    const res = await fetch(`/api/updateAdmin`, {
      method: "POST",
      body: JSON.stringify(adminData),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: "Admin updated!",
        info: adminInfo.email,
      });
    }
  };

  const sortOptions = [{ name: "admin" }, { name: "super admin" }];

  return (
    <section className="max-w-full md:max-w-[90vw] lg:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Manage Admins</h1>
      <form className="flex flex-col justify-start md:grid md:grid-cols-8 gap-[12px] mt-9 md:items-end">
        <label htmlFor="email" className="input-field col-span-3 w-full">
          <span>Admin email</span>
          <div className="relative z-10">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="input"
            />
            <Image
              src="icons/mail.svg"
              alt=""
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 right-3"
            />
          </div>
        </label>
        <label htmlFor="password" className="input-field col-span-2 w-full">
          <span>Admin password</span>
          <div className="relative z-10">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="input"
            />
            <Image
              src="icons/eye.svg"
              alt=""
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 right-3"
            />
          </div>
        </label>
        <label htmlFor="level" className="input-field col-span-2 w-full">
          <span>Admin level</span>

          <Listbox value={level} onChange={setLevel}>
            <div className="relative">
              <Listbox.Button className="relative w-full min-w-[127px] gap-3 border border-[#d0d5dd] rounded-md bg-white p-4 cursor-pointer text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                <span className="block truncate capitalize text-sm md:text-base">
                  {level || " "}
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
                            className={`block truncate capitalize text-sm ${
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
        <div className="!w-full md:col-span-1 flex items-center">
          <button
            onClick={createAdmin}
            className="w-full md:w-fit bg-[#052A53] text-white rounded-md px-4 py-4"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-9 bg-white rounded-lg px-6 overflow-x-scroll !w-full">
        <div className="text-sm min-w-[700px]  no-scrollbar font-medium [&>div]:grid [&>div]:grid-cols-5 [&>div]:py-4">
          <div className="">
            <p className="col-span-2">Email</p>
            <p>Password</p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            admins?.map((admin) => {
              return (
                <AdminInfo
                  key={admin.id}
                  email={admin.email}
                  id={admin.id}
                  level={admin.level}
                />
              );
            })
          )}
        </div>
      </div>
      {type == "modify" && <EditAdmin handleSubmit={updateMedia} />}
      {type == "delete" && <DeleteModal deleteFunc={deleteAdmin} />}
    </section>
  );
};

export default Admin;
