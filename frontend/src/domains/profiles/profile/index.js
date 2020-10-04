import React from "react";

import { ME } from "../../../services/api/registration/index";

import { useQuery } from "@apollo/client";

import { Box, Avatar } from "grommet";

import EventCreationForm, {} from "../../../components/forms/EventCreationForm/index"
export default function Profile() {
  const { data, loading, error } = useQuery(ME);

  

  console.log(error);
  if (loading) return <div>loading</div>;
  if (!data.me && loading === true) return <div>Not Logged in</div>;
  if(data.me) localStorage.setItem("user_id", data.me.pk)
  

  return (
    <>
      <Box direction="row" gap="small">
        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
      </Box>

      <EventCreationForm />
    </>
  );
}
