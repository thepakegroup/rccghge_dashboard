import React from "react";

const Trash = ({
  size = "20",
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.1667 4.16669V3.33335C14.1667 2.89133 13.9911 2.4674 13.6785 2.15484C13.3659 1.84228 12.942 1.66669 12.5 1.66669H7.5C7.05797 1.66669 6.63405 1.84228 6.32149 2.15484C6.00893 2.4674 5.83333 2.89133 5.83333 3.33335V4.16669H3.33333C3.11232 4.16669 2.90036 4.25448 2.74408 4.41076C2.5878 4.56705 2.5 4.77901 2.5 5.00002C2.5 5.22103 2.5878 5.433 2.74408 5.58928C2.90036 5.74556 3.11232 5.83335 3.33333 5.83335H4.16667V15C4.16667 15.6631 4.43006 16.2989 4.8989 16.7678C5.36774 17.2366 6.00363 17.5 6.66667 17.5H13.3333C13.9964 17.5 14.6323 17.2366 15.1011 16.7678C15.5699 16.2989 15.8333 15.6631 15.8333 15V5.83335H16.6667C16.8877 5.83335 17.0996 5.74556 17.2559 5.58928C17.4122 5.433 17.5 5.22103 17.5 5.00002C17.5 4.77901 17.4122 4.56705 17.2559 4.41076C17.0996 4.25448 16.8877 4.16669 16.6667 4.16669H14.1667ZM12.5 3.33335H7.5V4.16669H12.5V3.33335ZM14.1667 5.83335H5.83333V15C5.83333 15.221 5.92113 15.433 6.07741 15.5893C6.23369 15.7456 6.44565 15.8334 6.66667 15.8334H13.3333C13.5543 15.8334 13.7663 15.7456 13.9226 15.5893C14.0789 15.433 14.1667 15.221 14.1667 15V5.83335Z"
        fill="#DA2B2B"
      />
      <path
        d="M7.5 7.5H9.16667V14.1667H7.5V7.5ZM10.8333 7.5H12.5V14.1667H10.8333V7.5Z"
        fill="#DA2B2B"
      />
    </svg>
  );
};

export default Trash;
