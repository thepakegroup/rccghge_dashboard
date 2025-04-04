import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
const notifications = Array(5).fill({
  title: "Ride request update!",
  message: "You have a new ride request from Mercy",
});
export const Notifications = () => {
  return (
    <div className="w-full lg:w-full whitespace-nowrap mt-[30px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-play-fair-display font-semibold text-xl">
          Notifications
        </h3>
        <Link href="/home-web" className="flex items-center gap-2 text-orange">
          <p>See more</p>
          <BsArrowRight />
        </Link>
      </div>

      <div className="px-2 py-[18px] bg-white rounded-xl shadow-md w-full sm:w-[600px] lg:w-full">
        {/* Notification List */}
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="py-[10px] px-[15px] border-b last:border-none"
          >
            <p className="font-semibold text-sm">{notification.title}</p>
            <p className="text-gray-600 text-sm">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
