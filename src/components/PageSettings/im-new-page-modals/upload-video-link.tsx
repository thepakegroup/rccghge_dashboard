import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { post } from "@/helper/apiFetch";
import { notify } from "@/helper/notify";
import { MForm, MotionDiv } from "@/util/motion-exports";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

export const UploadVideoLink = ({
  setShowLinkModal,
  data,
  toast,
  getPageData,
}: {
  setShowLinkModal: Dispatch<SetStateAction<boolean>>;
  data: { url: string };
  getPageData: () => Promise<void>;
  toast: any;
}) => {
  //
  const [saving, setSaving] = useState<boolean>(false);
  // form configs
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      youtubeLink: data?.url,
      section: "PAGE_VIDEO_LINK",
    },
  });
  //
  const updateVideoLink = async (data: {
    youtubeLink: string;
    section: string;
  }) => {
    setSaving(true);
    try {
      const res = await post("/page-setting/iam-new-page-extra", data);
      if (res.statusText === "OK") {
        setShowLinkModal(false);
        toast({
          title: `${"Link uploaded successfully."}`,
        });
        await getPageData();
        notify({ type: "success", message: res.data?.message });
      }
    } catch (error: any) {
      notify({ type: "error", message: error.response?.data?.message });
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
      key={"upload-video-link"}
      className="fixed top-0 left-0 w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
    >
      <MForm
        initial={{ scale: 0.89 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.89 }}
        className="flex flex-col gap-3 bg-light-200 rounded-[10px] p-6 w-[90%] sm:w-[600px] mx-auto"
        onSubmit={handleSubmit(updateVideoLink)}
      >
        <label htmlFor="video-link" className="flex flex-col gap-1">
          <p className="font-semibold">Upload video link</p>
          <input
            type="url"
            id="video-link"
            className="im-new-page-inputs"
            {...register("youtubeLink", { required: "Video link is required" })}
          />
          <small className="text-xs text-red-500">
            {errors?.youtubeLink?.message}
          </small>
        </label>
        <div className="flex items-center gap-2">
          <Button
            label={saving ? "Saving" : "Save settings"}
            disabled={saving}
            icon={saving ? <BtnLoader /> : null}
          />
          <Button
            label="Cancel"
            className="!bg-gray-300 !text-black/70"
            type="button"
            onClick={() => setShowLinkModal(false)}
            disabled={saving}
          />
        </div>
      </MForm>
    </MotionDiv>
  );
};
