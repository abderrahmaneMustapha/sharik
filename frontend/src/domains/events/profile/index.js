import React from "react";
import { useRouteMatch } from "react-router-dom";
import {
    EVENT_BY_SLUG,
    EVENT_JOIN_REQUEST,
} from "../../../services/api/events/index";
import {
    EventJoinRequestPending,
    EventJoinRequestAccept,
    EventPicturesOnCreation,
    EventPicturesOnEnd,
    EventEndConfirmation,
} from "./components/index";
import { ME } from "../../../services/api/registration/index";
import { useMutation, useQuery } from "@apollo/client";
import { Heading, Button, Tab, Tabs, Grid, Header, Box } from "grommet";
import { LikeSideBar } from "../../../components/nav/side/index";

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
        <>
            <LikeSideBar id={data.getEventBySlug.id}></LikeSideBar>
            <Box margin="large">
             <EventEndConfirmation />
                <Grid fill rows={["medium", "auto"]} columns={["auto"]}>
                    <Header direction="column">
                        <Heading>{event.name}</Heading>
                        <EventPicturesOnCreation id={data.getEventBySlug.id} />
                        <EventPicturesOnEnd id={data.getEventBySlug.id} />
                    </Header>

                    <Box direction="column">
                        {!is_owner ? (
                            <Button
                                label="join event"
                                onClick={handleEventJoinReq}
                            ></Button>
                        ) : undefined}
                        <Tabs>
                            {is_owner ? (
                                <Tab title="join request">
                                    <EventJoinRequestPending
                                        slug={match.params.slug}
                                    />
                                </Tab>
                            ) : undefined}

                            <Tab title="members">
                                <EventJoinRequestAccept
                                    slug={match.params.slug}
                                />
                            </Tab>
                        </Tabs>
                    </Box>
                </Grid>
            </Box>
        </>
    );
}
