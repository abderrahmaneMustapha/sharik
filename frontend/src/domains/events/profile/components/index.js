import React, {useState} from "react";
import {
    GET_PENDING_EVENT_JOIN_REQUEST,
    ACCEPT_JOIN_REQUEST,
    GET_EVENT_ACCEPTED_JOIN_REQUEST,
    GET_EVENT_PICTURES_BY_ID_ON_CREATION,
    GET_EVENT_PICTURES_BY_ID_ON_END,
} from "../../../../services/api/events/index";

import EventEndConfirmationForm from "../../../../components/forms/EventEndConfirmation/index"
import { List, Image, Text, Box, Button, Carousel, Layer } from "grommet";
import {Checkmark, Close} from "grommet-icons"
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

export function EventJoinRequestPending(props) {
    let history = useHistory();
    let { data, loading } = useQuery(GET_PENDING_EVENT_JOIN_REQUEST, {
        variables: { slug: props.slug },
    });
    const [acceptEventJoinRequest] = useMutation(ACCEPT_JOIN_REQUEST);

    if (loading) return <div>Loading...</div>;
    data = data ? data.getEventsUserJoinRequestsPending : undefined;
    if (!data) return <duv> Nothing to see here ! </duv>;
    return (
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
            secondaryKey={(item) => (
                <>
                    <Button
                        label="accept"
                        onClick={() =>
                            acceptEventJoinRequest({
                                variables: { id: item.id },
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
    });

    if (loading) return <div>Loading...</div>;
    data = data ? data.getEventsUserJoinRequestsAccepted : undefined;
    if (!data) return <div> Nothing to see here ! </div>;
    return (
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
            secondaryKey={(item) => <></>}
            onClickItem={(event) => {
                history.push(`/profiles/${event.item.requestFrom.key}`);
            }}
            data={data}
        />
    );
}

export function EventPicturesOnCreation(props) {
    const { data, loading } = useQuery(GET_EVENT_PICTURES_BY_ID_ON_CREATION, {
        variables: { id: props.id },
    });

    if (loading) return <div>Loading</div>;
    const pictures = data.getEventPicturesByIdOnCreation;
    return (
        <Carousel >
            {pictures.map((element) => (
                <Box height="small" width="small">
                    <Image
                        fit="contain"
                        fill
                        src={"http://localhost:8000/media/" + element.pictures}
                    />
                </Box>
            ))}
        </Carousel>
    );
}

export function EventPicturesOnEnd(props) {
    const { data, loading } = useQuery(GET_EVENT_PICTURES_BY_ID_ON_END, {
        variables: { id: props.id },
    });

    if (loading) return <div>Loading</div>;
    const pictures = data.getEventPicturesByIdOnEnd;
    return (
        <Carousel>
            {pictures.map((element) => (
                <Box height="small" width="small">
                    <Image
                        fit="contain"
                        fill
                        src={"http://localhost:8000/media/" + element.pictures}
                    />
                </Box>
            ))}
        </Carousel>
    );
}

export function EventEndConfirmation(){
    const [open, setOpen] = useState(false);
   

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(undefined);

    return(
        <>
        <Button icon={<Checkmark />} label="Confirm Event" onClick={onOpen} />
        {open && (
            <Layer
                position="right"
                full
                margin={{left:"100vw"}}             
                modal
                onClickOutside={onClose}
                onEsc={onClose}
            >
             <Box flex={false} direction="row" justify="between"  >
                                <Button icon={<Close />} onClick={onClose} />
            </Box>
        <EventEndConfirmationForm />
        </Layer>
        )}
        </>
    )
}



