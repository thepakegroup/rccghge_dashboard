"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { post, remove } from "@/helper/apiFetch";
import { CancelIcon } from "@/icons/cancel-icon";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { DeletingImageLoader } from "../deleting-image-loader";
import useUpdateToast from "@/hooks/updateToast";

interface galleryProps {
  item_url: string;
  id: number;
}
export const Galleries = ({
  gallery,
  getBackPageInfo,
  setShowGallery,
}: {
  gallery: galleryProps[];
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
  setShowGallery: Dispatch<SetStateAction<boolean>>;
}) => {
  const updateToast = useUpdateToast();
  // states
  const [galleryPreview, setGalleryPreview] = useState<any>(
    gallery?.map((url) => url?.item_url) || []
  );
  const [gallerySelected, setGallerySelected] = useState<any>([]);
  //
  const [deleting, setDeleting] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  //
  const uploadGalleryImg = (e: any) => {
    setGalleryPreview(gallery?.map((url) => url?.item_url));
    const files = Array.from(e.target.files);
    files.forEach((file: any) => {
      setGalleryPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setGallerySelected([...files]);
  };
  //
  const handleGalleryDrop = (files: FileList) => {
    setGalleryPreview(gallery?.map((url) => url?.item_url));
    const filesArray = Array.from(files);
    filesArray.forEach((file: any) => {
      setGalleryPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setGallerySelected([...filesArray]);
  };
  //
  // handle remove (delete) image
  const removeImage = async (id: number) => {
    setDeleting(true);
    try {
      const res = await remove(`/ministry-page/image/${id}`);
      if (res.statusText === "OK") {
        setShowGallery(false);
        await getBackPageInfo();
        updateToast({
          title: `Success`,
          type: "update",
          info: `${res.data?.message}`,
        });
      }
    } catch (error: any) {
      updateToast({
        title: `Error`,
        type: "error",
        info: `${error.response?.data?.message}`,
      });
    } finally {
      setDeleting(false);
    }
  };
  //
  // edit section function
  const editSection = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (gallerySelected.length > 0) {
        gallerySelected.forEach((file: any) => {
          formData.append("gallery_images", file);
        });
      }
      const res = await post(
        "/ministry-page/youth/gallery-item",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        setShowGallery(false);
        await getBackPageInfo();
        updateToast({
          title: `Success`,
          type: "update",
          info: `${res.data?.message}`,
        });
      }
    } catch (error: any) {
      updateToast({
        title: `Error`,
        type: "error",
        info: `${error.response?.data?.message}`,
      });
    } finally {
      setSaving(false);
    }
  };
  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 h-screen overflow-hidden right-0 z-[887] bg-black/40 backdrop-blur-sm flex items-center justify-center"
    >
      <form
        className="W-[95%] sm:w-[600px] h-[90%] overflow-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Image input */}
        <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
          <h4 className="font-play-fair-display font-semibold mb-3">
            Add Background Image
          </h4>
          <label
            className="flex flex-col gap-1 cursor-pointer justify-center items-center"
            htmlFor="gallery_image"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleGalleryDrop(e.dataTransfer.files);
            }}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              id="gallery_image"
              multiple
              onChange={uploadGalleryImg}
            />
            <div className="flex flex-col gap-2 items-center border-[1.5px] border-dashed p-3 rounded-lg">
              <UploadImgIcon />
              <div className="flex items-center gap-1">
                <p className="text-orange">Click to upload</p>
                <p>or drag and drop</p>
              </div>
              <p className="text-xs text-fade-ash">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </label>
          <div className="flex flex-wrap items-center gap-2 justify-center mb-3 mt-3">
            {galleryPreview?.map((url: any) => (
              <div key={url} className="relative w-[150px] h-[90px]">
                <Image
                  src={url}
                  alt={url}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-md"
                />
                <div
                  className="absolute top-[5px] right-[5px] flex items-center h-[26px] w-[26px] justify-center cursor-pointer bg-black/20 backdrop-blur-sm rounded-full"
                  onClick={(event: any) => {
                    const imgId = gallery?.find(
                      (item: any) => item.item_url === url
                    );
                    removeImage(imgId?.id as number);
                  }}
                >
                  <CancelIcon />
                </div>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-2 mt-5">
            <Button
              label={saving ? "Saving" : "Save Settings"}
              disabled={saving}
              icon={saving ? <BtnLoader /> : null}
              type="submit"
              onClick={editSection}
            />
            <Button
              className="!bg-fade-ash/40 !text-black/80"
              label="Cancel"
              disabled={saving}
              onClick={() => setShowGallery(false)}
              type="button"
            />
          </div>
        </div>
      </form>
      <DeletingImageLoader deleting={deleting} />
    </MotionDiv>
  );
};
