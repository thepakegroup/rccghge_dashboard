import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

//
const data = [
  { name: "I am new here and I want to connect", value: 40, color: "#FF9800" },
  { name: "I have a question or a comment", value: 40, color: "#4DB6AC" },
  {
    name: "Sign me up for the monthly newsletter",
    value: 40,
    color: "#C5CAE9",
  },
];

export const ConnectAnalysis = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[550px] lg:w-full">
      <div className="flex w-full justify-between items-center mb-8">
        <h2 className="text-sm font-semibold">Connect Analytics</h2>
        <div className="cursor-pointer flex items-center text-sm font-play-fair-display gap-1 bg-gray-100 rounded-md px-2 py-2">
          <p>10-06-2021</p>
          <BsChevronDown />
        </div>
      </div>
      <div className="relative w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center flex-col justify-center text-xl font-semibold text-gray-500">
          <span className="font-normal text-sm">Total Click</span>
          <span>100</span>
        </div>
      </div>
      <div className="mt-4 space-y-2 flex gap-2 flex-wrap">
        {data.map((entry, index) => (
          <div key={index} className="flex items-start text-gray-600 space-x-2">
            <span>
              <div
                className="w-3 h-3 whi rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
            </span>
            <span className="text-sm">{entry.name}</span>
            <span className="text-sm font-medium">40%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
