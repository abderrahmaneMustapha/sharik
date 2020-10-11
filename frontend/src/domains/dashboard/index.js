import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_EVENTS } from "../../services/api/events/index";
import { List, Image, Box, Heading, Text } from "grommet";
import { useHistory } from "react-router-dom";
export default function Dashboard() {
  console.log(useQuery(ALL_EVENTS))
  const { data, loading } = useQuery(ALL_EVENTS);
  let history = useHistory();

  if (loading) return <div>Loading ....</div>;
  return (
    <>
      <div>Dashboard</div>

      <main>
        <List
          primaryKey={(item) => (
            <>
              <Box height="small" width="medium">
                <Image
                  src={"http://localhost:8000/media/" + item.profilePic}
                  fit="contain"
                />
              </Box>
              <Box>
                <Heading level="3">{item.name}</Heading>
                <Text>start at : {item.startAt}</Text>
                <Text>end at : {item.endAt}</Text>
                <Text>position : {item.position}</Text>
              </Box>
              <Box width="medium">
                <Text>{`${item.description.substring(0, 100)}...`}</Text>
              </Box>
            </>
          )}
          secondaryKey="city"
          onClickItem={(event) => {
            history.push(`/events/${event.item.slug}`);
          }}
          data={data.allEvents}
        />
      </main>
    </>
  );
}
