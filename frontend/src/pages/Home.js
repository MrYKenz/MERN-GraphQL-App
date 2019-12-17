import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { AuthContext } from '../Auth';
import Jobs from '../components/Jobs';

const GET_POSTS_QUERY = gql`
    {getPosts {id title body username createdAt}}
`;

function Home() {
    const context = useContext(AuthContext);
    const { loading, data } = useQuery(GET_POSTS_QUERY);
    // console.log(loading, data)
    return (
      <div>
        {context.user && <PostForm />}
        { loading ? <h1>loading...</h1> : (
            data.getPosts && data.getPosts.map(post => 
                <Post post={post} key={post.id} />)
            )
        }
        <Jobs />
     </div>
    )
}

export default Home;
