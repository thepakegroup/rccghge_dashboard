"use client";

import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import useCloseModal from "@/hooks/closeModal";
import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
interface editAdminI {
  handleSubmit: (mediaInfo: any) => void;
  onResetEditId: () => void;
  editItemData: any;
  editItemId: number | null;
}

const EditAdmin = ({
  handleSubmit,
  editItemData,
  editItemId,
  onResetEditId,
}: editAdminI) => {
  const handleCloseModal = useCloseModal();

  const [email, setEmail] = useState(editItemData?.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState(
    editItemData?.level === 2 ? "admin" : "super admin"
  );

  const submitForm = () => {
    const adminLevel = level === "admin" ? "2" : "1";
    handleSubmit({ email, password, level: adminLevel });
    handleCloseModal();
  };

  const sortOptions = [{ name: "admin" }, { name: "super admin" }];

  return (
    <ModalWrapper>
      <div onClick={(e) => e.stopPropagation()} className="modal pb-8">
        <div
          onClick={handleCloseModal}
          className="flex-center justify-end font-semibold text-base text-orange cursor-pointer"
        >
          <span>Close</span>
          <Image
            src="icons/close.svg"
            alt=""
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <form className="flex flex-col gap-[1.19rem]">
          <label htmlFor="email" className="input-field flex-1 relative">
            <span>Admin email</span>
            <div className="relative">
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
          <label htmlFor="password" className="input-field relative">
            <span>Admin password</span>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
          <label htmlFor="level" className="input-field flex-1">
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
          <button
            onClick={submitForm}
            className="px-6 py-4 bg-orange w-full text-white rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditAdmin;
