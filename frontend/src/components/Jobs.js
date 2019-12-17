import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';

const GET_JOBS_QUERY = gql`{getJobs(key: "github")}`;

function Jobs() {
    const { loading, data } = useQuery(GET_JOBS_QUERY);
    return (
      <div>
        { loading ? <h1>loading...</h1> : (
            JSON.parse(data.getJobs).map(job =>
            { return (
              <Card.Group>
                  <Card fluid>
                    <Card.Content>
                      <Image
                        floated='right'
                        size='mini'
                        src={job.company_logo}
                      />
                      <Card.Header as={Link} to={`/jobs/${job.id}`}>{job.title}</Card.Header>
                      <Card.Meta>{job.company}</Card.Meta>
                      <Card.Meta>{moment(job.created_at).fromNow()}</Card.Meta>
                      <Card.Description>
                      <div className="content" dangerouslySetInnerHTML={{__html: job.description.slice(0, 250)+"..."}}></div>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
            )})
        )}
     </div>
    )
}

export default Jobs;