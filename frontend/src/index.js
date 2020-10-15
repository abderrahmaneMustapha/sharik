import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import Main from "./domains/Main/index";
import Profile from "./domains/profiles/profile/index";
import Profiles from "./domains/profiles/profiles/index";
import EventProfile from "./domains/events/profile/index";

import * as serviceWorker from "./serviceWorker";

import { apolloClient } from "./apolloClient";
import { ApolloProvider } from "@apollo/client";

import { Grommet } from "grommet";

const theme = {
    global: {
        colors: {
            brand: "#4D9823",
            icons: "#76BB46",
            "accent-1": "#6BCB9B",
            "accent-2": "#EDF2F6",
            "green-1": "#D9823",
        },
    },
    button: {
        default: {
            color: "text",
            border: undefined,
            padding: {
                horizontal: "12px",
                vertical: "8px",
            },
        },
        primary: {
            background: { color: "green-1" },
            border: undefined,
            color: "text-strong",
            font: { weight: "bold" },
            padding: {
                horizontal: "12px",
                vertical: "8px",
            },
        },
        secondary: {
            border: { color: "brand", width: "4px" },
            color: "text",
            padding: {
                horizontal: "8px",
                vertical: "4px",
            },
        },
        active: {
            background: { color: "#D9823" },
            color: "text",
            secondary: {
                background: "none",
                border: {
                    color: "#D9823",
                },
            },
        },
        disabled: {
            opacity: 0.3,
            secondary: {
                border: { color: "text-weak" },
            },
        },
        hover: {
            background: { color: "#D9823" },
            secondary: {
                border: { color: "#D9823" },
            },
        },
    },
};
ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <Grommet theme={theme} full={true}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/profile/me" component={Profile} />
                        <Route
                            exact
                            path="/profiles/:id"
                            component={Profiles}
                        />
                        <Route
                            exact
                            path="/events/:slug"
                            component={EventProfile}
                        />
                    </Switch>
                </Router>
            </Grommet>
        </ApolloProvider>
    </React.StrictMode>,

    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
