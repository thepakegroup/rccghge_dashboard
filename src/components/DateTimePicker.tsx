"use client";

import React, { useRef, useState, forwardRef, useEffect } from "react";
import "../app/react-datepicker.css";
import DatePicker from "react-datepicker";
// import { format } from "date-fns";
import Image from "next/image";

const CustomInput = forwardRef<any, any>(
  ({ value, onClick, placeholder }, ref) => {
    return (
      <div
        className="w-full truncate text-xs lg:text-sm  flex items-center"
        onClick={onClick}
        ref={ref}
      >
        {value || placeholder}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

const DateTimePicker = ({
  date,
  onDateChange,
  minDate,
}: {
  date: Date | null;
  onDateChange: any;
  minDate: Date;
}) => {
  const datePickerRef = useRef<any>(null);

  const handleOpenIconClick = () => {
    if (datePickerRef?.current) {
      datePickerRef?.current?.setOpen(true);
    }
  };

  const handleStartDateChange = (date: Date) => onDateChange(date);

  return (
    <div className="flex gap-3 items-center w-full">
      <div className="input flex gap-3 justify-between">
        <DatePicker
          selected={date}
          onChange={handleStartDateChange}
          showTimeSelect
          showPopperArrow={false}
          customInput={
            <CustomInput
              value={date}
              onClick={() => {}}
              placeholder="Select Date"
            />
          }
          timeFormat="HH:mm"
          minDate={minDate}
          timeIntervals={5}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select Start Date"
          ref={datePickerRef}
          shouldCloseOnSelect
        />

        <Image
          width={20}
          height={20}
          src="/icons/calendarIcon.svg"
          alt=""
          className="cursor-pointer"
          onClick={handleOpenIconClick}
        />
      </div>
    </div>
  );
};

export { DateTimePicker };
