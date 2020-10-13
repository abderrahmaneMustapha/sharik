import React from "react";
import { useRouteMatch } from "react-router-dom";
import {
  EVENT_BY_SLUG,
  EVENT_JOIN_REQUEST,
} from "../../../services/api/events/index";
import { EventJoinRequestPending, EventJoinRequestAccept } from "./joinEventsRequest/index";
import { ME } from "../../../services/api/registration/index";
import { useMutation, useQuery } from "@apollo/client";
import { Heading, Button, Box, Tab, Tabs } from "grommet";

export default function EventProfile() {
  let match = useRouteMatch();
  const { data, loading } = useQuery(EVENT_BY_SLUG, {
    variables: { slug: match.params.slug },
  });

  const [joinEvent] = useMutation(EVENT_JOIN_REQUEST);
  const { data: data_me, loading: loading_me } = useQuery(ME);

  const handleEventJoinReq = () => {
    console.log(
      joinEvent({
        variables: {
          id: data.getEventBySlug.id,
        },
      })
    );
  };

  if (loading || !data || loading_me || !data_me)
    return <div>Loading ... </div>;

  const current_user_email = localStorage.getItem("user_email");
  const event = data.getEventBySlug;
  
  const is_owner = event.eventCreator.email === current_user_email;

  return (
    <Box>
      <Heading>{event.name}</Heading>
      {!is_owner ? (
        <Button label="join event" onClick={handleEventJoinReq}></Button>
      ) : undefined}
      <Tabs>
        {is_owner ? (
          <Tab title="join request">
            <EventJoinRequestPending slug={match.params.slug} />
          </Tab>
        ) : undefined}

        <Tab title="members">
          <EventJoinRequestAccept slug={match.params.slug} />
        </Tab>
      </Tabs>
    </Box>
  );
}
