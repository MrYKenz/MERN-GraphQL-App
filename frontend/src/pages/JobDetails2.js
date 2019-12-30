import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SingleJob2 from '../components/SingleJob2';

const GET_JOBS2_QUERY = gql`{getJobs(key: "stackoverflow")}`;

const JobDetails2 = (props) => {
    // get jobID from URL parameters
    const id = props.match.params.jobID;
    const { loading, data } = useQuery(GET_JOBS2_QUERY);
    let job = []
    if (!loading) {
        job = JSON.parse(data.getJobs).filter(job => job.guid === id);
    }

    return (
        <div>
            { loading ? <h1>loading...</h1> :
            <SingleJob2 job={job[0]} />
            }
        </div>
    )
};

export default JobDetails2;

