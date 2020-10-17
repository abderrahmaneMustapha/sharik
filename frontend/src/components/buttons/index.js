import React from "react";

import { Box, Heading, List } from "grommet";

import { useQuery } from "@apollo/client";

import { GET_USER_NOTIFICATIONS_UNREAD } from "../../services/api/events/index";

export const NotificationDropContent = ({ onClose }) => {
    const { data, loading, error } = useQuery(GET_USER_NOTIFICATIONS_UNREAD);
    console.log(data)
    if(error) console.log(error)
    if(loading) return <div>Loading ... </div>
    return (
        <Box pad="madium" overflow="hidden"  fill >
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
