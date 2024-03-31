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
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import UpdateModal from "@/components/ManageEvents/UpdateModal";
import { post } from "@/helper/apiFetch";
import PaginationButtons from "@/components/PaginationButtons";

const ManageEvents = () => {
  const type = useGetTypeOfModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<eventI | null>(null);
  const [loader, setLoader] = useState(false);
  const { items, file, id } = useAppSelector((state) => state.mediaItems);
  const [currentPage, setCurrentPage] = useState(1);

  //Fetch All Data
  const { data, loading, fetchData, metadata } = useFetchData({
    url: `events/${currentPage}`,
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
    try {
      const res = await post("delete-event", postData);

      fetchData();
      dispatch(clearItems());

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

  // Update Event
  const updateMedia = async (mediaInfo: any) => {
    setLoader(true);
    const form = new FormData();

    mediaInfo.banner &&
      form.append("banner", mediaInfo.banner as Blob, mediaInfo.banner?.name);
    form.append("title", mediaInfo.title);
    form.append("location", mediaInfo.location);
    form.append("short_description", mediaInfo.short_description);
    form.append("start_date", mediaInfo.start_date);
    form.append("end_date", mediaInfo.end_date);
    type === "modify" && form.append("id", `${id}`);

    try {
      const res = await post(
        `${type == "modify" ? `update-event` : `create-event`}`,
        form,
        "multipart/form-data"
      );

      fetchData();
      updateToast({
        title: `Event ${type === "modify" ? "updated!" : "added!"}`,
        info: mediaInfo.name,
      });

      setLoader(false);
      dispatch(clearItems());
      dispatch(setFileName(""));
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error`,
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

      {events && !events.length ? (
        <p className="w-full text-center pt-10">No Events Found!</p>
      ) : null}

      {/* Pagination */}
      {events?.length > 0 && (
        <div className="absolute bottom-0 right-[45%]">
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

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
