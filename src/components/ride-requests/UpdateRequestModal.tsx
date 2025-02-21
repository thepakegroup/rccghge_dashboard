import { Dispatch, SetStateAction } from "react";
import { RideRequestProp } from "./request-prop";
import { MotionDiv, MSection } from "@/util/motion-exports";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "../base-components/button";

export const UpdateRequestModal = ({
  setShowModal,
  selectedRequest,
  setSelectedRequest,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedRequest: RideRequestProp | null;
  setSelectedRequest: Dispatch<SetStateAction<RideRequestProp | null>>;
}) => {
  //
  const { register } = useForm({
    values: {
      name: selectedRequest?.name || "",
      address: selectedRequest?.address || "",
      mobile_number: selectedRequest?.mobile_number || "",
      date: selectedRequest?.date || "",
      passengers: selectedRequest?.passengers || "",
    },
  });
  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black z-50 fixed top-0 w-full h-full left-0 flex flex-col justify-center items-center bg-opacity-30"
    >
      <MSection
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-white px-[27px] flex flex-col gap-[18px] py-6 w-full max-w-[60%] lg:max-w-[40%] m-auto rounded-lg"
      >
        {/* header */}
        <div
          onClick={() => {
            setSelectedRequest(null);
            setShowModal(false);
          }}
          className="flex-center mb-[2px] justify-between font-semibold text-base text-orange cursor-pointer"
        >
          <div className="flex gap-1 ml-auto">
            <span>Close</span>
            <Image
              src="icons/close.svg"
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* content */}
        <label htmlFor="location" className="input-field font-quicksand">
          <span>Member&apos;s name</span>
          <input
            type="text"
            id="location"
            className="input font-quicksand"
            {...register("name")}
          />
        </label>
        <label htmlFor="Phone Number" className="input-field font-quicksand">
          <span>Phone Number</span>
          <input
            type="tel"
            id="Phone Number"
            className="input font-quicksand"
            {...register("mobile_number")}
          />
        </label>
        <label htmlFor="address" className="input-field font-quicksand">
          <span>Address</span>
          <input
            type="text"
            id="address"
            className="input font-quicksand"
            {...register("address")}
          />
        </label>
        <label htmlFor="passengers" className="input-field font-quicksand">
          <span>Number of passengers</span>
          <input
            type="text"
            id="passengers"
            className="input font-quicksand"
            {...register("passengers")}
          />
        </label>

        <Button
          label="Add To List"
          className="w-[97%] sm:w-[90%] rounded-sm h-[55px] flex justify-center items-center mx-auto"
        />
      </MSection>
    </MotionDiv>
  );
};
