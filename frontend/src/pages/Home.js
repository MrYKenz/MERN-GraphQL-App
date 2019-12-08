import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Post from '../components/Post'

const GET_POSTS_QUERY = gql`
    {getPosts {id title body username createdAt}}
`;

function Home() {
    const { loading, data } = useQuery(GET_POSTS_QUERY);
    // console.log(loading, data)
    return (
      <div>
        { loading ? <h1>loading...</h1> : (
            data.getPosts && data.getPosts.map(post => 
                <Post post={post} key={post.id} />)
            )
        }
     </div>
    )
}

export default Home;
