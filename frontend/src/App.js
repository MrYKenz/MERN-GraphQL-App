import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// apollo-link-http to pull graphql data to apollo-client
const serverUri = createHttpLink({ uri: 'http://localhost:5000'});
// apollo client constructor with cacheinmemory 
const client = new ApolloClient({ link: serverUri, cache: new InMemoryCache()})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
