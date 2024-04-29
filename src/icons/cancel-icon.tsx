export const CancelIcon = ({
  stroke = "#fa5252",
  className,
}: {
  stroke?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 7L7 17M7 7l10 10"
      />
    </svg>
  );
};
