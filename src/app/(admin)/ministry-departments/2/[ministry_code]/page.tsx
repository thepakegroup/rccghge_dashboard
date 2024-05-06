"use client";

import { BtnLoader } from "@/components/base-components/btn-loader";
import { Button } from "@/components/base-components/button";
import { NewCategoryForm } from "@/components/ministry-departments/common-two-components/new-category-form";
import { UpdateCategoryForm } from "@/components/ministry-departments/common-two-components/update-category-form";
import { DeletingImageLoader } from "@/components/ministry-departments/deleting-image-loader";
import { GoBack } from "@/components/ministry-departments/go-back";
import { PageLoader } from "@/components/ministry-departments/page-loader";
import { get, post, remove } from "@/helper/apiFetch";
import { Truncate } from "@/helper/truncate-text";
import { CancelIcon } from "@/icons/cancel-icon";
import { DotsIcon } from "@/icons/dots-icon";
import { ImgIcon1 } from "@/icons/img-icon1";
import { TableIcon1 } from "@/icons/table-icon-1";
import { UploadImgIcon } from "@/icons/upload-img-icon";
import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const CommonTwoPages = () => {
  const params = useParams();
  // states
  const [heading_text, setHeadingText] = useState<string>("");
  const [bgPreview, setBgPreview] = useState<any[]>([]);
  const [slidersSelected, setSlidersSelected] = useState<any[]>([]);
  //
  const [toEdit, setToEdit] = useState<boolean>(false);
  const [toNew, setToNew] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  //
  const [deleting, setDeleting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  // get page data info
  const {
    data: common_two_data,
    isLoading: loadingCommonTwoData,
    refetch: getBackPageInfo,
  } = useQuery({
    queryKey: [`${params.ministry_code}`],
    queryFn: async () => {
      const res = await get(`/ministry-page/common-2/${params.ministry_code}`);
      const bgImgs = res.data?.data?.sliders?.map((url: any) => url?.item_url);
      setBgPreview(bgImgs);
      setHeadingText(res.data?.data?.settings?.settings?.heading_text);
      return res.data;
    },
    select: (data) => data.data,
    staleTime: 3000,
  });
  //
  //handle sliders image upload
  const uploadSliderImage = (e: any) => {
    setBgPreview(common_two_data?.sliders?.map((url: any) => url?.item_url));
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setBgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSlidersSelected([...fileArray]);
  };
  //
  // handle sliders image drop
  const handleSliderDrop = (files: FileList) => {
    setBgPreview(common_two_data?.sliders?.map((url: any) => url?.item_url));
    const fileArray = Array.from(files);
    fileArray.forEach((file: any) => {
      setBgPreview((prev: any) => [...prev, URL.createObjectURL(file)]);
    });
    setSlidersSelected([...fileArray]);
  };
  //
  // handle remove (delete) image
  const removeImage = async (id: number) => {
    setDeleting(true);
    try {
      const res = await remove(`/ministry-page/image/${id}`);
      if (res.statusText === "OK") {
        await getBackPageInfo();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };
  // edit page function
  const editPage = async () => {
    setEditing(true);
    try {
      const formData = new FormData();
      formData.append("page_name", params.ministry_code as string);
      formData.append("heading_text", heading_text);
      if (slidersSelected.length > 0) {
        slidersSelected.forEach((file: any) => {
          formData.append("background_images", file);
        });
      }
      const res = await post(
        "/ministry-page/common-2/compose",
        formData,
        "multipart/form-data"
      );
      if (res.statusText === "OK") {
        await getBackPageInfo();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  };
  // delete category function
  const deleteCategory = async (item: any) => {
    setDeleting(true);
    try {
      const res = await remove(`ministry-page/common-2/section/${item}`);
      if (res.statusText === "OK") {
        await getBackPageInfo();
      }
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setDeleting(false);
    }
  };
  //
  //
  return (
    <div className="relative px-4 mb-8">
      <GoBack
        header={(params.ministry_code as string)
          .replace("_", " ")
          .toUpperCase()}
      />
      {/*  */}
      <h4 className="text-xl font-play-fair-display font-semibold text-black/80 my-3">
        Manage Header Content
      </h4>
      {loadingCommonTwoData && <PageLoader />}
      {common_two_data && (
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault(), editPage;
          }}
        >
          <div className="px-4 py-5 rounded-lg bg-white overflow-y-auto">
            <h4 className="font-play-fair-display font-semibold mb-1">
              Add Background Image
            </h4>
            <label
              className="flex flex-col gap-1 cursor-pointer justify-center items-center"
              htmlFor="img_carousel"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleSliderDrop(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                id="img_carousel"
                onChange={uploadSliderImage}
                multiple
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
                      const imgId = common_two_data?.sliders?.find(
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
          <div className="rounded-lg p-4 bg-white flex flex-col gap-2">
            <label className="flex flex-col gap-1" htmlFor="headerText">
              <h4 className="font-play-fair-display font-semibold mb-3">
                Header Text
              </h4>
              <input
                id="headerText"
                type="text"
                className="focus:ring-0 outline-none border text-stone-500 border-stone-300 focus:border-stone-300 rounded-md p-3"
                defaultValue={heading_text}
                onChange={(e) => setHeadingText(e.target.value)}
              />
            </label>
          </div>
        </form>
      )}
      {/*  */}
      <MotionPresence>
        {toEdit ? (
          <UpdateCategoryForm
            page_name={params.ministry_code as string}
            setToEdit={setToEdit}
            getBackPageInfo={getBackPageInfo}
            selectedCategory={selectedCategory}
          />
        ) : toNew ? (
          <NewCategoryForm
            page_name={params.ministry_code as string}
            setToNew={setToNew}
            getBackPageInfo={getBackPageInfo}
          />
        ) : (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-lg overflow-auto"
          >
            <table className="w-full text-grey-100 overflow-auto border rounded-lg text-left border-collapse p-[15px]">
              <thead
                className="p-[15px] bg-light-100 shadow-sm text-left border-collapse 
          bg-fade-ash/10 text-fade-ash/80 font-semibold"
              >
                <tr>
                  <td className="text-left border-collapse p-[15px] whitespace-nowrap"></td>
                  <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                    Category Name
                  </td>
                  <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                    Description
                  </td>
                  <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                    Image
                  </td>
                  <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                    <TableIcon1 />
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white/70 text-fade-ash">
                {common_two_data && common_two_data.pageSection?.length < 1 && (
                  <tr>
                    <td
                      className="text-center text-sm md:text-[20px] py-6 font-semibold text-grey-100"
                      colSpan={7}
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
                {common_two_data &&
                  common_two_data.pageSection?.map((item: any) => {
                    return (
                      <tr className="border-b last:border-b-0" key={item?.id}>
                        <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="ring-0 ring-transparent focus:ring-0 focus:ring-transparent checked:ring-0 checked:ring-transparent active:ring-0 active:ring-transparent checked:focus:bg-fade-ash checked:bg-fade-ash active:hover:bg-fade-ash checked:hover:bg-fade-ash rounded cursor-pointer"
                          />
                        </td>
                        <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                          {item?.name}
                        </td>
                        <td className="text-left border-collapse p-[15px] whitespace-nowrap">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: Truncate(item?.description, 20),
                            }}
                          />
                        </td>
                        <td
                          className="text-left border-collapse p-[15px] whitespace-nowrap cursor-pointer"
                          onClick={() => {
                            setToEdit(true);
                            setSelectedCategory(item);
                          }}
                        >
                          <p className="flex items-center gap-1 text-orange">
                            <ImgIcon1 />
                            <span>Edit image</span>
                          </p>
                        </td>
                        <td className="text-left text-lg flex items-center gap-2 border-collapse p-[15px] whitespace-nowrap">
                          <MdDelete
                            className="cursor-pointer text-red-500"
                            onClick={() => deleteCategory(item?.id)}
                          />
                          <CiEdit
                            className="cursor-pointer"
                            onClick={() => {
                              setToEdit(true);
                              setSelectedCategory(item);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <Button
              label="Add new category"
              className="!bg-transparent !text-orange"
              icon={<BsPlus className="text-xl" />}
              onClick={() => setToNew(true)}
            />
          </MotionDiv>
        )}
      </MotionPresence>
      {/*  */}
      <DeletingImageLoader deleting={deleting} />
      {common_two_data && (
        <div className="inline-block" onClick={() => editPage()}>
          <Button
            icon={editing ? <BtnLoader /> : null}
            label={editing ? "Updating" : "Update page settings"}
            className="py-3 mt-4"
            disabled={editing}
            type="submit"
          />
        </div>
      )}
    </div>
  );
};

export default CommonTwoPages;
