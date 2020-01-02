import React, { useContext } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/Details';
import JobDetails from './pages/JobDetails';
import JobDetails2 from './pages/JobDetails2';
import Header from './components/Header';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider, AuthContext } from './Auth';

// apollo-link-http to connect graphql API to apollo-client and jwt added with apollo-link-context
const serverUri = createHttpLink({ uri: 'https://londondevjobs.herokuapp.com/graphql'});
const authLink = setContext(() => { return { headers: {authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''}}})
const client = new ApolloClient({ link: authLink.concat(serverUri), cache: new InMemoryCache()})
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
            <Route exact path='/posts/:postID' component={Details}/>
            <Route exact path='/jobs/:jobID' component={JobDetails}/>
            <Route exact path='/jobs2/:jobID' component={JobDetails2}/>
            <AuthRoute exact path='/Login' component={Login}/>
            <AuthRoute exact path='/Register' component={Register}/>
          </Router>
        </Container>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
