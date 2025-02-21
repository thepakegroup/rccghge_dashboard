"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { DeletingImageLoader } from "@/components/ministry-departments/deleting-image-loader";
import { GoBack } from "@/components/ministry-departments/go-back";
import { PageLoader } from "@/components/ministry-departments/page-loader";
import { Galleries } from "@/components/ministry-departments/youth-ministry-components/galleries";
import { OurMission } from "@/components/ministry-departments/youth-ministry-components/our-mission";
import { OurPrograms } from "@/components/ministry-departments/youth-ministry-components/our-programs";
import { OurTeams } from "@/components/ministry-departments/youth-ministry-components/our-teams";
import { formats, modules } from "@/components/quill-config/confiig";
import { get, post, remove } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { CancelIcon } from "@/icons/cancel-icon";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

interface pageInfo {
  heading_text: string;
  heading_description: string;
  subheading_text: string;
  subheading_description: string;
}
const YouthMinistryPage = () => {
  const updateToast = useUpdateToast();
  //states
  const [bgPreview, setBgPreview] = useState<any[]>([]);
  const [selectedBgImg, setSelectedBgImg] = useState<any[]>([]);
  const [pageInfo, setPageInfo] = useState<pageInfo>({
    heading_text: "",
    heading_description: "",
    subheading_text: "",
    subheading_description: "",
  });
  //
  const [deleting, setDeleting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  //
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [showOurMission, setShowOurMission] = useState<boolean>(false);
  const [showOurPrograms, setShowOurPrograms] = useState<boolean>(false);
  const [showOurTeam, setShowOurTeam] = useState<boolean>(false);
  //
  const {
    data: youth_ministry,
    isLoading: loadingYouthInfo,
    refetch: getBackPageInfo,
  } = useQuery({
    queryKey: ["youth_ministry"],
    queryFn: async () => {
      const res = await get(`/ministry-page/youth-page`);
      const data = res.data.data;
      setPageInfo({
        heading_text: data?.settings?.settings?.heading_text,
        heading_description: data?.settings?.settings?.heading_description,
        subheading_text: data?.settings?.settings?.subheading_text,
        subheading_description:
          data?.settings?.settings?.subheading_description,
      });
      setBgPreview(res.data.data?.sliders.map((url: any) => url?.item_url));
      return res.data;
    },
    select: (data) => data.data,
  });
  // drag and drop function
  const handleBgImageDrop = (files: FileList) => {
    const filesArray = Array.from(files);
    filesArray.forEach((file: any) => {
      setBgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSelectedBgImg([...filesArray]);
  };
  // upload image function
  const uploadBgImage = (e: any) => {
    const files = Array.from(e.target.files);
    files.forEach((file: any) => {
      setBgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSelectedBgImg([...files]);
  };
  // remove image function
  const removeImage = async (id: string) => {
    setDeleting(true);
    try {
      const res = await remove(`/ministry-page/image/${id}`);
      if (res.statusText === "OK" || res.status === 200 || res.status === 201) {
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
  // edit Page function
  const editPage = async () => {
    setEditing(true);
    try {
      const formData = new FormData();
      formData.append("heading_text", pageInfo?.heading_text);
      formData.append("heading_description", pageInfo?.heading_description);
      formData.append("subheading_text", pageInfo?.subheading_text);
      formData.append(
        "subheading_description",
        pageInfo?.subheading_description
      );
      if (selectedBgImg.length > 0) {
        selectedBgImg.forEach((file: any) => {
          formData.append("background_images", file);
        });
      }
      const res = await post(
        `/ministry-page/youth/compose`,
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
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
      setEditing(false);
    }
  };
  //
  return (
    <section className="relative px-4 mb-8 mt-8">
      <GoBack header="Youth Ministry" />
      <div className="mt-8">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Manage header content
        </h3>
        {loadingYouthInfo && <PageLoader />}
        {/* form */}
        {youth_ministry && (
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* Image input */}
            <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
              <h4 className="font-play-fair-display font-semibold mb-3">
                Add Background Image
              </h4>
              <label
                className="flex flex-col gap-1 cursor-pointer justify-center items-center"
                htmlFor="bg_image"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleBgImageDrop(e.dataTransfer.files);
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="bg_image"
                  multiple
                  onChange={uploadBgImage}
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
              <div className="flex flex-wrap items-center gap-2 mt-2 justify-center mb-3">
                {bgPreview?.map((url: any) => (
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
                        const imgId = youth_ministry?.sliders?.find(
                          (item: any) => item.item_url === url
                        );
                        removeImage(imgId?.id);
                      }}
                    >
                      <CancelIcon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*  */}
            {/* Header text */}
            <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
              <label className="flex flex-col gap-1" htmlFor="headerText">
                <h4 className="font-play-fair-display font-semibold mb-3">
                  Header Text
                </h4>
                <input
                  id="headerText"
                  type="text"
                  className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                  defaultValue={pageInfo?.heading_text}
                  onChange={(event: any) =>
                    setPageInfo((prev) => ({
                      ...prev,
                      heading_text: event.target.value,
                    }))
                  }
                />
              </label>
              {/*  */}
              <label className="flex flex-col gap-1" htmlFor="headingDesc">
                <h4 className="font-play-fair-display font-semibold mb-3">
                  Header Description
                </h4>
                <input
                  id="heading_description"
                  type="text"
                  className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                  defaultValue={pageInfo?.heading_description}
                  onChange={(event: any) =>
                    setPageInfo((prev) => ({
                      ...prev,
                      heading_description: event.target.value,
                    }))
                  }
                />
              </label>
              {/*  */}
            </div>
            {/* Sub header content */}
            <div className="flex flex-col gap-2 mt-6">
              <h3 className="text-xl font-semibold text-black/80 font-play-fair-display">
                Sub-header content
              </h3>
              <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
                <label className="flex flex-col gap-1" htmlFor="mainContent">
                  <h4 className="font-play-fair-display font-semibold mb-3">
                    Main Content
                  </h4>
                  <input
                    id="mainContent"
                    type="text"
                    className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                    defaultValue={pageInfo?.subheading_text}
                    onChange={(event: any) =>
                      setPageInfo((prev) => ({
                        ...prev,
                        subheading_text: event.target.value,
                      }))
                    }
                  />
                </label>
                {/*  */}
                <label className="flex flex-col gap-1" htmlFor="headingDesc">
                  <h4 className="font-play-fair-display font-semibold mb-3">
                    Sub Content
                  </h4>
                  <textarea
                    id="subheading_text"
                    rows={4}
                    className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3 resize-none"
                    defaultValue={pageInfo?.subheading_description}
                    onChange={(event: any) =>
                      setPageInfo((prev) => ({
                        ...prev,
                        subheading_description: event.target.value,
                      }))
                    }
                  />
                </label>
                {/*  */}
              </div>
            </div>
          </form>
        )}
        <MotionPresence>
          {youth_ministry && showOurMission ? (
            <OurMission
              ourMission={youth_ministry?.settings?.settings?.subsection}
              getBackPageInfo={getBackPageInfo}
              setShowOurMission={setShowOurMission}
            />
          ) : youth_ministry && showOurTeam ? (
            <OurTeams
              teams={youth_ministry?.teams}
              getBackPageInfo={getBackPageInfo}
              setShowOurTeam={setShowOurTeam}
            />
          ) : youth_ministry && showOurPrograms ? (
            <OurPrograms
              ourPrograms={youth_ministry?.programs}
              setShowOurPrograms={setShowOurPrograms}
              getBackPageInfo={getBackPageInfo}
            />
          ) : (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center gap-2 bg-white rounded-lg p-4">
                <p className="font-play-fair-display font-semibold text-black/70 text-sm select-none">
                  Our mission, vision and events
                </p>
                <span
                  className="cursor-pointer select-none text-orange"
                  onClick={() => setShowOurMission(true)}
                >
                  Edit details
                </span>
              </div>
              {/*  */}
              <div className="flex justify-between items-center gap-2 bg-white rounded-lg p-4">
                <p className="font-play-fair-display font-semibold text-black/70 text-sm select-none">
                  Our programs
                </p>
                <span
                  className="cursor-pointer select-none text-orange"
                  onClick={() => setShowOurPrograms(true)}
                >
                  Edit details
                </span>
              </div>
              {/*  */}
              <div className="flex justify-between items-center gap-2 bg-white rounded-lg p-4">
                <p className="font-play-fair-display font-semibold text-black/70 text-sm select-none">
                  Our gallery
                </p>
                <span
                  className="cursor-pointer select-none text-orange"
                  onClick={() => setShowGallery(true)}
                >
                  Edit details
                </span>
              </div>
              {/*  */}
              <div className="flex justify-between items-center gap-2 bg-white rounded-lg p-4">
                <p className="font-play-fair-display font-semibold text-black/70 text-sm select-none">
                  Our great team
                </p>
                <span
                  className="cursor-pointer select-none text-orange"
                  onClick={() => setShowOurTeam(true)}
                >
                  Edit details
                </span>
              </div>
              {/*  */}
            </MotionDiv>
          )}
        </MotionPresence>
      </div>
      <MotionPresence>
        {youth_ministry && showGallery ? (
          <Galleries
            getBackPageInfo={getBackPageInfo}
            gallery={youth_ministry?.gallery}
            setShowGallery={setShowGallery}
          />
        ) : null}
      </MotionPresence>
      <DeletingImageLoader deleting={deleting} />
      <Button
        className="mt-4 py-3"
        label={editing ? "Updating" : "Update Page Settings"}
        disabled={editing}
        icon={editing ? <BtnLoader /> : null}
        onClick={editPage}
        type="submit"
      />
    </section>
  );
};

export default YouthMinistryPage;
