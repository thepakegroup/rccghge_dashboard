import dynamic from "next/dynamic";
import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { formats, modules } from "@/components/quill-config/confiig";
import { post } from "@/helper/apiFetch";
import { MForm, MotionDiv } from "@/util/motion-exports";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { notify } from "@/helper/notify";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

export const MoreInfoContentModal = ({
  data,
  toast,
  getPageData,
  setShowMoreInfo,
}: {
  data: { body: string };
  getPageData: () => Promise<void>;
  toast: any;
  setShowMoreInfo: Dispatch<SetStateAction<boolean>>;
}) => {
  //
  const [updating, setUpdating] = useState<boolean>(false);
  // form configs
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      blueBannerText: data?.body,
      section: "BLUE_BANNER_CONTENT",
    },
  });
  //
  const updateMoreInfoContent = async (data: {
    blueBannerText: string;
    section: string;
  }) => {
    setUpdating(true);
    try {
      const res = await post("/page-setting/iam-new-page-extra", data);
      if (res.statusText === "OK") {
        setShowMoreInfo(false);
        toast({
          title: `${"Content updated successfully."}`,
        });
        await getPageData();
        notify({ type: "success", message: res.data?.message });
      }
    } catch (error: any) {
      notify({ type: "error", message: error.response?.data?.message });
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
      key={"update-more-info-content"}
      className="fixed top-0 left-0 w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
    >
      <MotionDiv
        initial={{ scale: 0.89 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.89 }}
        className="overflow-y-auto w-[90%] sm:w-[600px] mx-auto h-[480px] bg-light-200 rounded-[10px] p-6"
      >
        <h2 className="text-lg font-semibold my-3">More Information</h2>
        <MForm
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(updateMoreInfoContent)}
        >
          <label
            htmlFor=""
            className="flex flex-col gap-1 p-2 bg-white rounded-md"
          >
            <p className="font-semibold">Body Text</p>
            <QuillEditor
              className="write-editor"
              formats={formats}
              modules={modules}
              defaultValue={data?.body}
              onChange={(event: any) => setValue("blueBannerText", event)}
            />
            {/*  */}
            <small className="text-xs text-red-500">
              {errors?.blueBannerText?.message}
            </small>
          </label>
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
              onClick={() => setShowMoreInfo(false)}
              disabled={updating}
            />
          </div>
        </MForm>
      </MotionDiv>
    </MotionDiv>
  );
};
