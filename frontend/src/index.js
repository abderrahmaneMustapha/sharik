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
import { grommet } from "grommet/themes";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Grommet theme={grommet}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/profile/me" component={Profile} />
            <Route exact path="/profiles/:id" component={Profiles} />
            <Route exact path="/events/:slug" component={EventProfile} />
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
