import React from "react";

import { ME } from "../../../services/api/registration/index";

import { useQuery } from "@apollo/client";

import { Box, Avatar, Header, Grid, Heading, Text, Button } from "grommet";
import { Facebook, Github, Instagram, Linkedin, Medium, Link } from "grommet-icons";

import { TopRightNav } from "../../../components/nav/top/index";
import EventCreationForm from "../../../components/forms/EventCreationForm/index";

const tags = ["gaming", "reading", "outdoors", "maths"];
const social_media_accounts = [
    <Facebook />,
    <Github  />,
    <Instagram />,
    <Linkedin />,
    <Medium />,
    <Link />
];
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
                            <Box direction="row" width="large">
                                {tags.map((element) => (
                                    <Button
                                        margin={{
                                            left: "0",
                                            top: "0.2em",
                                            bottom: "0.2em",
                                        }}
                                        label={element}
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Box direction="column">
                            <Box direction="row" gap="medium">
                                {social_media_accounts.map((element) => (
                                    <>{element}</>
                                ))}
                            </Box>
                            <Text margin={{top:"1em", bottom:"1em"}}>Tiaret, Algeria</Text>
                        </Box>
                    </Box>
                </Header>

                <EventCreationForm />

                <Grid
                    rows={["xxsmall", "medium", "xsmall"]}
                    columns={["1/4", "3/4"]}
                    areas={[
                        ["header", "header"],
                        ["sidebar", "main"],
                        ["footer", "footer"],
                    ]}
                    gap="small"
                ></Grid>
            </>
        );
    }
}
