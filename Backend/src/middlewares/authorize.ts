import { NextFunction, Request, Response } from "express"

export function authorize(req: Request, res: Response, next: NextFunction) {
    const headerSecret = req.header('X-SHARED-SECRET');

    if(!headerSecret || headerSecret != process.env.SHARED_SECRET){

        return res.status(401).json({
            error:'Unauthorized'
        });
    }

    next();
}