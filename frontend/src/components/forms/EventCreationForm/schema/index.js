import * as Yup from "yup";

export const EventCreationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too short")
    .max(350, "Too Long")
    .required("Required"),
  position: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  startAt: Yup.date().min(4, "Too short !").required("Required"),
  endAt: Yup.date().min(4, "Too short !").required("Required"),
  profilePic: Yup.mixed().required("Required"),
  eventPictures: Yup.object().nullable(),
});
