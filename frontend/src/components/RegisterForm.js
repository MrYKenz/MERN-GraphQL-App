import React from 'react'
import { Form, Button, Checkbox } from 'semantic-ui-react';

const RegisterForm = ({onSubmit, onChange, 
    values, errors, loading}) => (
    <Form onSubmit={onSubmit} 
    className={loading ? 'loading' : ''}>
        <Form.Input name='username'
        label='Username'
        placeholder='Create a Username'
        value={values.username}
        onChange={onChange}
        error={errors.username} />
        <Form.Input name='email'
        label='Email'
        placeholder='Enter your Email'
        value={values.email}
        onChange={onChange}
        error={errors.email} />
        <Form.Input name='password'
        label='Password'
        placeholder='Enter your Password'
        value={values.password}
        onChange={onChange}
        error={errors.password} 
        type='password' />
        <Form.Input name='password2'
        label='Confirm Password'
        placeholder='Re-enter your Password'
        value={values.password2}
        onChange={onChange} 
        error={errors.password}
        type='password' />
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Register</Button>
    </Form>
)

export default RegisterForm
