import React from 'react'
import { Form, Button } from 'semantic-ui-react';

const LoginForm = ({onSubmit, onChange, 
    values, errors, loading}) => (
    <Form onSubmit={onSubmit} 
    className={loading ? 'loading' : ''}>
        <Form.Input name='username'
        label='Username'
        placeholder='Create a Username'
        value={values.username}
        onChange={onChange}
        error={errors.username} />
        <Form.Input name='password'
        label='Password'
        placeholder='Enter your Password'
        value={values.password}
        onChange={onChange}
        error={errors.password} 
        type='password' />
        <Button type='submit'>Login</Button>
    </Form>
)

export default LoginForm
