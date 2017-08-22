import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router,Route,hashHistory,IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
    uri : '/graphql',
    opts : {
        credentials : 'same-origin' // this is what tells to send cookies to the backend server
    }
});

const client = new ApolloClient({
    networkInterface,
    dataIdFromObject : o => o.id    // very ideal in case of MONGO DB since every record will be having unique ID globally as well,
                                    // create custom network interface, to make sure : send the cookies also. Send the Cookies too
});

const Root = () => {
  return (
      <ApolloProvider client ={client}>
          <Router history={hashHistory}>
              <Route path="/" component={App}>
                  <Route path="/login" component={LoginForm} />
                  <Route path="/signup" component={SignupForm} />
                  <Route path="/dashboard" component={requireAuth(Dashboard)} />
              </Route>
          </Router>
      </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
