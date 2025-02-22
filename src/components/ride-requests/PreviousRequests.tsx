import React, { Dispatch, SetStateAction, useState } from "react";
import { RideRequestProp } from "./request-prop";
import { Button } from "../base-components/button";
import { CalenderIcon, RideRequestIcon, Trash } from "@/icons";
import dayjs from "dayjs";
import useUpdateToast from "@/hooks/updateToast";
import { remove } from "@/helper/apiFetch";
import { QueryObserverResult } from "@tanstack/react-query";
import { DeleteModalV2 } from "../base-components/DeleteModalV2";

export const PreviousRequests = ({
  setShowModal,
  data,
  getRequests,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  data: RideRequestProp[];
  getRequests: () => Promise<QueryObserverResult<Error, any>>;
}) => {
  const updateToast = useUpdateToast();
  const previousRequests = data?.filter((req) => req.attended_to === true);
  //
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  //
  const deleteRequest = async () => {
    try {
      setDeleting(true);
      const res = await remove(`/ride-request/${id}`);
      if (res.status === 200 || res.status === 201 || res.statusText === "OK") {
        updateToast({
          title: `SuccessFul!`,
          type: "update",
          info: `${res.data?.message}`,
        });
        setShowModal(false);
        setShowDelete(false);
        await getRequests();
      }
    } catch (error: any) {
      updateToast({
        title: `Error!`,
        type: "error",
        info: `${error.response.data?.message}`,
      });
    } finally {
      setDeleting(false);
    }
  };
  //
  return (
    <div>
      <div className="flex flex-col gap-5">
        {previousRequests?.length < 1 && (
          <div className="w-full h-[250px] flex justify-center items-center">
            <p>No Previous Ride Requests at the moment</p>
          </div>
        )}
        {previousRequests?.map((item) => (
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
                setId(item?.id.toString());
                setShowDelete(true);
              }}
              label=""
              icon={<Trash size="30" />}
              className="bg-transparent flex justify-center items-center"
            />
          </div>
        ))}
      </div>
      {/*  */}
      {showDelete && (
        <DeleteModalV2
          setShowModal={setShowDelete}
          deleting={deleting}
          deleteFunc={deleteRequest}
        />
      )}
    </div>
  );
};
