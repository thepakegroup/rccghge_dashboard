import * as yup from "yup";

// Manage Events Schema
export const eventSchema1 = yup.object({
  eventTitle: yup.string().required("Event title is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().required("Event Description is required"),
});

export const eventSchema2 = yup.object({
  eventTitle: yup.string(),
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

// Leader Schema
export const leaderSchema = yup.object({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  qualification: yup.string().required("Qualification is required"),
  position: yup.string().required("Position is required"),
  fullStory: yup.string().required("Full Story is required"),
  description: yup.string().required("Description is required"),
});

export const groupSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
