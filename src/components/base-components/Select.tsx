import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
interface Option {
  label: string;
  value: string;
}
interface SelectProp {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  btnClass?: string;
  disabled?: boolean;
  id?: string;
}

export function Select({
  options,
  value,
  onChange,
  className,
  btnClass,
  disabled = false,
  id,
}: SelectProp) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative w-64 ${className} ${
        disabled && "pointer-events-none"
      }`}
      id={id}
    >
      <button
        type="button"
        className={`w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 ${btnClass}`}
        onClick={() => setOpen(!open)}
        disabled={disabled}
      >
        <span>
          {options.find((option) => option.value === value)?.label ||
            "Select an option"}
        </span>
        <BsChevronDown />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ ease: "easeInOut" }}
            className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
