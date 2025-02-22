import { ReactNode } from "react";

export const Button = ({
  className,
  icon,
  label,
  onClick,
  type,
  disabled,
}: {
  className?: string;
  icon?: ReactNode;
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  return (
    <button
      className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg bg-orange text-white ${className}`}
      onClick={onClick}
      type={type}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
