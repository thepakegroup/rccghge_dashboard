import React, { Dispatch, SetStateAction } from "react";
import { RideRequestProp } from "./request-prop";
import { Button } from "../base-components/button";
import { CalenderIcon, RideRequestIcon } from "@/icons";
import dayjs from "dayjs";

export const NewRequests = ({
  setShowModal,
  data,
  setSelectedRequest,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  data: RideRequestProp[];
  setSelectedRequest: Dispatch<SetStateAction<RideRequestProp | null>>;
}) => {
  const newRequests = data?.filter((req) => req?.attended_to === false);
  return (
    <div>
      <div className="flex flex-col gap-5">
        {newRequests?.length < 1 && (
          <div className="w-full h-[250px] flex justify-center items-center">
            <p>No New Ride Requests at the moment</p>
          </div>
        )}
        {newRequests?.map((item) => (
          <div
            key={item?.id}
            className="relative flex justify-between min-[576px]:items-center flex-col min-[570px]:flex-row gap-4 rounded-md px-5 py-5 md:py-8 bg-white"
          >
            <div className="absolute top-2 left-3 text-[#4A4A4A] flex items-center font-quicksand gap-1">
              <CalenderIcon />
              <p className="text-xs">
                {item && dayjs(item?.date).format("DD-MM-YYYY")}
              </p>
            </div>
            {/*  */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[#3D3D3D]">
                <RideRequestIcon size="34" />
              </span>
              <div className="flex flex-col gap-1 font-quicksand text-[#3D3D3D]">
                <h3 className="text-sm font-semibold capitalize">
                  {item?.name}
                </h3>
                <p className="font-medium">Location: {item?.address}</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setSelectedRequest(item);
                setShowModal(true);
              }}
              label="View"
              className="rounded-sm w-fit min-[376px]:w-[89px] h-[37px] flex justify-center items-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
