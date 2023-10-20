import * as yup from "yup";

export const eventSchema1 = yup.object({
  eventTitle: yup.string().required("This field is required"),
  startDate: yup
    .date()
    .transform((value, originalValue) => {
      // If the original value is an empty string or invalid date, return undefined
      if (!originalValue || isNaN(new Date(originalValue).getTime())) {
        return undefined;
      }
      return value;
    })
    .required("This field is required"),
  endDate: yup
    .date()
    .transform((value, originalValue) => {
      if (!originalValue || isNaN(new Date(originalValue).getTime())) {
        return undefined;
      }
      return value;
    })
    .required("This field is required"),
  location: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
});

export const eventSchema2 = yup.object({
  eventTitle: yup.string(),
  startDate: yup
    .date()
    .transform((value, originalValue) => {
      // If the original value is an empty string or invalid date, return undefined
      if (!originalValue || isNaN(new Date(originalValue).getTime())) {
        return undefined;
      }
      return value;
    })
    .required("This field is required"),
  endDate: yup
    .date()
    .transform((value, originalValue) => {
      if (!originalValue || isNaN(new Date(originalValue).getTime())) {
        return undefined;
      }
      return value;
    })
    .required("This field is required"),
  location: yup.string(),
  description: yup.string(),
});
