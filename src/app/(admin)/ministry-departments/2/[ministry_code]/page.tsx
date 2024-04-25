"use client";

import { useParams } from "next/navigation";

const CommonTwoPages = () => {
  const params = useParams();
  console.log(params);
  //
  return <div>CommonTwoPages</div>;
};

export default CommonTwoPages;
