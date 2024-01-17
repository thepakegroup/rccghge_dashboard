"use client";

import AdminInfo from "@/components/Admin/AdminInfo";
import EditAdmin from "@/components/Admin/EditAdmin";
import DeleteModal from "@/components/DeleteModal";
import Loader from "@/components/Loader";
import { useFetchData } from "@/hooks/fetchData";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import useUpdateToast from "@/hooks/updateToast";
import { useAppSelector } from "@/store/hooks";
import { adminI } from "@/util/interface/admin";
import Image from "next/image";
import { useEffect, useState, Fragment, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { post, remove } from "@/helper/apiFetch";

const Admin = () => {
  const type = useGetTypeOfModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("admin");
  const updateToast = useUpdateToast();
  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<any | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const { id } = useAppSelector((state) => state.mediaItems);

  // Header and token
  const token = Cookies.get("token");

  const headers = useMemo(() => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // Load All Admins
  const { data, loading, fetchData } = useFetchData({
    url: `admins`,
    method: "client",
  });
  const admins: adminI[] = data?.message;

  // Create Admin
  const createAdmin = async (e: any) => {
    if (email === "") {
      updateToast({
        title: "Email cannot be empty!",
        info: "Please provide your email address",
      });

      return;
    } else if (password === "") {
      updateToast({
        title: "Password cannot be empty!",
        info: "Please provide your password",
      });

      return;
    }

    e.preventDefault();
    setLoader(true);
    const adminLevel = level === "admin" ? "2" : "1";

    try {
      const res = await post(`admin/create`, {
        email,
        password,
        level: adminLevel,
      });

      fetchData();
      updateToast({
        title: "Admin added!",
        info: email,
      });
      setPassword("");
      setLevel("admin");
      setEmail("");
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

  // Delete Admin
  const deleteAdmin = async () => {
    setLoader(true);

    try {
      const res = await remove(`admin/${id}`);

      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
    } catch (error) {
      setLoader(false);
      updateToast({
        type: "error",
        title: "Error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // Update Admin
  const updateMedia = async (adminInfo: any) => {
    setLoader(true);
    const adminData = {
      ...adminInfo,
      id,
    };

    try {
      const res = await post(`admin/update`, adminData);

      fetchData();
      updateToast({
        title: "Admin updated!",
        info: adminInfo.email,
      });

      setPassword("");
      setLevel("admin");
      setEmail("");
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

  const sortOptions = [{ name: "admin" }, { name: "super admin" }];

  return (
    <section className="max-w-full md:max-w-[90vw] lg:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Manage Admins</h1>
      <form className="flex flex-col justify-start md:grid md:grid-cols-8 gap-[12px] mt-9 md:items-end">
        <label htmlFor="email" className="input-field col-span-3 w-full">
          <span>Admin email</span>
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              // value={email}
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
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              // value={password}
              type={showPassword ? "text" : "password"}
              className="input"
            />
            {showPassword ? (
              <Image
                src="icons/eyeoff.svg"
                alt=""
                width={20}
                height={20}
                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Image
                src="icons/eye.svg"
                alt=""
                width={20}
                height={20}
                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
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
          {loading || loader ? (
            <Loader />
          ) : (
            admins?.map((admin) => {
              return (
                <AdminInfo
                  key={admin.id}
                  email={admin.email}
                  id={admin.id}
                  level={admin.level}
                  onEditClick={() => {
                    setCurrEditItemID(admin.id);
                    setCurrEditItem(admin);
                  }}
                />
              );
            })
          )}
        </div>
      </div>
      {type == "modify" && (
        <EditAdmin
          onResetEditId={() => {
            setCurrEditItemID(null);
            setCurrEditItem(null);
          }}
          editItemData={currEditItem}
          editItemId={currEditItemID}
          handleSubmit={updateMedia}
        />
      )}
      {type == "delete" && <DeleteModal deleteFunc={deleteAdmin} />}
    </section>
  );
};

export default Admin;
