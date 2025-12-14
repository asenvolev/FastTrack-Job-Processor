import mongoose, { InferSchemaType, model, Schema } from "mongoose";

export const JOB_STATUSES = {
  Pending: "pending",
  Completed: "completed",
  Failed: "failed",
} as const;

export type JobStatus = typeof JOB_STATUSES[keyof typeof JOB_STATUSES]

const jobSchema = new Schema(
    {
        status: {
            type: String,
            enum: Object.values(JOB_STATUSES),
            required: true,
            default: JOB_STATUSES.Pending,
            index:true
        },
        prompt: {
            type:String,
            required:true,
            trim: true,
        },
        result:{
            type:String,
            default:null,
        },
        error: {
            type: String,
            default:null
        }
    },
    {
        timestamps: true,
        versionKey: false
    } 
);

export interface IJob extends Document {
    _id: mongoose.Types.ObjectId;
    status:JobStatus;
    prompt:string;
    result?:string;
    error?:string;
    createdAt: Date,
    updatedAt:Date,
};

export const Job = model<IJob>('Job',jobSchema);