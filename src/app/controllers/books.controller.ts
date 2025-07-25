import express, { Request, Response } from 'express'
import { Book } from '../models/book.model';

export const booksRoutes = express.Router()


//  Create Book Post api

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

//  Create Book get api
booksRoutes.get('/', async (req: Request, res: Response) => {

    const {
        filter,
        sortBy = 'createdAt',
        sort = 'asc',
        limit = '10',
    } = req.query;

    // Build query object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (filter) {
        query.genre = filter;
    }

    // Sort direction
    const sortOrder = sort === 'desc' ? -1 : 1;

    const books = await Book.find(query)
        .sort({ [sortBy as string]: sortOrder })
        .limit(parseInt(limit as string));

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    })
})

// get book by id

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const id= req.params.bookId;
    const data = await Book.findById(id)

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: data
    })
})

//  book update by id
booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    const id= req.params.bookId;
    const body = req.body;
    const data = await Book.findByIdAndUpdate(id, body, {new: true})

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: data
    })
})
//  book delete by id
booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const id= req.params.bookId;
     await Book.findByIdAndDelete(id, {lean: true})

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    })
})