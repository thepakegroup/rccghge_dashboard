import { ReactNode } from "react";

export const Button = ({
  className,
  icon,
  label,
  onClick,
  type,
}: {
  className?: string;
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-orange text-white ${className}`}
      onClick={onClick}
      type={type}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
