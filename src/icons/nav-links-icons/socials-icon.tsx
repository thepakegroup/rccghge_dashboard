import React from "react";

const SocialsIcon = ({
  size = "24",
  className,
  onClick,
}: {
  size?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path
        d="M22.8 9.1C22.6 7.6 22.4 6.5 21.8 6.1C21.2 5.6 16 5.5 12 5.5C8 5.5 2.8 5.6 2.2 6.1C1.6 6.5 1.4 7.6 1.2 9.1C1 10.6 1 11.5 1 12.5C1 13.5 1 14.4 1.2 15.9C1.4 17.4 1.6 18.5 2.2 18.9C2.8 19.4 8 19.5 12 19.5C16 19.5 21.2 19.4 21.8 18.9C22.4 18.5 22.6 17.4 22.8 15.9C23 14.4 23 13.5 23 12.5C23 11.5 23 10.6 22.8 9.1ZM10 16.1V8.9L16 12.5L10 16.1Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SocialsIcon;
