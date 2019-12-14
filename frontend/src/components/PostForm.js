import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_POST_MUTATION = gql`
    mutation ($title: String! $body: String!) {
        createPost(title: $title body: $body) { 
            id title body username createdAt }}`

function PostForm() {
    const [values, setValues] = useState({ title: '', body: ''});
    const [errors, setErrors] = useState({});

    const [CreatePost, { error }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) {
            console.log(result)
            // run query on previous results
            const data = proxy.readQuery({ query: 
                gql`{getPosts {id title body username createdAt}}`}); 
            // use query to write to cache so new post is displayed not fecth from backend
            console.log(data.getPosts)
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: 
                gql`{getPosts {id title body username createdAt}}`, data});
        },
        onError(err) {
            // catches gql errors to use in state - present to user
            console.log(errors)
            setErrors({ body: err.graphQLErrors[0].message })
        },
        variables: values 
    });

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
      };
  
    const onSubmit = e => {
        e.preventDefault();
        if (values.title !== '') {
            CreatePost();
        } else {
            setErrors({ title: 'Title cannot be empty' });
        }
      };

    return (
        <Form onSubmit={onSubmit}>
            <h3>Post an ad here:</h3>
            <Form.Field>
                <Form.Input
                    placeholder="Title"
                    name="title"
                    onChange={onChange}
                    value={values.title}
                    error={errors.title}
                />
                <Form.TextArea
                    placeholder="Description..."
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={errors.body}
                    rows="3"
                />
                <Button type="submit" color="violet">
                    Submit
                </Button>
                <h1> </h1>
            </Form.Field>
        </Form>
    )
};

export default PostForm;
