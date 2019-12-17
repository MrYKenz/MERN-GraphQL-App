import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';

const SinglePost = ({post: { title, body, username, 
  createdAt }, user, onClick}) => (
  <>
    <Card fluid>
      <Card.Content>
        <Image
          floated='left'
          size='small'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
        <Card.Header>{title}</Card.Header>
        {username}
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <h3> </h3>
          {body}
      </Card.Content>
      {user && user.username === username && (
      <Card.Content extra>
          <Button basic 
            color='red' 
            floated='left'
            onClick={onClick}>
            Delete
          </Button>
      </Card.Content>)}
    </Card>
  </>
);

export default SinglePost
