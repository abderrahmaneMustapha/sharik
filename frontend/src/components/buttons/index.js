import React, { useEffect } from "react";

import { Box, Button, Heading, List, Text } from "grommet";

import { useQuery, useMutation } from "@apollo/client";

import {
    GET_USER_NOTIFICATIONS_UNREAD,
    LIKE_EVENT,
    FAV_EVENT,
    WAS_THERE_EVENT,
    HATE_EVENT,
    GET_EVENT_FAVS_NUMBERS,
    GET_EVENT_LIKES_NUMBERS,
    GET_EVENT_WAS_THERES_NUMBERS,
} from "../../services/api/events/index";
import { Like, Favorite, Alert, View } from "grommet-icons";

export const NotificationDropContent = ({ onClose }) => {
    const { data, loading, error } = useQuery(GET_USER_NOTIFICATIONS_UNREAD);
    console.log(data);
    if (error) console.log(error);
    if (loading) return <div>Loading ... </div>;
    return (
        <Box pad="madium" overflow="hidden" fill>
            <Box direction="row" justify="between" align="center">
                <Heading level={5} margin="small">
                    Notifcations
                </Heading>
            </Box>

            <List
                primaryKey={"verb"}
                secondaryKey=""
                data={data.getUserNotificationsUnread}
            />
        </Box>
    );
};

export const LikeButton = (props) => {
    const { data, loading } = useQuery(GET_EVENT_LIKES_NUMBERS, {
        variables: { id: props.id },
    });

    const [likeEvent, { data: data_mut }] = useMutation(LIKE_EVENT);

    if (loading) return <div>Loading ...</div>;
    return (
        <Button
            icon={<Like />}
            label={
                <Text>
                    {data_mut
                        ? data_mut.eventLike.eventLikeNumbers
                        : data.getEventsLikesNumbers}
                </Text>
            }
            onClick={() => {
                likeEvent({
                    variables: { id: props.id },
                });
            }}
        ></Button>
    );
};

export const HateButton = (props) => {
    const [hateEvent] = useMutation(HATE_EVENT);
    return (
        <Button
            icon={<Alert />}
            onClick={() => {
                hateEvent({
                    variables: { id: props.id },
                });
            }}
        ></Button>
    );
};

export const WasThereButton = (props) => {
    const { data, loading } = useQuery(GET_EVENT_WAS_THERES_NUMBERS, {
        variables: { id: props.id },
    });
    const [wasThereEvent, { data: data_mut }] = useMutation(WAS_THERE_EVENT);
    useEffect(() => {
        wasThereEvent({
            variables: { id: props.id },
        });
    }, [props.id, wasThereEvent]);

    if (loading) return <div>Loading ...</div>;
    return (
        <Button
            icon={<View />}
            label={
                <Text>
                    {data_mut
                        ? data_mut.eventWasThere.eventWasThereNumbers
                        : data.getEventsWasThereNumbers}
                </Text>
            }
        ></Button>
    );
};

export const FavButton = (props) => {
    const { data, loading } = useQuery(GET_EVENT_FAVS_NUMBERS, {
        variables: { id: props.id },
    });
    const [favEvent, { data: data_mut }] = useMutation(FAV_EVENT);

    if (loading) return <div>Loading ...</div>;
    return (
        <Button
            icon={<Favorite />}
            label={
                <Text>
                    {data_mut
                        ? data_mut.eventFavorite.eventFavNumbers
                        : data.getEventsFavsNumbers}
                </Text>
            }
            onClick={() => {
                favEvent({
                    variables: { id: props.id },
                });
            }}
        ></Button>
    );
};
