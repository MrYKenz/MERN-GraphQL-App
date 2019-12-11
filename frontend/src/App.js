import React, { useContext } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider, AuthContext } from './Auth';

// apollo-link-http to pull graphql data to apollo-client
const serverUri = createHttpLink({ uri: 'http://localhost:5000'});
const client = new ApolloClient({ link: serverUri, cache: new InMemoryCache()})

// if authenticated redirect away from register & login pages
const AuthRoute = ({ component: Component, ...prev}) => {
  const context = useContext(AuthContext);
  return (<Route {...prev} render={props => context.user ?
    <Redirect to="/" /> : <Component {...props}/>}
  />)
}

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Container>
          <Router>
            <Header/>
            <Route exact path='/' component={Home}/>
            <AuthRoute exact path='/Login' component={Login}/>
            <AuthRoute exact path='/Register' component={Register}/>
          </Router>
        </Container>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
