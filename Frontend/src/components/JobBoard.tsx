import { useEffect, useState, type FC } from "react";
import { type IJob } from "../models/Job";
import styled from "styled-components";
import Job from "./Job";
import { getJobs } from "../api";
import {io} from 'socket.io-client';
import { apiServer } from "../configs/api";

const JobBoard : FC = () => {
    const [jobsMap, setJobsMap] = useState<Map<string, IJob>>(new Map());
    const [isLoading ,setIsLoading] = useState<boolean>(true);
    const [error ,setError] = useState<string>('');

    const upsertJob = (job: IJob) => {
        setJobsMap((prev)=> {
            const next = new Map(prev);
            next.set(job._id, job);
            return next;
        })
    }

    useEffect(() => {
        getJobs().then((data:IJob[] | string) => {
            if(typeof data === 'string'){
                setError(error);
            } else {
                const map = new Map<string, IJob>();
                data.forEach((job) => map.set(job._id, job));
                setJobsMap(map);
            }
            setIsLoading(false);
        });

        const socket = io(apiServer, {transports: ['websocket']});

        socket.on('jobCreated', (job:IJob) => upsertJob(job));
        socket.on('jobUpdated', (job:IJob) => upsertJob(job));

        return () => {
            socket.disconnect();
        }
    }, []);

    
    
    const jobsToShow = Array.from(jobsMap.values()).map((job)=> {
        return (<Job 
            key={job._id} 
            _id={job._id} 
            prompt={job.prompt} 
            status={job.status} 
            result={job.result} 
            createdAt={job.createdAt} 
            updatedAt={job.updatedAt} 
            error={job.error}/>)
    })

    return (
        <JobBoardWrapper>
            <HeadingsWrapper>
                <Heading>Prompt</Heading>
                <Heading>Status</Heading>
                <Heading>CreatedAt</Heading>
                <Heading>Result</Heading>
                <Heading>Updated At</Heading>
            </HeadingsWrapper>
            {isLoading && (<Loading>Loading...</Loading>)}
            {error ? <Error>{error}</Error> : jobsToShow }
        </JobBoardWrapper>
    )
}

export default JobBoard;

const HeadingsWrapper = styled.div`
    width:100%;
    display:flex;
`

const Heading = styled.div`
    font-weight:bold;
    font-size:18px;
    width:20%;
`

const JobBoardWrapper = styled.div`
    width:100%;
    height:80%;
    display:flex;
    flex-direction: column;
`;

const Loading = styled.div`
    width:20%;
`;

const Error = styled.div`
    width:20%;
    background-color: red;
`;