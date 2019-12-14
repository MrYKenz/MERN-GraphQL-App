import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Post = ({post: { id, title, body, username, createdAt }}) => (
  // let { title, body, username, createdAt } = props.post;
  <Card.Group>
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header as={Link} to={`/posts/${id}`}>{title}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default Post;