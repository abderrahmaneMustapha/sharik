import React from "react";
import { useMutation } from "@apollo/client";
import { EVENT_END_CONFIRM, ADD_EVENT_PITURES_ON_END} from "../../../services/api/events/index"
import { EventEndConfirmationSchema } from "./schema/index";
import { Button, Form, FormField as Field } from "grommet";
import { useFormik } from "formik";

export default function EventEndConfirmationForm() {

    const [confirmEventEnd, {data}]  =  useMutation(EVENT_END_CONFIRM)
    const [eventPicturesEnd]  =  useMutation(ADD_EVENT_PITURES_ON_END)

    const formik = useFormik({
        initialValues: {
            text: "",
            eventPictures: "",
        },
        validationSchema: EventEndConfirmationSchema,
        onSubmit: async (values) => {
            await new Promise(
                console.log("onsubmit values ", values),

                confirmEventEnd({
                    variables: {
                        text: values.text,
                        profilePic: values.profilePic,
                    },
                }).then((data) => {
                    if (data.data.addEvent.success === true) {
                        Array.prototype.forEach.call(
                            values.eventPictures,
                            (element) => {
                                eventPicturesEnd({
                                    variables: {
                                        event: data.data.eventEndConfirmation.event.id,
                                        photos: element,
                                    },
                                });
                            }
                        );
                    }
                })
            );
        },
    });

    let errors = data ? data.eventEndConfirmation.errors : undefined;
    return (
        <>
            <div>
                {errors
                    ? errors.map((element) => (
                          <>
                              <div> {element.field} </div>
                              {element.messages.map((sub) => (
                                  <div>{sub}</div>
                              ))}
                          </>
                      ))
                    : undefined}
            </div>

            <Form encType={"multipart/form-data"}>
                <label htmlFor="name">
                    describe what you did in this event
                </label>
                <Field
                    id="text"
                    name="text"
                    placeholder="Description here"
                    onChange={formik.handleChange}
                />
                {formik.errors.text && formik.touched.text ? (
                    <div>{formik.errors.text}</div>
                ) : null}

                <input
                    type="file"
                    id="eventPictures"
                    name="eventPictures"
                    onChange={(event) => {
                        formik.setFieldValue(
                            "eventPictures",
                            event.target.files
                        );
                    }}
                    multiple
                />
                {formik.errors.eventPictures && formik.touched.eventPictures ? (
                    <div>{formik.errors.eventPictures}</div>
                ) : null}

                <Button
                    primary
                    label="Submit"
                    type="submit"
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                ></Button>
            </Form>
        </>
    );
}
