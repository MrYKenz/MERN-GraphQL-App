import React from 'react'
import { Card } from 'semantic-ui-react';
import moment from 'moment';

const SingleJob2 = (props) => (
        <Card fluid>
            <Card.Content>
                <Card.Header>{props.job.title}</Card.Header>
                {props.job.title}
                <Card.Meta>{moment(props.job.isoDate).fromNow()}</Card.Meta>
                <h3> </h3>
                <div className="content" dangerouslySetInnerHTML={{__html: props.job.content}}></div>
            </Card.Content>
        </Card>
);

export default SingleJob2
