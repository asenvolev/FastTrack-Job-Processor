

export const JOB_STATUSES = {
  Pending: "pending",
  Completed: "completed",
  Failed: "failed",
} as const;

export type JobStatus = typeof JOB_STATUSES[keyof typeof JOB_STATUSES]

export interface IJob {
    _id: string;
    status:JobStatus;
    prompt:string;
    result?:string;
    error?:string;
    createdAt: Date,
    updatedAt:Date,
};