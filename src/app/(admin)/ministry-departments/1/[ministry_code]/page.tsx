"use client";
import { useParams } from "next/navigation";

const CommonOnePages = () => {
  const params = useParams();
  //
  console.log(params);
  return <div>CommonOnePages</div>;
};

export default CommonOnePages;
