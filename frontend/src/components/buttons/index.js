import React from "react";

import { Box, Heading, List } from "grommet";

import { useQuery, useMutation } from "@apollo/client";

import { GET_USER_NOTIFICATIONS_UNREAD, LIKE_EVENT, FAV_EVENT, WAS_THERE_EVENT, HATE_EVENT } from "../../services/api/events/index";
import {Like, Favorite, Alert, View} from "grommet-icons"

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

export const LikeButton  = (props)=>{
     const [likeEvent, {data}]= useMutation(LIKE_EVENT)
    return(
        <Like />
    )
}

export const HateButton  = (props)=>{
    const [hateEvent, {data}]= useMutation(HATE_EVENT)
   return(
    <Alert />
   )
}

export const WasThereButton  = (props)=>{
    const [wasThereEvent, {data}]= useMutation(WAS_THERE_EVENT)
   return(
    <View />
   )
}

export  const FavButton = (props)=>{
    const [favEvent, {data}] = useMutation(FAV_EVENT)
    return(
        <Favorite />
    )
}