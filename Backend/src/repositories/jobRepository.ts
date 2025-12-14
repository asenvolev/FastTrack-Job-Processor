import { Job, IJob, JobStatus } from "../models";

export class JobRepository {
    create = async (prompt:string): Promise<IJob> => {
        return Job.create({prompt});
    }

    findAll = async (): Promise<IJob[]> => {
        return Job.find();
    }

    findJobById = async (id:string): Promise<IJob | null> => {
        return Job.findById(id);
    }

    updateJob = async (id:string, status:JobStatus, result?:string, error?:string): Promise<IJob | null> => {
        return await Job.findByIdAndUpdate(id, {status, result, error}, {new:true});
    }

}