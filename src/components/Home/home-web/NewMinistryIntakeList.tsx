import React from "react";
import { BsChevronDown } from "react-icons/bs";
//
const data = [
  {
    id: "#876364",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    ministry: "Choir",
    email: "chinonye@gmail.com",
  },
  {
    id: "#876364",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    ministry: "Ushering",
    email: "chinonye@gmail.com",
  },
  {
    id: "#876364",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    ministry: "Prayer",
    email: "chinonye@gmail.com",
  },
  {
    id: "#876364",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    ministry: "Women",
    email: "chinonye@gmail.com",
  },
  {
    id: "#876364",
    name: "Chinonye Umeh",
    phone: "080 665 7783",
    ministry: "Teenage",
    email: "chinonye@gmail.com",
  },
];
export const NewMinistryIntakeList = () => {
  return (
    <div className="p-5 w-full min-[887px]:w-[780px] lg:w-fit lg:max-w-[400px] xl:max-w-[600px] bg-white rounded-xl shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-semibold">New Ministry intake list</h2>
        <div className="cursor-pointer flex items-center font-play-fair-display gap-1 bg-gray-100 rounded-md px-2 py-2">
          <p>10-06-2021</p>
          <BsChevronDown />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto scroll-style">
        <table className="border-collapse w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 whitespace-nowrap text-left text-sm font-medium">
              <th className="py-5 px-4">ID</th>
              <th className="py-5 px-4">Member Name</th>
              <th className="py-5 px-4">Phone Number</th>
              <th className="py-5 px-4">Ministry</th>
              <th className="py-5 px-4">Email Address</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t whitespace-nowrap text-sm">
                <td className="py-5 px-4">{row.id}</td>
                <td className="py-5 px-4">{row.name}</td>
                <td className="py-5 px-4">{row.phone}</td>
                <td className="py-5 px-4">{row.ministry}</td>
                <td className="py-5 px-4">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
