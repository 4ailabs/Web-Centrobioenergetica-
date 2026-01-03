import express from 'express';

interface ErrorResponse {
    error: string;
    details?: any;
}

export const errorHandler = (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
    });

    const response: ErrorResponse = {
        error: err.message || 'Internal server error',
    };

    if (process.env.NODE_ENV === 'development') {
        response.details = err.stack;
    }

    res.status(500).json(response);
};
