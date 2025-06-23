import express, { Request, Response } from 'express'
import { Book } from '../models/book.model';

export const booksRoutes = express.Router()

booksRoutes.post('/', async (req: Request, res: Response) => {

    const bookData = req.body;
    console.log(req.body)
    const data = await Book.create(bookData)

    res.status(201).json({
        success: true,
        message: "Book Create successfully",
        data: data
    })
})
