"use client";

import AddItemButton from "@/components/AddItemButton";
import DeleteModal from "@/components/DeleteModal";
import Card from "@/components/ManageEvents/Card";
import Loader from "@/components/Loader";
import ModifyModal from "@/components/ManageEvents/ModifyModal";
import { useFetchData } from "@/hooks/fetchData";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import useUpdateToast from "@/hooks/updateToast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearItems, setFileName } from "@/store/slice/mediaItems";
import { eventI } from "@/util/interface/events";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";
import { useEffect, useState } from "react";
import UpdateModal from "@/components/ManageEvents/UpdateModal";

const ManageEvents = () => {
  const type = useGetTypeOfModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<eventI | null>(null);
  // const [img, setImg] = useState<File | any>("");
  const [loader, setLoader] = useState(false);
  const { items, file, id } = useAppSelector((state) => state.mediaItems);

  // HandleImage
  // const handleImageChange = (file: File) => {
  //   setImg(file);
  // };

  //Fetch All Data
  const { data, loading, fetchData } = useFetchData({
    url: `${baseUrl}events/{page}`,
    method: "client",
  });

  const events: eventI[] = data?.message.data;

  // Set Edit Data
  useEffect(() => {
    if (currEditItemID) {
      const EditItem = events?.filter(
        (item: any) => item.id === currEditItemID
      )[0];

      setCurrEditItem(EditItem);
    }
  }, [currEditItemID, events]);

  // Token & Header
  const token = Cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const postData = {
    ids: items,
  };

  // Delete Events
  const handleRemoveEvents = async () => {
    setLoader(true);
    const res = await axios.post(`${baseUrl}delete-event`, postData, {
      headers,
    });

    const data = await res?.data;

    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
      dispatch(clearItems());
    }
  };

  // Update Event
  const updateMedia = async (mediaInfo: any) => {
    setLoader(true);
    const form = new FormData();

    mediaInfo.banner &&
      form.append("banner", mediaInfo.banner as Blob, mediaInfo.nammer?.name);
    form.append("title", mediaInfo.title);
    form.append("location", mediaInfo.location);
    form.append("short_description", mediaInfo.short_description);
    form.append("start_date", mediaInfo.start_date);
    form.append("end_date", mediaInfo.end_date);
    type === "modify" && form.append("id", `${id}`);

    const token = Cookies.get("token");

    const res = await axios.post(
      `${
        type == "modify" ? `${baseUrl}update-event` : `${baseUrl}create-event`
      }`,
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
      fetchData();
      updateToast({
        title: `Event ${type === "modify" ? "updated!" : "added!"}`,
        info: mediaInfo.name,
      });

      setLoader(false);
      dispatch(clearItems());
      dispatch(setFileName(""));
    }
  };

  return (
    <section>
      <div className="flex justify-end mt-2">
        <AddItemButton title="Add event" />
      </div>
      <section className="mt-3">
        {loading || loader ? (
          <Loader />
        ) : (
          <div className="card-wrapper">
            {events?.map((event) => {
              return (
                <Card
                  key={event.id}
                  id={event.id}
                  img={event.banner}
                  onEditClick={() => setCurrEditItemID(event.id)}
                />
              );
            })}
          </div>
        )}
      </section>
      {currEditItemID && (
        <UpdateModal
          editItemId={currEditItemID}
          onResetEditId={() => {
            setCurrEditItemID(null);
            setCurrEditItem(null);
          }}
          handleSubmitEvent={updateMedia}
          // handleImageChange={handleImageChange}
          buttonText="Update"
          editItemData={currEditItem}
        />
      )}
      {type == "add" && (
        <ModifyModal
          // handleImageChange={handleImageChange}
          handleSubmitEvent={updateMedia}
          buttonText="Add Event"
        />
      )}

      {type == "delete" && (
        <DeleteModal
          deleteFunc={handleRemoveEvents}
          itemsCount={items.length}
        />
      )}
    </section>
  );
};

export default ManageEvents;
