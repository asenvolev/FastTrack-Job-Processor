import {Request, Response, NextFunction } from 'express';
import { JobService } from '../services';
import { HandledError } from '../middlewares';

export class JobController {
    
    constructor(private jobService: JobService) { }

    createJob = async (req:Request, res:Response, next: NextFunction) : Promise<void> => {
        try {
            const {prompt} = req.body;
            const job = await this.jobService.createJob(prompt);
            res.status(201).json({
                success:true,
                data: job
            })
        } catch (error) {
            next(error);
        }
    };

    getJobs = async (_req:Request, res:Response, next: NextFunction) : Promise<void> => {
        try {
            const jobs = await this.jobService.getAllJobs();
            res.status(200).json({
                success:true,
                data: jobs
            })
        } catch (error) {
            next(error);
        }
    };

    updateJob = async (req:Request, res:Response, next: NextFunction) : Promise<void> => {
        try {
            const {jobId, result, error } = req.body;
            const job = await this.jobService.updateJob(jobId,result,error);
            if (!job) {
                throw new HandledError(404,'Job not found or already updated')
            }
            res.status(200).json({
                success:true,
                data: job
            })
        } catch (error) {
            next(error);
        }
    }


}