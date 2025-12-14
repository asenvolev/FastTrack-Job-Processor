import { memo, type FC } from "react";
import styled from "styled-components";
import type { IJob } from "../models/Job";



const Job : FC<IJob> = ({ prompt, status, result, error, createdAt, updatedAt}) => {

    return (
        <JobWrapper>
            <JobProperty>{prompt}</JobProperty>
            <JobProperty>{status}</JobProperty>
            <JobProperty>{createdAt.toLocaleString()}</JobProperty>
            {status === 'completed' && (<JobProperty>{result}</JobProperty> )}
            {status === 'failed' && (<JobProperty>{error}</JobProperty> )}
            {status !== 'pending' && (<JobProperty>{updatedAt.toString()}</JobProperty> )}
        </JobWrapper>
    )
}

export default memo(Job);


const JobWrapper = styled.div`
    width:100%;
    height:50px;
    display:flex;
`;

const JobProperty = styled.div`
    width:20%;
`;