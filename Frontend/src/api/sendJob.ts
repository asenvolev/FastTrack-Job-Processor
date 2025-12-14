import { apiServer } from "../configs/api";
import type { IJob, Response } from "../models";

export const sendJob = async (prompt:string) => {
    
    const  rawData = await fetch(`${apiServer}/jobs/`, {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt})
    });

    if (!rawData.ok) {
        const text = await rawData.text().catch(()=> '');
        throw new Error(`HTTP ${rawData.status}: ${text || rawData.statusText} `)
    }
    const res = await rawData.json() as Response<IJob>;
    return res.data as IJob;

}

export const sendHalucinatedJob = async (prompt:string) => {

    const  rawData = await fetch(`${apiServer}/jobs/`, {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
        headers: {
            'Content-Type': 'application/json',
            'x-hallucinate': '1'
        },
        body: JSON.stringify({hallucination:prompt})
    });
    if (!rawData.ok) {
        const text = await rawData.text().catch(()=> '');
        throw new Error(`HTTP ${rawData.status}: ${text || rawData.statusText} `)
    }
    const res = await rawData.json() as Response<IJob>;
    return res.data;

}