import React, { useContext } from "react";

import SigninForm from "../../components/forms/LoginForm/index";
import SignupForm from "../../components/forms/SignupForm/index";
import { RichTabTitle } from "../../components/tabs/index";

import { UserNew, UserAdmin, Add, Close } from "grommet-icons";
import {
    Tabs,
    Text,
    Card,
    Tab,
    Grid,
    Box,
    Heading,
    Button,
    Layer,
    ResponsiveContext,
} from "grommet";
const cards = Array(5)
    .fill()

    .map((_, i) => (
        <Text key={i}>{`one of the best websites i have ever used ${i}`}</Text>
    ));

const Cards = () => {
    const size = useContext(ResponsiveContext);
    return (
        <Grid
            margin={{ bottom: "xsmall", top: "medium" }}
            columns={size !== "small" ? "small" : "100%"}
            gap="small"
        >
            {cards.map((card, index) => (
                <Card pad="large" key={index}>
                    {card}
                </Card>
            ))}
        </Grid>
    );
};
function Home() {
    const [open, setOpen] = React.useState(false);
    const [select, setSelect] = React.useState("");

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(undefined);
    return (
        <>
            <Grid
                rows={["large"]}
                columns={["5/7", "2/7"]}
                areas={[
                    ["main", "aside"],
                    ["main", "aside"],
                ]}
                gap="small"
            >
                <Box gridArea="main">
                    <Heading
                        level={1}
                        margin={{ bottom: "xsmall", top: "medium" }}
                        size={"xlarge"}
                    >
                        Sharik UIK
                    </Heading>
                    <Heading
                        level={3}
                        margin={{ bottom: "medium", top: "medium" }}
                        size={"large"}
                    >
                        Online
                    </Heading>
                    <Text
                        size={"large"}
                        margin={{ bottom: "medium", top: "large" }}
                    >
                        What People Say
                    </Text>
                    <Cards />
                </Box>
                <Box gridArea="aside" background="brand">
                    <Button icon={<Add />} label="Add" onClick={onOpen} />
                    {open && (
                        <Layer
                            position="right"
                            full="vertical"                          
                            modal
                            onClickOutside={onClose}
                            onEsc={onClose}
                        >
                            <Box flex={false} direction="row" justify="between">
                                <Button icon={<Close />} onClick={onClose} />
                            </Box>
                            <Tabs background="brand" margin={{left: "3em", right : "3em"}}>
                                <Tab
                                    title={
                                        <RichTabTitle
                                            icon={<UserAdmin color="brand" />}
                                            label="Login"
                                        />
                                    }
                                >
                                    <SigninForm />
                                </Tab>

                                <Tab
                                    title={
                                        <RichTabTitle
                                            icon={<UserNew color="brand" />}
                                            label="New user"
                                        />
                                    }
                                >
                                    <SignupForm />
                                </Tab>
                            </Tabs>
                        </Layer>
                    )}
                </Box>
            </Grid>
        </>
    );
}

export default Home;
