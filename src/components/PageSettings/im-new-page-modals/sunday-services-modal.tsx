import dynamic from "next/dynamic";
import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { formats, modules } from "@/components/quill-config/confiig";
import { post } from "@/helper/apiFetch";
import { MForm, MotionDiv } from "@/util/motion-exports";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { sundayServicesType } from "@/util/interface/settings";
import Image from "next/image";
import { UploadImgIcon } from "@/icons/upload-img-icon";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

export const SundayServicesModal = ({
  data,
  toast,
  getPageData,
  setShowModal,
}: {
  data: sundayServicesType;
  getPageData: () => Promise<void>;
  toast: any;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  //
  const [updating, setUpdating] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [image_prev, setImagePrev] = useState<string>(data?.pageImage || "");
  // form configs
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      section: "SUNDAY_SERVICE",
      adultsText: data?.adultsText,
      adultYoutubeLink: data?.adultYoutubeLink,
      onlineChurchLink: data?.onlineChurchLink,
      nextGenYouthText: data?.nextGenYouthText,
      nextGenYoutubeLink: data?.nextGenYoutubeLink,
      nextGenKidText: data?.nextGenKidText,
    },
  });
  //
  const uploadSectionImage = (event: any) => {
    setImagePrev("");
    setImage(null);
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePrev(URL.createObjectURL(file));
    }
  };
  //
  const updateSundayServices = async (data: sundayServicesType) => {
    setUpdating(true);
    try {
      const formData = new FormData();
      if (!image_prev)
        return toast({
          title: `Image field is empty`,
          type: "error",
        });
      formData.append("section", data?.section as string);
      formData.append("adultsText", data?.adultsText);
      formData.append("adultYoutubeLink", data?.adultYoutubeLink);
      formData.append("onlineChurchLink", data?.onlineChurchLink);
      formData.append("nextGenYouthText", data?.nextGenYouthText);
      formData.append("nextGenYoutubeLink", data?.nextGenYoutubeLink);
      formData.append("nextGenKidText", data?.nextGenKidText);
      if (image !== null) formData.append("page_image", image);
      const res = await post(
        "/page-setting/iam-new-page-extra",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        setShowModal(false);
        toast({
          title: `${"Content updated successfully."}`,
        });
        await getPageData();
      }
    } catch (error: any) {
    } finally {
      setUpdating(false);
    }
  };
  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={"update-sunday-services-content"}
      className="fixed top-0 left-0 w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
    >
      <MotionDiv
        initial={{ scale: 0.89 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.89 }}
        className="overflow-y-auto w-[90%] sm:w-[600px] mx-auto h-[480px] bg-light-200 rounded-[10px] p-6"
      >
        <h2 className="text-lg font-semibold my-3">Sunday Services</h2>
        <MForm
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(updateSundayServices)}
        >
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md">
            <label htmlFor="" className="flex flex-col gap-1">
              <p className="font-semibold">Adults</p>
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                defaultValue={data?.adultsText}
                onChange={(event: any) => setValue("adultsText", event)}
              />
              <small className="text-xs text-red-500">
                {errors?.adultsText?.message}
              </small>
            </label>
            {/*  */}
            <label htmlFor="" className="flex flex-col gap-1">
              <p className="font-semibold">Yoube Link</p>
              <input
                type="url"
                className="im-new-page-inputs"
                {...register("adultYoutubeLink", {
                  required: "This field is required",
                })}
              />
              <small className="text-xs text-red-500">
                {errors?.adultYoutubeLink?.message}
              </small>
            </label>
            {/*  */}
            <label htmlFor="" className="flex flex-col gap-1">
              <p className="font-semibold">Online Church Link</p>
              <input
                type="url"
                className="im-new-page-inputs"
                {...register("onlineChurchLink", {
                  required: "This field is required",
                })}
              />
              <small className="text-xs text-red-500">
                {errors?.onlineChurchLink?.message}
              </small>
            </label>
            {/*  */}
          </div>
          {/*  */}
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md">
            <label htmlFor="" className="flex flex-col gap-1">
              <p className="font-semibold">Nextgen Youths</p>
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                defaultValue={data?.adultsText}
                onChange={(event: any) => setValue("nextGenYouthText", event)}
              />
              <small className="text-xs text-red-500">
                {errors?.nextGenYouthText?.message}
              </small>
            </label>
            {/*  */}
            <label htmlFor="" className="flex flex-col gap-1">
              <p className="font-semibold">Yoube Link</p>
              <input
                type="url"
                className="im-new-page-inputs"
                {...register("nextGenYoutubeLink", {
                  required: "This field is required",
                })}
              />
              <small className="text-xs text-red-500">
                {errors?.nextGenYoutubeLink?.message}
              </small>
            </label>
            {/*  */}
          </div>
          {/*  */}
          <div className="flex flex-col gap-2 p-2 bg-white rounded-md">
            <label htmlFor="" className="flex flex-col gap-1">
              <p className="font-semibold">Nextgen Kids</p>
              <QuillEditor
                className="write-editor"
                formats={formats}
                modules={modules}
                defaultValue={data?.adultsText}
                onChange={(event: any) => setValue("nextGenKidText", event)}
              />
              <small className="text-xs text-red-500">
                {errors?.nextGenKidText?.message}
              </small>
            </label>
            {/*  */}
          </div>
          {/*  */}
          {/* Image input */}
          <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
            <h4 className="font-semibold mb-3">Page Image</h4>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="sunday_service_section_img"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                setImage(file);
                setImagePrev(URL.createObjectURL(file));
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                id="sunday_service_section_img"
                onChange={uploadSectionImage}
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
              {image_prev && (
                <div key={image_prev} className="relative w-[150px] h-[90px]">
                  <Image
                    src={image_prev}
                    alt={image_prev}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button
              label={updating ? "Saving" : "Save settings"}
              disabled={updating}
              icon={updating ? <BtnLoader /> : null}
            />
            <Button
              label="Cancel"
              className="!bg-gray-300 !text-black/70"
              type="button"
              onClick={() => setShowModal(false)}
              disabled={updating}
            />
          </div>
        </MForm>
      </MotionDiv>
    </MotionDiv>
  );
};
