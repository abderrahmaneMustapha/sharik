import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
  EVENT_BY_SLUG,
  EVENT_JOIN_REQUEST,
  GET_PENDING_EVENT_JOIN_REQUEST,
} from "../../../services/api/events/index";
import { ME } from "../../../services/api/registration/index";
import { useMutation, useQuery } from "@apollo/client";
import { Heading, Button, Box, List, Image, Text } from "grommet";
export default function EventProfile() {
  let history = useHistory();
  let match = useRouteMatch();
  const { data, loading } = useQuery(EVENT_BY_SLUG, {
    variables: { slug: match.params.slug },
  });

  const {
    data: pending_req_data,
    loading: pending_req_loading,
  } = useQuery(GET_PENDING_EVENT_JOIN_REQUEST, {
    variables: { slug: match.params.slug },
  });

  console.log(
    useQuery(GET_PENDING_EVENT_JOIN_REQUEST, {
      variables: { slug: match.params.slug },
    })
  );

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
  const me = data_me.me;
  const is_owner = me.email === current_user_email;

  return (
    <Box>
      <Heading>{event.name}</Heading>
      {!is_owner ? (
        <Button label="join event" onClick={handleEventJoinReq}></Button>
      ) : (
        <>
          {pending_req_loading ? undefined : (
            <List
              primaryKey={(item) => (
                <>
                  <Box height="small" width="medium">
                    <Image
                      src={
                        "http://localhost:8000/media/" +
                        item.requestFrom.profilePic
                      }
                      fit="contain"
                    />
                  </Box>
                  <Text>
                    {item.requestFrom.firstName} {item.requestFrom.lastName}
                  </Text>
                </>
              )}
              secondaryKey={(item) => {}}
              onClickItem={(event) => {
                history.push(`/profiles/${event.item.requestFrom.username}`);
              }}
              data={pending_req_data.getEventsUserJoinRequestsPending}
            />
          )}
        </>
      )}
    </Box>
  );
}
