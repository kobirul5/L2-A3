/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express"
import { booksRoutes } from "./app/controllers/books.controller"
import { borrowRoutes } from "./app/controllers/borrow.controller"
import { ApiError } from "./app/errors/Api.error"
import cors from "cors"



const app: Application = express()
app.use(cors())
app.use(express.json())

app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Library Management')
})

app.use((req:Request, res:Response, next:NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
  next() 
}); 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails = err;

  // Handle custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errorDetails = err;
  }


  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
});



export default app;