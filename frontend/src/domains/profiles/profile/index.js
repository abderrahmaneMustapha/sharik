import React from "react";

import { ME } from "../../../services/api/registration/index";

import { useQuery } from "@apollo/client";

import { Box, Avatar } from "grommet";

import EventCreationForm from "../../../components/forms/EventCreationForm/index";
export default function Profile() {
    const { data, loading, error } = useQuery(ME);

    if (error) console.log(error)
    if (loading) return <div>Loading ... </div>;

    if (!data.me) {
        window.location.reload();
        return <div>Not Logged in</div>;
    } else {
        localStorage.setItem("user_email", data.me.email);

        return (
            <>
                <Box direction="row" gap="small">
                    <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
                </Box>

                <EventCreationForm />
            </>
        );
    }
}
