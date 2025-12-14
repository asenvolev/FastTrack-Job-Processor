import { scheduleWebhookCallback } from "../mockWorker/n8nWorker";
import { IJob, JOB_STATUSES } from "../models";
import { getSocket } from "../realtime";
import { JobRepository } from "../repositories";

export class JobService {
    constructor(private jobRepository: JobRepository) {}

    createJob = async (prompt:string) : Promise<IJob> => {
        const job = await this.jobRepository.create(prompt);
        getSocket().emit('jobCreated', job);
        scheduleWebhookCallback(job._id.toString(), prompt)
        return job;
    }

    getAllJobs = async () : Promise<IJob[]> => {
        const jobs = await this.jobRepository.findAll();

        return jobs;
    }

    updateJob = async (id:string, result?: string, error?:string) : Promise<IJob | null> => {
        const jobToUpdate = await this.jobRepository.findJobById(id);

        if(!jobToUpdate){
            return null;
        }

        if (jobToUpdate.status !== JOB_STATUSES.Pending) {
            return jobToUpdate;
        }

        const status = result ? JOB_STATUSES.Completed : JOB_STATUSES.Failed;

        const job = await this.jobRepository.updateJob(id,status,result,error);

        getSocket().emit('jobUpdated', job);

        return job;
    }
}