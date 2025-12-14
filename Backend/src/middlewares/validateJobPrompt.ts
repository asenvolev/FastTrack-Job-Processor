import { NextFunction, Request, Response } from "express"

export function validateJobPrompt(req: Request, res: Response, next: NextFunction) {
    const {prompt} = req.body;
    if(typeof prompt !== 'string' || prompt.trim().length === 0 || prompt.length > 10000){

        return res.status(400).json({
            error:'Prompt should be valid string between 1 and 10000 chars'
        });
    }

    next();
}