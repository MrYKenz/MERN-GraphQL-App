import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';

const GET_JOBS2_QUERY = gql`{getJobs(key: "stackoverflow")}`;

function Jobs2() {
    const { loading, data } = useQuery(GET_JOBS2_QUERY);
    return (
      <div>
        { loading ? <h1>loading...</h1> : (
            JSON.parse(data.getJobs).map(job =>
            { return (
              <Card.Group>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header as={Link} to={`/jobs2/${job.guid}`}>{job.title}</Card.Header>
                      <Card.Meta>{job.title}</Card.Meta>
                      <Card.Meta>{moment(job.isoDate).fromNow()}</Card.Meta>
                      <Card.Description>
                      <div className="content" dangerouslySetInnerHTML={{__html: job.content.slice(0, 250)+"..."}}></div>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
            )})
        )}
     </div>
    )
}

export default Jobs2;