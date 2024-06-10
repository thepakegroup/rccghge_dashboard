import dynamic from "next/dynamic";
import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { formats, modules } from "@/components/quill-config/confiig";
import { post } from "@/helper/apiFetch";
import { MForm, MotionDiv } from "@/util/motion-exports";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

export const WednesdayBibleStudyModal = ({
  data,
  toast,
  getPageData,
  setShowModal,
}: {
  data: { adultText: string; nextGenYouthText: string; nextGenKidText: string };
  getPageData: () => Promise<void>;
  toast: any;
  setShowModal: Dispatch<SetStateAction<boolean>>;
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
      adultText: data?.adultText,
      nextGenYouthText: data?.nextGenYouthText,
      nextGenKidText: data?.nextGenKidText,
      section: "WEDNESDAY_BIBLE_STUDY",
    },
  });
  //
  const updateWednesdayBibleStudy = async (data: {
    adultText: string;
    nextGenYouthText: string;
    nextGenKidText: string;
    section: string;
  }) => {
    setUpdating(true);
    try {
      const res = await post("/page-setting/iam-new-page-extra", data);
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
          onSubmit={handleSubmit(updateWednesdayBibleStudy)}
        >
          <label
            htmlFor=""
            className="flex flex-col gap-1 p-2 bg-white rounded-md"
          >
            <p className="font-semibold">Adult Text</p>
            <QuillEditor
              className="write-editor"
              formats={formats}
              modules={modules}
              defaultValue={data?.adultText}
              onChange={(event: any) => setValue("adultText", event)}
            />
            <small className="text-xs text-red-500">
              {errors?.adultText?.message}
            </small>
          </label>
          {/*  */}
          <label
            htmlFor=""
            className="flex flex-col gap-1 p-2 bg-white rounded-md"
          >
            <p className="font-semibold">Next Gen Youth Text</p>
            <QuillEditor
              className="write-editor"
              formats={formats}
              modules={modules}
              defaultValue={data?.nextGenYouthText}
              onChange={(event: any) => setValue("nextGenYouthText", event)}
            />
            <small className="text-xs text-red-500">
              {errors?.nextGenYouthText?.message}
            </small>
          </label>
          {/*  */}
          <label
            htmlFor=""
            className="flex flex-col gap-1 p-2 bg-white rounded-md"
          >
            <p className="font-semibold">Next Gen Kid Text</p>
            <QuillEditor
              className="write-editor"
              formats={formats}
              modules={modules}
              defaultValue={data?.nextGenKidText}
              onChange={(event: any) => setValue("nextGenKidText", event)}
            />
            <small className="text-xs text-red-500">
              {errors?.nextGenKidText?.message}
            </small>
          </label>
          {/*  */}
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
