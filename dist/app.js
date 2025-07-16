"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const Api_error_1 = require("./app/errors/Api.error");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.booksRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('Welcome Library Management');
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
    next();
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorDetails = err;
    // Handle custom ApiError
    if (err instanceof Api_error_1.ApiError) {
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
exports.default = app;
