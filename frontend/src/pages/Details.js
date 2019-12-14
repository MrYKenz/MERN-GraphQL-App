import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SinglePost from '../components/SinglePost'
import { AuthContext } from '../Auth';

const GET_POST_QUERY = gql`
    query($id: ID!){ getPost(id: $id) {
        id title body username createdAt }}`;

const DELETE_POST_MUTATION = gql`
    mutation($id: ID!){ deletePost(id: $id) }`;


const Details = (props) => {
    const { user } = useContext(AuthContext);
    // get postID from URL parameters
    const id = props.match.params.postID;

    const {loading, data} = useQuery(GET_POST_QUERY, 
        {variables: { id }});

    const [DeletePost] = useMutation(DELETE_POST_MUTATION, {
        update() {
            // back to home when deleted as post data is null
            window.location.replace("/")
            // props.history.push("/") to not fetch from backend use cached posts
        },
        variables: { id }});

    const onClick = e => DeletePost();

    return (
        <div>
            { loading ? <h1>loading...</h1> :
                <SinglePost 
                    post={data.getPost} 
                    user={user}
                    onClick={onClick}
                />
            }
        </div>
    )
};

export default Details;

