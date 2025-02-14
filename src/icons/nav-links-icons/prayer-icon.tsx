const PrayerIcon = ({
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
        d="M22.0615 17.375L18.664 13.9766L15.2459 2.69937C15.1487 2.37825 14.9739 2.08605 14.7368 1.84865C14.4998 1.61125 14.2079 1.43597 13.8869 1.33834C13.5659 1.24072 13.2258 1.22376 12.8967 1.28897C12.5677 1.35418 12.2597 1.49954 12.0002 1.71218C11.7408 1.49954 11.4328 1.35418 11.1037 1.28897C10.7747 1.22376 10.4346 1.24072 10.1136 1.33834C9.79263 1.43597 9.50069 1.61125 9.26364 1.84865C9.0266 2.08605 8.85176 2.37825 8.75462 2.69937L5.33649 13.9775L1.93899 17.375C1.6579 17.6563 1.5 18.0377 1.5 18.4353C1.5 18.833 1.6579 19.2143 1.93899 19.4956L5.00368 22.5603C5.14297 22.6996 5.30835 22.8102 5.49036 22.8856C5.67237 22.961 5.86745 22.9998 6.06446 22.9998C6.26147 22.9998 6.45655 22.961 6.63857 22.8856C6.82058 22.8102 6.98595 22.6996 7.12524 22.5603L11.6515 18.0312C11.777 17.9055 11.8935 17.7711 12.0002 17.6291C12.107 17.7711 12.2235 17.9055 12.349 18.0312L16.8752 22.5612C17.0145 22.7006 17.1799 22.8111 17.3619 22.8865C17.5439 22.9619 17.739 23.0007 17.936 23.0007C18.133 23.0007 18.3281 22.9619 18.5101 22.8865C18.6921 22.8111 18.8575 22.7006 18.9968 22.5612L22.0615 19.4966C22.2008 19.3573 22.3113 19.1919 22.3867 19.0099C22.4621 18.8279 22.501 18.6328 22.501 18.4358C22.501 18.2388 22.4621 18.0437 22.3867 17.8617C22.3113 17.6797 22.2008 17.5143 22.0615 17.375ZM6.06399 21.5L3.00024 18.4362L4.18993 17.2466L7.25462 20.3112L6.06399 21.5ZM11.2502 15.3828C11.2517 15.6787 11.1945 15.9719 11.0819 16.2455C10.9692 16.519 10.8034 16.7675 10.594 16.9766L8.31399 19.25L5.25024 16.1862L6.52993 14.9056C6.61726 14.8183 6.68167 14.7107 6.71743 14.5925L10.1862 3.13437C10.2214 3.00687 10.302 2.89664 10.4128 2.82445C10.5236 2.75226 10.657 2.72311 10.7879 2.74247C10.9187 2.76184 11.038 2.82839 11.1231 2.92959C11.2083 3.03079 11.2535 3.15964 11.2502 3.29187V15.3828ZM13.4065 16.9766C13.1971 16.7675 13.0313 16.519 12.9186 16.2455C12.806 15.9719 12.7487 15.6787 12.7502 15.3828V3.28906C12.7503 3.15916 12.797 3.0336 12.8818 2.93525C12.9667 2.83689 13.084 2.77229 13.2125 2.7532C13.341 2.73412 13.4721 2.76182 13.5818 2.83127C13.6916 2.90071 13.7728 3.00728 13.8106 3.13155L17.2793 14.5897C17.3151 14.7079 17.3795 14.8155 17.4668 14.9028L18.8252 16.2612L15.694 19.2612L13.4065 16.9766ZM17.9365 21.5L16.759 20.3216L19.8893 17.3216L21.0002 18.4362L17.9365 21.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PrayerIcon;
