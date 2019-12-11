import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../Auth';

const LOGIN_USER_MUTATION = gql`
    mutation login($username: String! $password: String!) {
      loginUser(login: {username: $username, password: $password}) 
      { id username createdAt email token }}`

function Login() {
    const context = useContext(AuthContext);
    const [values, setValues] = useState({ username: '', password: ''});
    const [errors, setErrors] = useState({});

    const [LoginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, 
      { 
        update(proxy, result) {
          // console.log(result.data.loginUser)
          context.login(result.data.loginUser);
          // window.location.replace("/")
        }, 
        onError(err) {
          // catches gql errors to use in state - present to user
          // console.log(err.graphQLErrors[0].extensions.exception.errors)
          setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values 
      });

    const onChange = e => {
      setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
      e.preventDefault();
      LoginUser()
    }

    return (
      <LoginForm 
        onSubmit={onSubmit}
        onChange={onChange}
        values={values}
        errors={errors}
        loading={loading}
      />
    )
}

export default Login;

