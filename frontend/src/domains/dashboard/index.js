import React from "react";
import { CurrentEvents, PastEvents, UpcomingEvents } from "./EventsLists/index";
import { Tab, Tabs, Box } from "grommet";
import { TopRightNav} from "../../components/nav/top/index"

export default function Dashboard() {
    return (
        <Box fill={true}>
            <TopRightNav />
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
