import React from "react";
import { CurrentEvents, PastEvents, UpcomingEvents } from "./EventsLists/index";
import { Tab, Tabs, Box } from "grommet";
export default function Dashboard() {
    return (
        <Box fill={true}>
            <div>Dashboard</div>

            <main>
                <Tabs>
                    <Tab title="Past">
                        <PastEvents />
                    </Tab>
                    <Tab title="Current">
                        <CurrentEvents />
                    </Tab>
                    <Tab title="Upcoming">
                        <UpcomingEvents />
                    </Tab>
                </Tabs>
            </main>
        </Box>
    );
}
