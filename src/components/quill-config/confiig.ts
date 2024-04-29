export const modules = {
  // toolbar: [
  //   [{ align: "normal" }, { align: "center" }, { align: "right" }],
  //   [{ size: [] }],
  //   ["bold", "italic", "underline", "strike", "blockquote"],
  //   [
  //     { list: "ordered" },
  //     { list: "bullet" },
  //     { indent: "-1" },
  //     { indent: "+1" },
  //   ],
  //   ["link", "image", "video"],
  //   [{ direction: "rtl" }], // text direction

  //   [{ color: [] }, { background: [] }],

  //   ["clean"],
  // ],
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      // { list: "bullet" },
      // { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: true,
  },
};

export const formats = [
  // "header",
  // "font",
  // "size",
  // "bold",
  // "italic",
  // "underline",
  // "strike",
  // "blockquote",
  // "list",
  // "bullet",
  // "indent",
  // "link",
  // "image",
  // "video",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
