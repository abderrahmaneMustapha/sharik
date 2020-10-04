import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { Button, Form, FormField as Field, TextArea, DateInput } from "grommet";
import { useFormik } from "formik";

import moment from "moment";

import { CREATE_EVENT } from "../../../services/api/events/index";

import { EventCreationSchema } from "./schema/index";

export default function EventCreationForm(props) {
  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT);

  const [startAt_value, SetStartAt] = useState(new Date());
  const [endAt_value, SetEndAt] = useState(new Date());

  if (error) console.log(error);
  if (data) console.log(data);


  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      position: "",
      startAt: "",
      endAt: "",
      profilePic: "",
    },
    validationSchema: EventCreationSchema,
    onSubmit: async (values) => {
     
      await new Promise(
        console.log("onsubmit values ", values),
        console.log(
          createEvent({
            variables: {
              name: values.name,
              eventCreator : localStorage.getItem("user_id"),
              description: values.description,
              position: values.position,
              startAt: values.startAt,
              endAt: values.endAt,
              profilePic: values.profilePic,
            },
          })
        )
      );
    },
  });

  if (loading) return <div>Loading ... </div>;

  let errors = data ? data.addEvent.errors : undefined;

  return (
    <>
      <div>
        {errors
          ? Object.keys(errors).map((element) =>
              errors[element].map((sub) => <div>{sub.message}</div>)
            )
          : undefined}
      </div>

      <Form >
        <label htmlFor="name">Event name</label>
        <Field
          id="name"
          name="name"
          placeholder="New event name"
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="description">Event description</label>
        <TextArea
          id="description"
          name="description"
          placeholder="New event description"
          onChange={formik.handleChange}
        />
        {formik.errors.description && formik.touched.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <label htmlFor="position">Event Location</label>
        <Field
          id="position"
          name="position"
          placeholder="New event position ( country , city ) or (city , place) "
          onChange={formik.handleChange}
        />
        {formik.errors.position && formik.touched.position ? (
          <div>{formik.errors.position}</div>
        ) : null}

        <Field name="startAt" label="startAt"  value={startAt_value.toString()}>
          <DateInput
            name="startAt"
          
            format="YYYY-MM-DD"
            onChange={(value) => {
              console.log(value)
              let newdate = moment(value).format("YYYY-MM-DD");
              SetStartAt(newdate);
              console.log(newdate)
              formik.setFieldValue("startAt", newdate);
            }}
          />
        </Field>
        {formik.errors.startAt && formik.touched.startAt ? (
          <div>{formik.errors.startAt}</div>
        ) : null}

        <Field name="endAt" label="endAt"  value={endAt_value.toString()} >
          <DateInput
            name="endAt"
            value={endAt_value.toString()}
            format="YYYY-MM-DD"
            onChange={(value) => {
              let newdate = moment(value).format("YYYY-MM-DD");
              console.log("end date ", newdate)
              SetEndAt(newdate);
              formik.setFieldValue("endAt", newdate);
            }}
          />
        </Field>
        {formik.errors.endAt && formik.touched.endAt ? (
          <div>{formik.errors.endAt}</div>
        ) : null}
        <input  id="profilePic" name="profilePic" type="file" onChange={event=>{
          console.log(event.target.files[0].name)
          formik.setFieldValue("profilePic", event.target.files[0]);
        }} />
    
        <Button
          primary
          label="Submit"
          type="submit"
          color="dark-1"
          onClick={event=>{
            console.log(formik.values)
            formik.handleSubmit()
          }}
        ></Button>
      </Form>
    </>
  );
}
