"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    if (!book || !quantity || !dueDate) {
        res.status(400).json({
            success: false,
            message: "Missing required fields: book, quantity, or dueDate"
        });
        return;
    }
    if (quantity <= 0) {
        res.status(400).json({
            success: false,
            message: "Quantity must be grater than 0"
        });
        return;
    }
    const bookGet = yield book_model_1.Book.findById(book);
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
    bookGet.copies -= quantity;
    if (bookGet.copies === 0) {
        bookGet.available = false;
    }
    yield bookGet.save();
    const borrowData = {
        book,
        quantity,
        dueDate
    };
    const data = yield borrow_model_1.Borrow.create(borrowData);
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: data
    });
}));
// Books Summary api
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
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
}));
