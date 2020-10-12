import React from "react";
import { CurrentEvents, PastEvents, UpcomingEvents } from "./EventsLists/index";
import { Tab, Tabs } from "grommet";
export default function Dashboard() {
  return (
    <>
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

    </>
  );
}
