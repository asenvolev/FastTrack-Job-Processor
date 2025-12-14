import { Request, Response } from "express"

export class HandledError extends Error {
    
    constructor(public status:number, message:string) {
        super(message);
    }
}

export function errorHandler(err: Error, _req: Request, res: Response) {
    if (err instanceof HandledError) {
        return res.status(err.status).json({error:err.message});
    }

    return res.status(500).json({error:'Internal server error'});

}

export function notFoundHandler(_req: Request, res: Response): void {
    res.status(404).json({
        error:'Route not found'
    });
}