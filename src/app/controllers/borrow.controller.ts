import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router()

borrowRoutes.post("/", async (req: Request, res: Response) => {
    const { book, quantity, dueDate } = req.body;
    console.log(req.body)
    if (!book || !quantity || !dueDate) {
        res.status(400).json({
            success: false,
            message: "Missing required fields: book, quantity, or dueDate"
        })
        return;
    }
    if (quantity <= 0) {
        res.status(400).json({
            success: false,
            message: "Quantity must be grater than 0"
        })
        return;
    }

    const bookGet = await Book.findById(book);

    if (!bookGet) {
        res.status(404).json({
            success: false,
            message: "Book not found"
        });
        return;
    }


    if (bookGet.copies < quantity) {
        res.status(404).json({
            success: false,
            message: "Not enough copies available"
        });
        return;
    }

    bookGet.copies -= quantity

    if (bookGet.copies === 0) {

        bookGet.available = false
    }
    await bookGet.save()

    const borrowData = {
        book,
        quantity,
        dueDate
    }

    const data = await Borrow.create(borrowData)

    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: data
    })
})

// Books Summary api

borrowRoutes.get("/", async (req: Request, res: Response) => {

    const summary = await Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails"
            }
        },
        {
            $unwind: "$bookDetails"
        },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: "$bookDetails.title",
                    isbn: "$bookDetails.isbn"
                }
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary
    });


})

