import express from 'express';
import cors from 'cors'
import { createJobRouter, createWebhookRouter } from './routes/index';
import { notFoundHandler } from './middlewares/index';
import { JobRepository } from './repositories';
import { JobService } from './services';
import { JobController } from './controllers';



export function createApp() {
        const app = express();
        app.use(express.json());
        app.use(cors({
                origin:'*',
        }))

        const jobRepo = new JobRepository();
        const jobService = new JobService(jobRepo);
        const jobController = new JobController(jobService);


        app.use('/jobs', createJobRouter(jobController));
        app.use('/webhook', createWebhookRouter(jobController));

        app.use(notFoundHandler);

        return app;
}