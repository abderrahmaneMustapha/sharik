import React from "react";
import {
  GET_PENDING_EVENT_JOIN_REQUEST,
  ACCEPT_JOIN_REQUEST,
  GET_EVENT_ACCEPTED_JOIN_REQUEST
} from "../../../../services/api/events/index";
import { List, Image, Text, Box, Button } from "grommet";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

export function EventJoinRequestPending(props) {
  let history = useHistory();
  let { data, loading } = useQuery(GET_PENDING_EVENT_JOIN_REQUEST, {
    variables: { slug: props.slug },
  })
  const [acceptEventJoinRequest] = useMutation(ACCEPT_JOIN_REQUEST)

  if (loading) return <div>Loading...</div>
  data =  data ? data.getEventsUserJoinRequestsPending : undefined
  if (!data) return <duv> Nothing to see here ! </duv>
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
      secondaryKey={(item) => (
        <>
          <Button
            label="accept"
            onClick={() =>
                acceptEventJoinRequest({
                variables: {id : item.id},
              })
            }
          />
          <Button
            label="check user profile"
            onClick={() => {
              history.push(`/profiles/${item.requestFrom.key}`);
            }}
          />
        </>
      )}
      data={data}
    />
  );
}

export function EventJoinRequestAccept(props) {
    let history = useHistory();
    let { data, loading } = useQuery(GET_EVENT_ACCEPTED_JOIN_REQUEST, {
      variables: { slug: props.slug },
    })

  
    if (loading) return <div>Loading...</div>;
    data = data ? data.getEventsUserJoinRequestsAccepted :undefined 
    if (!data) return <div> Nothing to see here ! </div>;
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
        secondaryKey={(item) => (
          <>
           
          </>
        )}
        onClickItem={(event)=>{
            history.push(`/profiles/${event.item.requestFrom.key}`)
        }}
        data={data}
      />
    );
  }
