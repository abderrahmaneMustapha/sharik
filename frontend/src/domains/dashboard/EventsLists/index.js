import React from "react"
import {CURRENT_ALL_EVENTS,PAST_ALL_EVENTS,UPCOMING_ALL_EVENTS} from "../../../services/api/events/index"
import { useQuery } from "@apollo/client";
import { List, Image, Box, Heading, Text } from "grommet";
import { useHistory } from "react-router-dom";

export function CurrentEvents(){
    
  const { data, loading } = useQuery(CURRENT_ALL_EVENTS);
  let history = useHistory();

  if (loading) return <div>Loading ....</div>;
    return(
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
          data={data.currentAllEvents}
        />
    )
}


export function PastEvents(){
    
    const { data, loading } = useQuery(PAST_ALL_EVENTS);
    let history = useHistory();
  
    if (loading) return <div>Loading ....</div>;
      return(
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
            data={data.pastAllEvents}
          />
      )
  }


  export function UpcomingEvents(){
    
    const { data, loading } = useQuery(UPCOMING_ALL_EVENTS);
    let history = useHistory();
  
    if (loading) return <div>Loading ....</div>;
      return(
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
            data={data.upcomingAllEvents}
          />
      )
  }