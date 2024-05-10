import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import DataError from '../types/DataError';

const errorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if(err instanceof DataError) {
        res.status(400).json({
            name: err.name,
            message: err.message
        });
    }

    next(err);
};

export default {
    errorHandler
};