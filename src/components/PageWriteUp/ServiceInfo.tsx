import useModalType from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks";
import { setDeleteFunc } from "@/store/slice/content";
import { setEditMediaId } from "@/store/slice/mediaItems";
import { setService } from "@/store/slice/service";
import Image from "next/image";
import React from "react";

interface infoI {
  name: string;
  serviceTime: string;
  id: number;
  description: string;
  image: string;
}

const ServiceInfo = ({ name, serviceTime, id, description, image }: infoI) => {
  const handleButton = useModalType();
  const dispatch = useAppDispatch();
  let startTime = "";
  let endTime = "";

  const handleDelete = () => {
    handleButton("delete");
    dispatch(setEditMediaId(id));
    dispatch(setDeleteFunc("service times"));
  };

  // Function to convert 12-hour time to 24-hour format
  const convertTo24HourFormat = (time: any) => {
    const [hours, minutes, period] = time.match(/(\d+):(\d+) (AM|PM)/).slice(1);
    let hours24 = parseInt(hours, 10);

    if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    return `${String(hours24).padStart(2, "0")}:${minutes}`;
  };

  // Match the time format (HH:MM AM/PM) using regex
  const matches = serviceTime.match(/\d{1,2}:\d{2} [APM]{2}/g);

  if (matches && matches.length === 2) {
    [startTime, endTime] = matches;

    // Convert to 24-hour format
    startTime = convertTo24HourFormat(startTime);
    endTime = convertTo24HourFormat(endTime);
  } else {
    console.log("Invalid time format");
  }

  // convert html to text
  const convertToPlainText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleEdit = () => {
    handleButton("modify");
    dispatch(
      setService({
        name,
        description,
        id,
        startTime,
        endTime,
        btnType: "edit",
      })
    );
  };

  return (
    <section className="flex flex-col rounded-[10px]">
      {image && (
        <div className="relative max-h-[225px]">
          <Image
            src={image}
            alt=""
            width={305}
            height={225}
            className="rounded-tl-[10px] rounded-tr-[10px] !w-full !h-[225px]"
          />
        </div>
      )}
      <div className="flex flex-col justify-between bg-[#F2F2F2] h-full rounded-bl-[10px] rouded-br-[10px] p-4">
        <div className="flex flex-col gap-[7px] max-w-full">
          <h2 className="text-[#050505] text-sm font-bold font-['Playfair Display']">
            {name}
          </h2>
          <p className="font-quicksand !text-[#454545] text-xs line-clamp-3 font-normal">
            {convertToPlainText(description)}
          </p>
          <span className="text-xs font-quicksand font-normal flex items-start gap-2 text-gray-500">
            {serviceTime}
          </span>
        </div>
        <div className="flex-center justify-end gap-3">
          <button onClick={handleEdit}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={handleDelete}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
