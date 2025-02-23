"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Home/Card";
import ScrollModalToTop from "@/components/Home/ScrollModal";
import Image from "next/image";
import DeleteModal from "@/components/DeleteModal";
import ModifyModal from "@/components/Home/ModifyModal";
import AddItemButton from "@/components/AddItemButton";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import { mediaI } from "@/util/interface/media";
import { useFetchData } from "@/hooks/fetchData";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearItems,
  setFileName,
  setMediaFile,
} from "@/store/slice/mediaItems";
import { labels } from "@/util/constants";
import useUpdateToast from "@/hooks/updateToast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import UpdateModal from "@/components/Home/UpdateModal";
import { post } from "@/helper/apiFetch";
import { useRouter } from "next/navigation";
import { useCtx } from "@/providers/ctx-provider";

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

export default function Home() {
  const type = useGetTypeOfModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  //
  const router = useRouter();

  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<EditItem | null>(null);
  const { items, file, id } = useAppSelector((state: any) => state.mediaItems);
  const [loader, setLoader] = useState(false);

  const { data, loading, fetchData } = useFetchData({
    url: `load-all-media`,
    method: "client",
  });

  const postData = {
    ids: items,
  };

  const { ctx } = useCtx();

  useEffect(() => {
    if (ctx === "web_edit") {
      router.push("/home-web");
    }
    //
    if (currEditItemID) {
      const EditItem = data?.message?.filter(
        (item: any) => item.id === currEditItemID
      )[0];

      setCurrEditItem(EditItem);
    }
  }, [currEditItemID, data, ctx]);

  // Delete Media
  const handleRemoveMedia = async () => {
    setLoader(true);

    try {
      const res = await post("remove-media", postData);

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

  // Create & Update Media Info
  const updateMedia = async (mediaInfo: any) => {
    setLoader(true);
    const form = new FormData();

    mediaInfo.media &&
      form.append("media", mediaInfo.media as Blob, mediaInfo.media?.name);
    form.append("name", mediaInfo.name);
    form.append("media_type", mediaInfo.media_type);
    form.append("short_description", mediaInfo.short_description);
    form.append("link", mediaInfo.link);
    type === "modify" && form.append("id", `${id}`);

    try {
      const res = await post(
        `${type == "modify" ? `update-media` : `upload-media`}`,
        form,
        "multipart/form-data"
      );

      fetchData();
      updateToast({
        title: `Media ${type === "modify" ? "updated!" : "added!"}`,
        info: mediaInfo.name,
      });

      setLoader(false);
      dispatch(clearItems());
      dispatch(setFileName(""));
      dispatch(setMediaFile(""));
    } catch (error) {
      setLoader(false);

      updateToast({
        title: `Error`,
        type: "error",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  const mediaData: mediaI[] = data?.message;

  return (
    <section className="w-full mt-4">
      <div className="flex justify-end mt-2">
        <AddItemButton title="Add media" />
      </div>

      {loading || loader ? (
        <Loader />
      ) : (
        <section className="flex flex-col gap-6">
          {labels.map((label) => {
            return (
              <section key={label.value} className="" id={label.value}>
                <div className="flex-center gap-1 ">
                  <Image src="icons/img.svg" alt="" width={18} height={18} />
                  <p className="text-base text-fade-ash font-bold">
                    {label.label} Images
                  </p>
                </div>
                <div className="card-wrapper">
                  {mediaData?.map((media) => {
                    return (
                      label.value === media.type && (
                        <Card
                          title={media.name}
                          img={media.image_url}
                          id={media.id}
                          key={media.id}
                          home={true}
                          type={media.type}
                          onEditClick={() => setCurrEditItemID(media.id)}
                        />
                      )
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>
      )}

      <ScrollModalToTop />

      {currEditItemID && (
        <UpdateModal
          editItemId={currEditItemID}
          onResetEditId={() => {
            setCurrEditItemID(null);
            setCurrEditItem(null);
          }}
          handleSubmit={updateMedia}
          buttonText="Update"
          editItemData={currEditItem}
          loading={loader}
        />
      )}

      {type == "add" && (
        <ModifyModal handleMSubmit={updateMedia} buttonText="Add Media" />
      )}

      {type == "delete" && (
        <DeleteModal deleteFunc={handleRemoveMedia} itemsCount={items.length} />
      )}
    </section>
  );
}
