import React from "react";
import { ME } from "../../services/api/registration/index";

import { useQuery } from "@apollo/client";

import Home from "../home/index";
import Dashboard from "../dashboard/index";
import { Grid } from "grommet";
import { TooltipsSidebar } from "../../components/nav/side/index";
export default function Main() {
    const { data, error, loading } = useQuery(ME);
    console.log(data);
    console.log(error);
    console.log(loading);

    const me = data ? data.me : null;
    if (loading) return <div>loading</div>;
    return (
        <>
            <Grid
                columns={["8%", "92%"]}
                areas={[
                    ["nav", "main"],
                    ["nav", "main"],
                ]}
                rows={["large"]}
                gap="small"
            >
                <TooltipsSidebar gridArea="nav" type="home" />
                {me ? <Dashboard gridArea="main" /> : <Home gridArea="main" />}
            </Grid>
        </>
    );
}
