import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import RegisterForm from '../components/RegisterForm'

const CREATE_USER_MUTATION = gql`
    mutation register(
        $username: String!
        $password: String!
        $email: String!
    )   {
        createUser(
            register:{
                username: $username
                password: $password
                email: $email
        })  
    { id email token username createdAt }
}`

function Register() {
    const [values, setValues] = useState({ 
        username: '',
        email: '',
        password: '',
        password2: ''});
    const [errors, setErrors] = useState({})

    const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, 
        { 
            update(proxy, result) {
                // console.log(result)
                window.location.replace("/")
            }, 
            onError(err) {
                // catches gql errors to use in state - present to user
                setErrors(err.graphQLErrors[0].extensions.exception.errors)
            },
            variables: values 
        });

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (values.password === values.password2) {
            console.log('passwords match')
            createUser()
        } else {
            setErrors({
                password: 'passwords do not match'
            })
        }
    }

    return (
      <RegisterForm 
        onSubmit={onSubmit}
        onChange={onChange}
        values={values}
        errors={errors}
        loading={loading}
      />
    )
}

export default Register;
