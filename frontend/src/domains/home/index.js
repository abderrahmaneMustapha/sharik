import React from "react";

import SigninForm from "../../components/forms/LoginForm/index";
import SignupForm from "../../components/forms/SignupForm/index";
import { RichTabTitle } from "../../components/tabs/index";

import { UserNew, UserAdmin } from "grommet-icons";
import { Tabs, Tab, Grid, Box } from "grommet";

function Home() {
  return (
    <>
      <Grid
        fill
        height="100vh"
        areas={[
          { name: "main", start: [0, 0], end: [0, 0] },
          { name: "aside", start: [1, 0], end: [1, 0] },
        ]}
        columns={["small", "flex"]}
        rows={["flex"]}
        gap="small"
      >
        <Box  gridArea="main">

            azeazeaze
        </Box>
        <Box height="100%" gridArea="aide">
          <Tabs>
            <Tab
              title={
                <RichTabTitle
                  icon={<UserAdmin color="accent-2" />}
                  label="Login"
                />
              }
            >
              <SigninForm />
            </Tab>

            <Tab
              title={
                <RichTabTitle
                  icon={<UserNew color="accent-2" />}
                  label="New user"
                />
              }
            >
              <SignupForm />
            </Tab>
          </Tabs>
        </Box>
      </Grid>
    </>
  );
}

export default Home;
