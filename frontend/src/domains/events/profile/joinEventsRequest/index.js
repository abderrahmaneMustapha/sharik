import React from "react";
import { GET_PENDING_EVENT_JOIN_REQUEST } from "../../../../services/api/events/index";
import { List, Image, Text, Box } from "grommet";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

export function EventJoinRequestPending(props) {
  let history = useHistory();
  const { data, loading } = useQuery(GET_PENDING_EVENT_JOIN_REQUEST, {
    variables: { slug: props.slug },
  });

  if (loading) return <div>Loading...</div>;
  if (!data) return <duv> Nothing to see here ! </duv>;
  return (
    <List
      primaryKey={(item) => (
        <>
          <Box height="small" width="medium">
            <Image
              src={"http://localhost:8000/media/" + item.requestFrom.profilePic}
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
      data={data.getEventsUserJoinRequestsPending}
    />
  );
}
