import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { formats, modules } from "@/components/quill-config/confiig";
import { post } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv } from "@/util/motion-exports";
import { QueryObserverResult } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[150px] bg-stone-100/80 animate-pulse rounded-md" />
  ),
});

export const NewProgramForm = ({
  getBackPageInfo,
  setShowNewProgramForm,
}: {
  getBackPageInfo: () => Promise<QueryObserverResult<any, Error>>;
  setShowNewProgramForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const updateToast = useUpdateToast();
  // states
  const [creating, setCreating] = useState<boolean>(false);
  const [selectedFlyer, setSelectedFlyer] = useState<any>(null);
  const [flyerPreview, setFlyerPreview] = useState<any>(null);

  // form configs
  const { register, handleSubmit, setValue } = useForm({
    values: {
      name: "",
      description: "",
      flyer: null,
    },
  });

  //
  const newFlyerDrop = (files: FileList) => {
    const file = files[0];
    setFlyerPreview(URL.createObjectURL(file));
    setSelectedFlyer(file);
  };
  //
  const newFlyerUpload = (event: any) => {
    const file = event.target.files[0];
    setFlyerPreview(URL.createObjectURL(file));
    setSelectedFlyer(file);
  };
  //
  const createNewProgram = async (data: any) => {
    setCreating(true);
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data?.description);
      if (selectedFlyer) {
        formData.append("flyer", selectedFlyer);
      }
      const res = await post(
        "/ministry-page/youth/programs",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        setShowNewProgramForm(false);
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
      setCreating(false);
    }
  };

  //
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-[887] flex flex-col justify-center items-center h-screen overflow-hidden"
    >
      <div className="flex flex-col gap-3 w-[95%] sm:w-[600px] mx-auto h-[90%] overflow-y-auto">
        <h3 className="font-play-fair-display font-semibold text-lg">
          Add new Programs
        </h3>
        <form
          className="relative rounded-lg p-4 bg-white flex flex-col gap-3"
          onSubmit={handleSubmit(createNewProgram)}
        >
          {/*  */}
          <label className="flex flex-col gap-1" htmlFor="new_program_name">
            <h4 className="font-play-fair-display font-semibold">
              Program name
            </h4>
            <input
              id="new_program_name"
              type="text"
              className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
              {...register("name", { required: true })}
            />
          </label>
          {/*  */}
          <label
            className="flex flex-col gap-1"
            htmlFor="new_program_description"
          >
            <h4 className="font-play-fair-display font-semibold">
              Description
            </h4>
            <QuillEditor
              defaultValue={""}
              className="write-editor2"
              formats={formats}
              modules={modules}
              onChange={(event: any) => {
                setValue("description", event);
              }}
            />
          </label>
          {/* image input */}
          <div className="py-5 rounded-lg mt-12 bg-white overflow-y-auto">
            <h4 className="font-play-fair-display font-semibold mb-1">
              Add Image
            </h4>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="new_category_img"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                newFlyerDrop(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="new_category_img"
                {...register("flyer")}
                onChange={newFlyerUpload}
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
              {flyerPreview && (
                <div className="relative w-[150px] h-[90px]">
                  <Image
                    src={flyerPreview}
                    alt={flyerPreview}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          {/*  */}
          <div className="flex items-center gap-2">
            <Button
              label={creating ? "Creating" : "Save Settings"}
              icon={creating ? <BtnLoader /> : null}
              disabled={creating}
              // onClick={createCategory}
              className="self-start"
              type="submit"
            />
            <Button
              label="Cancel"
              disabled={creating}
              onClick={() => setShowNewProgramForm(false)}
              className="self-start !bg-fade-ash/40 !text-gray-900"
              type="button"
            />
          </div>
        </form>
      </div>
    </MotionDiv>
  );
};
