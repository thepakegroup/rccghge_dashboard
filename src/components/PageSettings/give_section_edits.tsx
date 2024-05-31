import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv } from "@/util/motion-exports";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../base-components/button";

export const GiveSectionEdits = ({
  setGiveBg,
  setGiveBgPrev,
  uploadGiveBg,
  give_bg,
  give_bg_prev,
  setShowGiveEdit,
  give_header_text,
  setGiveHeaderText,
  give_subheading,
  setGiveSubHeading,
}: {
  setGiveBg: any;
  setGiveBgPrev: any;
  uploadGiveBg: any;
  give_bg: any;
  give_bg_prev: any;
  setShowGiveEdit: Dispatch<SetStateAction<boolean>>;
  give_header_text: any;
  setGiveHeaderText: any;
  give_subheading: any;
  setGiveSubHeading: any;
}) => {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full overflow-hidden 
    bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
    >
      <div className="h-[90%] overflow-auto rounded-[10px]">
        <div className="flex flex-col gap-3 w-[90%] sm:w-[600px] mx-auto bg-white p-4">
          <label
            className="flex flex-col gap-1 cursor-pointer"
            htmlFor="give_header_text"
          >
            <h3 className="text-lg font-medium text-[#030229]">Header text</h3>
            <input
              type="text"
              className="input active:outline-none active:!ring-transparent active:!ring-0 active:!border-none focus:ring-0 focus:ring-transparent focus:border-zinc-300"
              id="give_header_text"
              defaultValue={give_header_text}
              onChange={(e) => setGiveHeaderText(e.target.value)}
            />
          </label>
          {/*  */}
          <label
            className="flex flex-col gap-1 cursor-pointer"
            htmlFor="give_sub_header"
          >
            <h3 className="text-lg font-medium text-[#030229]">
              Sub-header Text
            </h3>
            <textarea
              id="give_sub_header"
              rows={5}
              className="resize-none input active:outline-none active:!ring-transparent active:!ring-0 active:!border-none focus:ring-0 focus:ring-transparent focus:border-zinc-300"
              defaultValue={give_subheading}
              onChange={(e) => setGiveSubHeading(e.target.value)}
            />
          </label>
          {/*  */}
          {/* image */}
          <div className="flex flex-col gap-7">
            <h3 className="text-lg font-medium text-[#030229]">
              Give card image
            </h3>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="give_bg"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setGiveBgPrev(URL.createObjectURL(e.dataTransfer.files[0]));
                setGiveBg(e.dataTransfer.files[0]);
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="give_bg"
                onChange={uploadGiveBg}
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
            {give_bg_prev && (
              <div className="w-[250px] h-[150px] mt-5 rounded-md overflow-hidden mx-auto">
                <Image
                  src={give_bg_prev}
                  alt="give section image"
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          {/*  */}
          <div className="flex items-center gap-4">
            <Button
              className="!bg-slate-300 !text-slate-500"
              label="Cancel"
              onClick={() => setShowGiveEdit(false)}
              type="button"
            />
            <Button
              label="Save and proceed"
              type="button"
              onClick={() => setShowGiveEdit(false)}
            />
          </div>
        </div>
      </div>
      {/*  */}
    </MotionDiv>
  );
};
