import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SingleJob from '../components/SingleJob';

const GET_JOBS_QUERY = gql`{getJobs(key: "github")}`;

const JobDetails = (props) => {
    // get jobID from URL parameters
    const id = props.match.params.jobID;
    const { loading, data } = useQuery(GET_JOBS_QUERY);
    let job = []
    if (!loading) {
        job = JSON.parse(data.getJobs).filter(job => job.id === id);
    }

    return (
        <div>
            { loading ? <h1>loading...</h1> :
            <SingleJob job={job[0]} />
            }
        </div>
    )
};

export default JobDetails;

