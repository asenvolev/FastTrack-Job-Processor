import { apiServer } from "../configs/api";
import type { IJob } from "../models/Job";

export const getJobs = async () => {
    try {
        const  rawData = await fetch(`${apiServer}/jobs/`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        });
        const res = await rawData.json();
        return res.data as IJob[]
    } catch (error) {
        return (error as Error).message;
    }

}