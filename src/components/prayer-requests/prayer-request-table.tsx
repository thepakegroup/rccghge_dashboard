"use client";

import React, { useState } from "react";
import ViewPrayerRequestModal from "./view-prayer-request";

const data = [
  {
    id: "#876364",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
  {
    id: "#876365",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
  {
    id: "#876366",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
  {
    id: "#876367",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
  {
    id: "#876368",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
  {
    id: "#8763610",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
  {
    id: "#8763611",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    date: "10-06-21",
    prayer: "I had a bad dream last we had a terrible omen",
  },
];
const PrayerRequestTable = () => {
  const [openView, setOpenView] = useState(false);
  const [currPrayer, setCurrPrayer] = useState<null | any>(null);

  return (
    <>
      <div className="overflow-auto scroll-style">
        <table className="border-collapse w-full">
          {/* Table Header */}
          <thead>
            <tr className="whitespace-nowrap text-left text-sm font-quicksand bg-white rounded-[5px] shadow-[1px_5px_44px_0px_rgba(3,2,41,0.07)] font-medium">
              <th className="py-5 px-4 font-medium">ID</th>
              <th className="py-5 px-4 font-medium">Member Name</th>
              <th className="py-5 px-4 font-medium">Phone Number</th>
              <th className="py-5 px-4 font-medium">Date</th>
              <th className="py-5 px-4 font-medium">Prayer Request</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-t whitespace-nowrap bg-white text-xs font-quicksand"
              >
                <td className="py-5 px-4">{row.id}</td>
                <td className="py-5 px-4">{row.name}</td>
                <td className="py-5 px-4">{row.phone}</td>
                <td className="py-5 px-4">{row.date}</td>
                <td className="py-5 px-4 line-clamp-1">{row.prayer}</td>
                <td className="py-5 px-4 ">
                  <button
                    onClick={() => {
                      setCurrPrayer(row);
                      setOpenView(true);
                    }}
                    className="text-orange bg-transparent border-none outline-none"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openView && (
        <ViewPrayerRequestModal
          prayer={currPrayer}
          onClose={() => {
            setCurrPrayer(null);
            setOpenView(false);
          }}
        />
      )}
    </>
  );
};

export default PrayerRequestTable;
