import { Router } from "express";
import { JobController } from "../controllers";
import { validateJobPrompt } from "../middlewares";

export function createJobRouter(jobController: JobController) : Router {
    const router = Router();

    router.get('/', jobController.getJobs);

    router.post(
        '/',
        validateJobPrompt, 
        jobController.createJob);

    return router;
}

