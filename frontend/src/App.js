import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

// apollo-link-http to pull graphql data to apollo-client
const serverUri = createHttpLink({ uri: 'http://localhost:5000'});
// apollo client constructor with cacheinmemory 
const client = new ApolloClient({ link: serverUri, cache: new InMemoryCache()})


function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Router>
          <Header/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Login' component={Login}/>
          <Route exact path='/Register' component={Register}/>
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
