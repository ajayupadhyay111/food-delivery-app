import { NextFunction, Request, Response } from "express";

// errorHandler.js
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack); // Log the full error stack

  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

export default errorHandler;

