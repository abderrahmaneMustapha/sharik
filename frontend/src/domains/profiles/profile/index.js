import React from "react";

import { ME } from "../../../services/api/registration/index";

import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_RECENT_EVENTS } from "../../../services/api/events/index";
import {
    Box,
    Avatar,
    Header,
    Grid,
    Heading,
    Text,
    Button,
    Card,
    CardBody,
    CardHeader,
    List,
    Layer,
} from "grommet";
import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Medium,
    Link,
    DocumentTime,
    Close,
    FormEdit,
} from "grommet-icons";

import { TopRightNav } from "../../../components/nav/top/index";
import EventCreationForm from "../../../components/forms/EventCreationForm/index";
import { useHistory } from "react-router-dom";

const tags = ["gaming", "reading", "outdoors", "maths"];
const social_media_accounts = [
    <Facebook />,
    <Github />,
    <Instagram />,
    <Linkedin />,
    <Medium />,
    <Link />,
];

function CreateEvent() {
    const [open, setOpen] = React.useState(false);

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(undefined);
    return (
        <>
            <Button
                icon={<DocumentTime />}
                label={
                    <Text>
                        <strong>Add</strong>
                    </Text>
                }
                onClick={onOpen}
            />
            {open && (
                <Layer
                    position="right"
                    full="vertical"
                    margin={{ left: "100%" }}
                    modal
                    onClickOutside={onClose}
                    onEsc={onClose}
                >
                    <Box
                        fill="vertical"
                        width="100vw"
                        overflow="auto"
                        pad="medium"
                        onSubmit={onClose}
                    >
                        <Box flex={false} direction="row" justify="between">
                            <Heading level={2} margin="none">
                                Add new event
                            </Heading>
                            <Button icon={<Close />} onClick={onClose} />
                        </Box>
                        <EventCreationForm />
                    </Box>
                </Layer>
            )}
        </>
    );
}

function Bio() {
    return (
        <Card height="fit-content" pad="medium">
            <CardHeader>
                <Heading level="3">Bio : </Heading>
            </CardHeader>
            <CardBody height="fit-content" pad="small">
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    at ex lectus. Pellentesque ornare massa eget sem molestie,
                    ac pretium purus venenatis. Donec et tempor ligula, sed
                    vehicula nulla. Vestibulum at purus eget massa vulputate
                    eleifend accumsan vel metus. Maecenas imperdiet sollicitudin
                    diam. Donec tincidunt pellentesque justo id aliquet. Ut sit
                    amet velit vel ante tristique iaculis. Nulla sed metus id
                    turpis pellentesque imperdiet. Pellentesque ultricies
                    consequat lobortis. Vivamus et tortor tortor. Suspendisse
                    commodo ligula eget magna venenatis feugiat. Donec porttitor
                    velit at porta lobortis. Maecenas eget sodales mauris.
                    Nullam condimentum scelerisque volutpat. Sed et magna sit
                    amet lorem vestibulum efficitur. Sed accumsan eget nisl ut
                    efficitur.
                </Text>
            </CardBody>
        </Card>
    );
}

function SideBar() {
    const { data, loading } = useQuery(GET_CURRENT_USER_RECENT_EVENTS);
    const history = useHistory();

    if (loading) return <div>Loading .... </div>;
    return (
        <Card height="fit-content" pad="medium">
            <CardHeader>
                <Heading level="3">Recent events</Heading>
            </CardHeader>
            <CardBody height="fit-content" pad="small">
                <List
                    primaryKey="name"
                    data={data.getRecentUserEvents}
                    onClickItem={(event) => {
                        history.push(`/events/${event.item.slug}`);
                    }}
                    border="bottom"
                />
            </CardBody>
        </Card>
    );
}

function Tags(props) {
    
    return (
        <Box direction="row" width="large">
            {props.tags.map((element) => (
                <Button
                    margin={{
                        left: "0",
                        top: "0.2em",
                        bottom: "0.2em",
                    }}
                    label={element}
                />
            ))}

            <Button icon={<FormEdit />}></Button>
        </Box>
    );
}
export default function Profile() {
    const { data, loading, error } = useQuery(ME);

    if (error) console.log(error);
    if (loading) return <div>Loading ... </div>;

    if (!data.me) {
        window.location.reload();
        return <div>Not Logged in</div>;
    } else {
        localStorage.setItem("user_email", data.me.email);

        return (
            <>
                <Header direction="column" justify="start" align="start">
                    <TopRightNav />
                    <Box
                        background="#cdeac4"
                        direction="row"
                        gap="small"
                        pad={{
                            right: "5em",
                            left: "5em",
                            top: "2em",
                            bottom: "2em",
                        }}
                        fill="horizontal"
                    >
                        <Avatar
                            src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
                            size="xlarge"
                        />
                        <Box direction="column">
                            <Heading
                                level="2"
                                size="small"
                                margin={{
                                    left: "0.5em",
                                    top: "0.2em",
                                    bottom: "0.2em",
                                }}
                            >
                                {data.me.firstName} {data.me.lastName}
                            </Heading>
                            <Text
                                margin={{
                                    left: "0.5em",
                                    top: "1em",
                                    bottom: "0.8em",
                                }}
                            >
                                {data.me.email}
                            </Text>

                            <Tags tags={tags} />
                        </Box>

                        <Box direction="column">
                            <Box direction="row" gap="medium">
                                {social_media_accounts.map((element) => (
                                    <>{element}</>
                                ))}
                            </Box>
                            <Text margin={{ top: "1em", bottom: "1em" }}>
                                Tiaret, Algeria
                            </Text>

                            <CreateEvent   />
                        </Box>
                        
                    </Box>
                   
                </Header>

                <Box
                    width="90%"
                    margin={{ left: "auto", right: "auto", top: "4em" }}
                >
                    <Grid
                        rows={["xmedium"]}
                        columns={["60%", "40%"]}
                        areas={[["bio", "side"]]}
                        gap="small"
                    >
                        <Bio gridArea="bio" />
                        <SideBar gridArea="side" />
                    </Grid>
                </Box>
            </>
        );
    }
}
