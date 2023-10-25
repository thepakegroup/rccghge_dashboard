import * as yup from "yup";

// Manage Events Schema
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

// Home Schema
export const mediaSchema = yup.object({
  name: yup.string().required("This field is required"),
  mediaLink: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
});

// Home Schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .test("is-valid-email", "Email is not valid", function (value) {
      if (!value) return true; // The field is not required, so an empty value is valid

      const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return regex.test(value);
    })
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
