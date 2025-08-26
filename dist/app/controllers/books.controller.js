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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoutes = express_1.default.Router();
//  Create Book Post api
exports.booksRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    console.log(req.body);
    const data = yield book_model_1.Book.create(bookData);
    res.status(201).json({
        success: true,
        message: "Book Create successfully",
        data: data
    });
}));
//  Create Book get api
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10', } = req.query;
    // Build query object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    // Sort direction
    const sortOrder = sort === 'desc' ? -1 : 1;
    const books = yield book_model_1.Book.find(query)
        .sort({ [sortBy]: sortOrder })
        .limit(parseInt(limit));
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
}));
// get book by id
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const data = yield book_model_1.Book.findById(id);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: data
    });
}));
//  book update by id
exports.booksRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const body = req.body;
    const data = yield book_model_1.Book.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: data
    });
}));
//  book delete by id
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const exitingBook = yield book_model_1.Book.findById(id);
    if (!exitingBook) {
        res.status(404).json({
            success: false,
            message: "Book not found"
        });
        return;
    }
    const data = yield book_model_1.Book.findByIdAndDelete(id, { lean: true });
    if (!data) {
        res.status(404).json({
            success: false,
            message: "Failed to delete book"
        });
        return;
    }
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
}));
