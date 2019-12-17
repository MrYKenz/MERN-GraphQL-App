import React from 'react'
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';

const SingleJob = (props) => (
        <Card fluid>
            <Card.Content>
                <Image
                floated='left'
                size='small'
                src={props.job.company_logo}
                />
                <Card.Header>{props.job.title}</Card.Header>
                {props.job.company}
                <Card.Meta>{moment(props.job.created_at).fromNow()}</Card.Meta>
                <h3> </h3>
                <div className="content" dangerouslySetInnerHTML={{__html: props.job.description}}></div>
            </Card.Content>
        </Card>
);

export default SingleJob
