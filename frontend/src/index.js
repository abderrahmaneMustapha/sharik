import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './domains/Main/index';
import * as serviceWorker from './serviceWorker';
import {apolloClient} from "./apolloClient"
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Main />
    </ApolloProvider>
  </React.StrictMode>
  
  ,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
