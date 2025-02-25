export const convertTo12HourFormat = (time24Hour: string) => {
  const [hours, minutes] = time24Hour?.split(":");
  let amOrPm = "AM";
  let hour = parseInt(hours, 10);

  if (hour >= 12) {
    amOrPm = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  }

  if (hour === 0) {
    hour = 12;
  }

  const time12Hour = `${hour}:${minutes} ${amOrPm}`;
  return time12Hour;
};
