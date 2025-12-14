import { Router } from "express";
import { JobController } from "../controllers";
import { authorize } from "../middlewares";

export function createWebhookRouter(jobController: JobController) : Router {
    const router = Router();

    router.post(
        '/callback',
        authorize, 
        jobController.updateJob);

    
    return router;

}