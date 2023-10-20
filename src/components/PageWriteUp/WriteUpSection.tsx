"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Content from "./Content";
import { useFetchData } from "@/hooks/fetchData";
import { writeupI } from "@/util/interface/writeup";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import DeleteModal from "../DeleteModal";
import {
  setContent,
  setDescription,
  setHeader,
  setTitle,
} from "@/store/slice/content";
import Loader from "../Loader";
import useUpdateToast from "@/hooks/updateToast";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "@/util/constants";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WriteUpSection = ({ currentSection }: { currentSection: string }) => {
  const type = useGetTypeOfModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();

  const { id } = useAppSelector((state) => state.mediaItems);
  const {
    content,
    title,
    header,
    btnType,
    id: editId,
    section,
  } = useAppSelector((state) => state.content);

  const { data, loading, fetchData } = useFetchData({
    url: `${baseUrl}writeups`,
    method: "client",
  });

  const writeups: writeupI[] = data?.message;

  // Token and Headers
  const token = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Delete Write Ups
  const deleteContent = async () => {
    const res = await axios.delete(`${baseUrl}writeup/${id}`, {
      headers,
    });

    const data = await res?.data;

    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
      });
    }
  };

  // Update and Create Write Ups
  const updateContent = async () => {
    const contentData = {
      page_title: title,
      content,
      heading: header,
      ...(btnType == "edit" && editId !== undefined ? { id: editId } : {}),
    };

    const res = await axios.post(
      `${
        btnType == "edit"
          ? `${baseUrl}update-writeup`
          : `${baseUrl}create-writeup`
      }`,
      contentData,
      {
        headers,
      }
    );

    const data = await res.data;

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Content ${btnType === "edit" ? "updated" : "added!"}`,
        info: title,
      });

      dispatch(
        setContent({
          title: "",
          content: "",
          header: "",
          id: null,
          btnType: `${btnType === "edit" ? "add" : "edit"}`,
        })
      );
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  return (
    <section
      className={`mt-3 ${
        currentSection === "edit content" ? "block" : "hidden md:block"
      }`}
    >
      <div className="bg-white rounded-lg py-6 px-7">
        <h2 className="font-bold text-lg">Edit content</h2>
        <div className="flex flex-col gap-[1.12rem] mt-4">
          <label htmlFor="title" className="input-field">
            <span>Page title</span>
            <input
              onChange={(e) => dispatch(setTitle(e.target.value))}
              value={title}
              type="text"
              name="title"
              className="input"
            />
          </label>
          <label htmlFor="heading" className="input-field">
            <span>Heading</span>
            <input
              onChange={(e) => dispatch(setHeader(e.target.value))}
              value={header}
              type="text"
              name="heading"
              className="input"
            />
          </label>
          <div className=" h-40">
            <ReactQuill
              theme="snow"
              formats={formats}
              modules={modules}
              value={content}
              className=" h-full"
              onChange={(e) => dispatch(setDescription(e))}
            />
          </div>
        </div>

        <button
          onClick={updateContent}
          className="text-sm text-ash-300 font-semibold mt-28 md:mt-14 bg-gray-300 rounded-md px-4 py-2 my-5"
        >
          {btnType === "add" ? "Create Post" : "Edit Post"}
        </button>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            {writeups?.map((writeup) => {
              const { content, heading, id, page_title } = writeup;
              return (
                <Content
                  key={writeup.id}
                  page_title={page_title}
                  heading={heading}
                  content={content}
                  id={id}
                />
              );
            })}
          </div>
        )}
      </div>
      {type == "delete" && section == "edit content" && (
        <DeleteModal deleteFunc={deleteContent} />
      )}
    </section>
  );
};

export default WriteUpSection;
