import * as Yup from "yup";

export const EventEndConfirmationSchema = Yup.object().shape({
  text: Yup.string()
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  eventPictures: Yup.object().nullable(),
});