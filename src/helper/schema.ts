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
  name: yup.string().required("Media name is required"),
  mediaLink: yup.string(),
  description: yup.string(),
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
  ministry_code: yup.string().required("Ministry code is required"),
});

// landing page schema
export const landingPageSchema = yup.object({
  header_text: yup.mixed().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
  mission_vision: yup.boolean().required(),
  ministries: yup.boolean().required(),
});

// i am new page schema
export const IAmNewPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
});

// services schema
export const ServicesPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
});

// give schema
export const GivePageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
});

// landing page schema
export const MinistriesSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
  mission_vision: yup.boolean().required(),
  ministries: yup.boolean().required(),
});

// our story schema
export const OurStoryPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
});

// our pastors schema
export const OurPastorsPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
});

// our mission schema
export const OurMissionPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
});

// our belief schema
export const OurBeliefPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
});

// rccg worldwide schema
export const RCCGWorldWidePageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
  service_times: yup.boolean().required(),
  events: yup.boolean().required(),
});

// get in touch schema
export const GetInTouchPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
});

// need a ride schema
export const NeedARidePageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
});

// prayer request schema
export const PrayerRequestPageSchema = yup.object({
  header_text: yup.string().required("Header text is required"),
  sub_header_text: yup.string().required("Header text is required"),
  events: yup.boolean().required(),
});
